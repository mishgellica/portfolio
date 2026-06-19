// CURSOR
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
  cursor.style.background = 'var(--green)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  cursor.style.background = 'var(--pink)';
});

// DARK MODE
const toggle = document.getElementById('themeToggle');
const icon   = toggle.querySelector('.theme-icon');
const saved  = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
icon.textContent = saved === 'dark' ? '☀' : '☽';
toggle.addEventListener('click', () => {
  const cur  = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  icon.textContent = next === 'dark' ? '☀' : '☽';
});

// MOBILE NAV
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav  = document.getElementById('closeNav');
hamburger.addEventListener('click',  () => mobileNav.classList.add('open'));
closeNav.addEventListener('click',   () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l =>
  l.addEventListener('click', () => mobileNav.classList.remove('open'))
);

// IMAGE GALLERY
function initGallery() {
  const track  = document.querySelector('.gallery-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const dots   = document.querySelectorAll('.gallery-dot');
  const prev   = document.querySelector('.gallery-btn.prev');
  const next   = document.querySelector('.gallery-btn.next');

  if (!track || slides.length === 0) return;

  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Hide arrows if only one slide
  if (slides.length <= 1) {
    prev.style.display = 'none';
    next.style.display = 'none';
    document.querySelector('.gallery-dots').style.display = 'none';
  }

  goTo(0);
}

// SCROLL REVEAL
function initReveal() {
  document.querySelectorAll('.story-card, .info-strip, .tech-item, .contributor-pill, .project-nav-card, .gallery-wrap').forEach(el => {
    el.classList.add('reveal');
    new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    }, { threshold: 0.1 }).observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initReveal();
});
