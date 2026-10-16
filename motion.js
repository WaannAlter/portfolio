document.documentElement.classList.add('has-js');

const root = document.documentElement;
const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
const desktop = window.matchMedia?.('(min-width: 900px)');
const toggle = document.querySelector('#motion-toggle');
const label = toggle?.querySelector('[data-motion-label]');
const hero = document.querySelector('#hero');
const heroWordmark = hero?.querySelector('.hero-wordmark');
const footer = document.querySelector('footer');
const footerWordmark = footer?.querySelector('.footer-wordmark');
const sheets = [...document.querySelectorAll('.project-sheet')];
const researchImage = document.querySelector('#research-media img');
let paused = false;
let frame = 0;
let panelAnimation;

const clamp = value => Math.max(0, Math.min(1, value));
const motionOn = () => !paused && !reduced?.matches;

function updateMotion() {
  const enabled = motionOn();
  document.body.classList.toggle('motion-enabled', enabled);
  root.classList.toggle('motion-paused', !enabled);
  if (toggle) {
    toggle.hidden = false;
    toggle.disabled = !!reduced?.matches;
    toggle.setAttribute('aria-pressed', String(!enabled));
    toggle.setAttribute('aria-label', reduced?.matches
      ? 'Motion off: system prefers reduced motion'
      : enabled ? 'Pause decorative motion' : 'Resume decorative motion');
  }
  if (label) label.textContent = enabled ? 'Motion on' : 'Motion off';
  if (!enabled) panelAnimation?.cancel();
  scheduleUpdate();
}

function updateScroll() {
  frame = 0;
  const enabled = motionOn();
  const height = window.innerHeight;

  if (heroWordmark && hero) {
    if (enabled) {
      const rect = hero.getBoundingClientRect();
      heroWordmark.style.setProperty('--word-scale', 1 - 0.06 * clamp(-rect.top / Math.max(1, rect.height)));
    } else heroWordmark.style.removeProperty('--word-scale');
  }
  if (footerWordmark && footer) {
    if (enabled) {
      const rect = footer.getBoundingClientRect();
      footerWordmark.style.setProperty('--word-scale', 0.94 + 0.06 * clamp((height - rect.top) / Math.max(1, height)));
    } else footerWordmark.style.removeProperty('--word-scale');
  }

  sheets.forEach((sheet, index) => {
    const next = sheets[index + 1];
    const cover = enabled && desktop?.matches && next
      ? clamp((height - next.getBoundingClientRect().top) / Math.max(1, height - 100))
      : 0;
    sheet.style.setProperty('--cover', cover);
  });

  if (researchImage) {
    if (enabled) {
      const rect = researchImage.getBoundingClientRect();
      const shift = (2 * clamp((height - rect.top) / Math.max(1, height + rect.height)) - 1) * 6;
      researchImage.style.setProperty('--image-shift', `${shift}px`);
    } else researchImage.style.removeProperty('--image-shift');
  }
}

function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateScroll);
}

toggle?.addEventListener('click', () => {
  paused = !paused;
  updateMotion();
});
reduced?.addEventListener('change', updateMotion);
desktop?.addEventListener('change', scheduleUpdate);
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate, { passive: true });

const entrances = document.querySelectorAll('[data-enter]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  entrances.forEach(element => observer.observe(element));
} else entrances.forEach(element => element.classList.add('is-visible'));

document.querySelectorAll('[data-tabs]').forEach(group => {
  const controls = group.querySelector('.tab-controls');
  const tabs = [...group.querySelectorAll('.tab-controls button[data-tab]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (!controls || !tabs.length || panels.some(panel => !panel || !group.contains(panel))) return;

  controls.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', String(index === 0));
    tab.tabIndex = index === 0 ? 0 : -1;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    panel.hidden = index !== 0;
  });
  controls.hidden = false;

  function activate(index, moveFocus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (moveFocus) tabs[index].focus();
    if (motionOn() && panels[index].animate) {
      panelAnimation?.cancel();
      panelAnimation = panels[index].animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 200, easing: 'ease-out' }
      );
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
  });
});

updateMotion();
