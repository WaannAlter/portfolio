document.documentElement.classList.add('has-js');

const body = document.body;
const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const toggle = document.querySelector('#motion-toggle');
const motionLabel = toggle?.querySelector('[data-motion-label]');
const header = document.querySelector('.site-header');
const progress = document.querySelector('#scroll-progress');
const heroVisual = document.querySelector('#hero-visual');
const systemVisual = document.querySelector('#system-visual');
const steps = [...document.querySelectorAll('#systems .system-step[data-stage]')];
let paused = false;
let frame = 0;

function motionEnabled() {
  return !paused && !reduceMotion?.matches;
}

function updateMotion() {
  const enabled = motionEnabled();
  body.classList.toggle('motion-enabled', enabled);
  document.documentElement.classList.toggle('motion-paused', !enabled);
  if (toggle) {
    toggle.hidden = false;
    toggle.disabled = !!reduceMotion?.matches;
    toggle.setAttribute('aria-pressed', String(!enabled));
    toggle.setAttribute('aria-label', enabled ? 'Motion on: pause decorative motion' : 'Motion off: resume decorative motion');
    if (reduceMotion?.matches) toggle.setAttribute('aria-label', 'Motion off: system prefers reduced motion');
  }
  if (motionLabel) motionLabel.textContent = enabled ? 'Motion on' : 'Motion off';
  scheduleUpdate();
}

function updateScene() {
  frame = 0;
  const scroll = window.scrollY;
  const viewportCenter = window.innerHeight / 2;
  const enabled = motionEnabled();

  header?.classList.toggle('is-scrolled', scroll > 20);
  if (progress) {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? Math.max(0, Math.min(1, scroll / range)) : 0})`;
  }
  if (heroVisual) {
    heroVisual.style.setProperty('--hero-shift', `${enabled ? Math.min(24, Math.max(0, scroll * 0.06)) : 0}px`);
  }

  if (steps.length) {
    const centers = steps.map(step => step.getBoundingClientRect().top + step.offsetHeight / 2);
    let active = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(centers[i] - viewportCenter) < Math.abs(centers[active] - viewportCenter)) active = i;
    }
    steps.forEach((step, i) => step.classList.toggle('is-active', i === active));
    if (systemVisual) {
      systemVisual.dataset.stage = steps[active].dataset.stage;
      const span = centers[centers.length - 1] - centers[0];
      const sceneProgress = span > 0 ? Math.max(0, Math.min(1, (viewportCenter - centers[0]) / span)) : 0;
      systemVisual.style.setProperty('--scene-progress', enabled ? sceneProgress : 0);
    }
  }
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateScene);
}

toggle?.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
});
reduceMotion?.addEventListener('change', updateMotion);
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate, { passive: true });

const reveals = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('is-visible'));
}

updateMotion();
