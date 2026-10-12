(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const selector = '.welcome-art, .project-art, .motion-detail, .working-method, .about-signature, .work-heading, .experience-heading, .career-panel, .contact-main h2';
  const elements = [...document.querySelectorAll(selector)]
    .filter((element) => !element.parentElement.closest(selector));
  const groups = new Map(elements.map((element, index) => [element, {
    visible: false,
    timer: 0,
    restUntil: 0,
    rest: 4800 + index % 4 * 300,
    paused: new Set()
  }]));
  const blocked = () => document.hidden || reducedMotion.matches || root.classList.contains('motion-paused');
  const animationsOf = (element) => element.getAnimations({ subtree: true })
    .filter((animation) => animation instanceof CSSAnimation && animation.animationName !== 'panel-open');

  function stop(element, group) {
    clearTimeout(group.timer);
    group.timer = 0;
    group.restUntil = 0;
    animationsOf(element).forEach((animation) => {
      if (animation.playState === 'running') {
        animation.pause();
        group.paused.add(animation);
      }
    });
  }

  function schedule(element, group) {
    clearTimeout(group.timer);
    group.timer = 0;
    if (!group.visible || blocked() || element.closest('[hidden]')) return;

    // Continuous compositions keep their own CSS phase; visibility still pauses them.
    if (element.hasAttribute('data-continuous-motion')) return;

    const animations = animationsOf(element);
    const unfinished = animations.filter((animation) => animation.playState !== 'finished');
    let delay;
    if (!animations.length || unfinished.length) {
      group.restUntil = 0;
      // CSS pauses the opening artwork until the intro has closed.
      delay = Math.max(120, ...unfinished.map((animation) => {
        if (animation.playState === 'paused') return 200;
        const remaining = animation.effect.getComputedTiming().endTime - (animation.currentTime || 0);
        return Number.isFinite(remaining) ? remaining + 30 : 500;
      }));
      if (!animations.length) delay = 500;
    } else {
      if (!group.restUntil) group.restUntil = performance.now() + group.rest;
      delay = group.restUntil - performance.now();
      if (delay <= 0) {
        animationsOf(element).forEach((animation) => {
          animation.currentTime = 0;
          animation.play();
        });
        group.restUntil = 0;
        delay = 120;
      }
    }
    group.timer = setTimeout(() => schedule(element, group), delay);
  }

  function resume(element, group) {
    if (blocked() || !group.visible) return;
    const current = animationsOf(element);
    group.paused.forEach((animation) => {
      if (current.includes(animation) && animation.playState === 'paused') animation.play();
    });
    group.paused.clear();
    schedule(element, group);
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const group = groups.get(target);
        group.visible = isIntersecting;
        if (isIntersecting) resume(target, group);
        else stop(target, group);
      });
    }, { threshold: .15 });
    elements.forEach((element) => observer.observe(element));
  }

  function updatePlayback() {
    groups.forEach((group, element) => {
      if (blocked()) stop(element, group);
      else resume(element, group);
    });
  }
  document.addEventListener('visibilitychange', updatePlayback);
  window.addEventListener('portfolio:motion', updatePlayback);
  window.addEventListener('pagehide', () => groups.forEach((group, element) => stop(element, group)));
  window.addEventListener('pageshow', updatePlayback);
})();
