(() => {
  'use strict';

  const root = document.documentElement;
  const intro = document.getElementById('intro-dialog');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Deep links and reduced-motion visits go directly to the requested content.
  // The native dialog stays closed when JavaScript is unavailable.
  if (reducedMotion.matches || window.location.hash || typeof intro.showModal !== 'function') return;

  let deadline;
  let finished = false;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    root.classList.remove('intro-running');
    if (intro.open) intro.close();
    reducedMotion.removeEventListener('change', onMotionPreference);
    window.removeEventListener('portfolio:motion', onMotionToggle);
    window.removeEventListener('pagehide', finish);
  }
  function onMotionPreference(event) {
    if (event.matches) finish();
  }
  function onMotionToggle(event) {
    if (event.detail.paused) finish();
  }

  intro.addEventListener('cancel', (event) => {
    event.preventDefault();
    finish();
  });
  intro.addEventListener('close', finish);
  intro.addEventListener('animationend', (event) => {
    if (event.animationName === 'intro-curtain' && event.target === intro.querySelector('.intro-shutters i:last-child')) finish();
  });
  reducedMotion.addEventListener('change', onMotionPreference);
  window.addEventListener('portfolio:motion', onMotionToggle);
  window.addEventListener('pagehide', finish);

  try {
    root.classList.add('intro-running');
    intro.showModal();
    // Release the page even if animationend is interrupted or CSS fails to load.
    deadline = setTimeout(finish, 2800);
  } catch {
    finish();
  }
})();
