(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let language = 'ko';
  let currentProjectId;
  const pdfDocuments = {
    ko: { cv: './CV.pdf', portfolio: './portfolio.pdf' },
    en: { cv: './CV.en.pdf', portfolio: './portfolio.en.pdf' },
  };
  const portfolioPages = {
    moai: 6, gammaru: 8, abstraction: 10, golf: 11, paperbridge: 13,
    eum: 15, pintos: 19, simulation: 20, duduri: 21, spell: 27,
    planet: 28, triniacle: 29, sprite: 31, rolai: 33, vfriend: 37, orca: 42,
  };
  let toastTimer;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const translate = (ko, en) => language === 'ko' ? ko : en;

  function updateDocumentLinks() {
    $$('[data-document]').forEach((link) => {
      link.href = pdfDocuments[language][link.dataset.document];
    });
    const caseStudy = $('#dialog-portfolio');
    if (caseStudy && currentProjectId) {
      const page = portfolioPages[currentProjectId];
      caseStudy.href = pdfDocuments[language].portfolio + (page ? `#page=${page}` : '');
    }
  }

  function setMotion(paused) {
    root.classList.toggle('motion-paused', paused);
    window.dispatchEvent(new CustomEvent('portfolio:motion', { detail: { paused } }));
  }
  setMotion(reduceMotion.matches);
  reduceMotion.addEventListener('change', (event) => setMotion(event.matches));

  // Keep text readable; animate the surrounding graphic details on each visit.
  const scenes = $$('.work, .about, .expertise, .journey, .contact');
  const activeScenes = new Set();
  let sceneFrame = 0;
  function updateScenePosition() {
    sceneFrame = 0;
    if (reduceMotion.matches || root.classList.contains('motion-paused')) return;
    activeScenes.forEach((scene) => {
      const bounds = scene.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      scene.style.setProperty('--scene-shift', `${(progress - .5) * 70}px`);
      scene.style.setProperty('--scene-turn', `${(progress - .5) * 18}deg`);
    });
  }
  function requestSceneFrame() {
    if (!sceneFrame && activeScenes.size) sceneFrame = requestAnimationFrame(updateScenePosition);
  }
  if ('IntersectionObserver' in window) {
    const sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('is-in-view', isIntersecting);
        if (isIntersecting) activeScenes.add(target);
        else activeScenes.delete(target);
      });
      requestSceneFrame();
    }, { threshold: .12 });
    scenes.forEach((scene) => sceneObserver.observe(scene));
  } else {
    scenes.forEach((scene) => scene.classList.add('is-in-view'));
  }
  window.addEventListener('scroll', requestSceneFrame, { passive: true });
  window.addEventListener('resize', requestSceneFrame);
  window.addEventListener('portfolio:motion', ({ detail }) => {
    if (detail.paused) {
      cancelAnimationFrame(sceneFrame);
      sceneFrame = 0;
      scenes.forEach((scene) => {
        scene.style.setProperty('--scene-shift', '0px');
        scene.style.setProperty('--scene-turn', '0deg');
      });
    } else requestSceneFrame();
  });
  $$('.working-method > div, .pipeline-visual, .stack-visual').forEach((graphic) => {
    graphic.addEventListener('pointerenter', () => {
      if (reduceMotion.matches || root.classList.contains('motion-paused')) return;
      const animations = graphic.getAnimations({ subtree: true });
      if (animations.every((animation) => animation.playState === 'finished')) {
        animations.forEach((animation) => {
          animation.currentTime = 0;
          animation.play();
        });
      }
    });
  });

  // Each workspace has its own keyboard-accessible set of panels.
  $$('[data-tab-group]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    function selectTab(selected, moveFocus = false) {
      tabs.forEach((tab) => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = !active;
        if (active && !reduceMotion.matches) {
          panel.querySelectorAll('.motion-detail, .project-art').forEach((art) => {
            art.classList.add('is-in-view', 'is-animated');
            art.getAnimations({ subtree: true }).forEach((animation) => {
              animation.currentTime = 0;
              animation.play();
            });
          });
        }
      });
      if (moveFocus) selected.focus({ preventScroll: true });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectTab(tabs[next], true);
      });
    });
  });

  // Animate the artwork on entry; hover and keyboard focus can replay it.
  if ('IntersectionObserver' in window) {
    const artObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-animated', entry.isIntersecting);
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    $$('.project-art, .motion-detail, .working-method, .career-board').forEach((art) => artObserver.observe(art));
  } else {
    $$('.project-art, .motion-detail, .working-method, .career-board').forEach((art) => art.classList.add('is-animated', 'is-in-view'));
  }
  $$('.project').forEach((project) => {
    const art = project.querySelector('.project-art');
    function replayArt() {
      if (reduceMotion.matches || root.classList.contains('intro-running')) return;
      art.classList.add('is-animated');
      art.getAnimations({ subtree: true }).forEach((animation) => {
        animation.currentTime = 0;
        animation.play();
      });
    }
    project.addEventListener('pointerenter', replayArt);
    project.addEventListener('focusin', (event) => {
      if (!project.contains(event.relatedTarget)) replayArt();
    });
    let lightFrame = 0;
    project.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || reduceMotion.matches) return;
      cancelAnimationFrame(lightFrame);
      lightFrame = requestAnimationFrame(() => {
        const rect = art.getBoundingClientRect();
        art.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        art.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      });
    });
  });

  function applyLanguage(next) {
    language = next;
    updateDocumentLinks();
    root.lang = next;
    document.title = translate('김가람 | AI Native Software Engineer', 'Garam Kim | AI Native Software Engineer');
    $$('[data-ko][data-en]').forEach((element) => {
      element.textContent = element.dataset[next].replace(/\\n/g, '\n');
    });
    $$('[data-ko-label][data-en-label]').forEach((element) => {
      element.setAttribute('aria-label', element.dataset[`${next}Label`]);
    });
    $$('[data-ko-alt][data-en-alt]').forEach((element) => {
      element.alt = element.dataset[`${next}Alt`];
    });
    $('#language-button').textContent = next === 'ko' ? 'EN' : 'KO';
    $('#language-button').setAttribute('aria-label', next === 'ko' ? 'Switch to English' : '한국어로 전환');
    $('#copy-email').setAttribute('aria-label', translate('이메일 주소 복사', 'Copy email address'));
    $('#dialog-close').setAttribute('aria-label', translate('닫기', 'Close'));
    $$('[data-project]').forEach((button) => {
      const title = localText(projects[button.dataset.project].title);
      button.setAttribute('aria-label', translate(`${title} 프로젝트 상세 보기`, `View ${title} project details`));
    });
    $('.footer-links>a:last-child').setAttribute('aria-label', translate('맨 위로', 'Back to top'));
    updateMenuLabel();
    try { localStorage.setItem('garam-bright-language', next); } catch { /* Optional preference. */ }
  }
  $('#language-button').addEventListener('click', () => applyLanguage(language === 'ko' ? 'en' : 'ko'));

  const menuButton = $('#menu-button');
  const menu = $('#mobile-nav');
  function updateMenuLabel() {
    const open = !menu.hidden;
    menuButton.setAttribute('aria-label', open ? translate('메뉴 닫기', 'Close menu') : translate('메뉴 열기', 'Open menu'));
  }
  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    updateMenuLabel();
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !$('.site-header').contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });
  window.matchMedia('(min-width: 601px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  let scrollQueued = false;
  const navLinks = $$('.desktop-nav a');
  function updateScroll() {
    let activeId = '';
    ['work', 'about', 'expertise', 'career', 'contact'].forEach((id) => {
      if (document.getElementById(id).getBoundingClientRect().top < window.innerHeight * 0.4) activeId = id;
    });
    navLinks.forEach((link) => {
      const active = link.hash === `#${activeId}`;
      link.classList.toggle('is-current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollQueued = false;
  }
  function scheduleScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });

  const projects = portfolioProjects;

  const dialog = $('#project-dialog');
  let dialogTrigger;
  const localText = (values) => values[language === 'ko' ? 0 : 1];
  function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
  function showProject(id, trigger) {
    const project = projects[id];
    if (!project) return;
    currentProjectId = id;
    updateDocumentLinks();
    dialogTrigger = trigger;
    $('#dialog-title').textContent = localText(project.title);
    $('#dialog-eyebrow').textContent = localText(project.period);
    $('#dialog-intro').textContent = localText(project.intro);
    const brand = makeElement('span', `brand-mark logo-${project.logoStyle}`);
    const logo = document.createElement('img');
    logo.src = project.logo;
    logo.alt = '';
    logo.width = 100;
    logo.height = 64;
    brand.append(logo);
    $('#dialog-brand').replaceChildren(brand);
    const gallery = $('#dialog-gallery');
    gallery.hidden = !project.media.length;
    gallery.classList.toggle('gallery-portrait', id === 'vfriend');
    gallery.replaceChildren(...project.media.map(({ src, caption, width, height }) => {
      const figure = document.createElement('figure');
      const link = document.createElement('a');
      const description = localText(caption);
      link.href = src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', translate(`${description} — 원본 이미지 보기`, `${description} — Open original image`));
      const picture = document.createElement('img');
      picture.src = src;
      picture.alt = description;
      picture.width = width;
      picture.height = height;
      picture.decoding = 'async';
      link.append(picture);
      figure.append(link, makeElement('figcaption', '', `${description} ↗`));
      return figure;
    }));
    const metric = $('#dialog-metric');
    metric.hidden = !project.metric;
    metric.replaceChildren();
    if (project.metric) {
      metric.append(makeElement('strong', '', Array.isArray(project.metric) ? localText(project.metric) : project.metric), makeElement('span', '', localText(project.metricLabel)));
    }
    $('#dialog-details').replaceChildren(...project.details.map(([label, body]) => {
      const section = makeElement('section', 'dialog-detail');
      section.append(makeElement('h3', '', localText(label)), makeElement('p', '', localText(body)));
      return section;
    }));
    $('#dialog-links').replaceChildren(...project.links.map(([label, href]) => {
      const link = makeElement('a', 'button button-dark', `${localText(label)} ↗`);
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    }));
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    $('#dialog-close').focus({ preventScroll: true });
  }
  $$('[data-project]').forEach((button) => button.addEventListener('click', () => showProject(button.dataset.project, button)));
  function restoreProjectFocus() {
    if (dialog.open || !document.body.classList.contains('dialog-open')) return;
    document.body.classList.remove('dialog-open');
    dialogTrigger?.focus({ preventScroll: true });
  }
  function closeProject() {
    dialog.close();
    restoreProjectFocus();
  }
  $('#dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeProject();
  });
  let backdropPointerDown = false;
  dialog.addEventListener('pointerdown', (event) => {
    const rect = dialog.getBoundingClientRect();
    backdropPointerDown = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (backdropPointerDown && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeProject();
    backdropPointerDown = false;
  });
  dialog.addEventListener('close', restoreProjectFocus);

  function toast(message) {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').classList.add('is-visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('is-visible'), 3500);
  }
  $('#copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('kimgalam0831@gmail.com');
      toast(translate('이메일 주소를 복사했습니다.', 'Email address copied.'));
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('.email-actions>a'));
      selection.removeAllRanges();
      selection.addRange(range);
      toast(translate('주소를 선택했습니다. Ctrl+C 또는 ⌘C로 복사해 주세요.', 'Email selected. Press Ctrl+C or ⌘C to copy.'));
    }
  });

  let initialLanguage = 'ko';
  try {
    const stored = localStorage.getItem('garam-bright-language');
    if (stored === 'ko' || stored === 'en') initialLanguage = stored;
  } catch { /* Storage is not required for browsing. */ }
  applyLanguage(initialLanguage);
  updateScroll();
})();
