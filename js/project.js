// ==========================================
// CURSOR FEATURE
// ==========================================
const cursor = document.getElementById('cursor');
if (cursor) {
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
}

// ==========================================
// DARK MODE FEATURE
// ==========================================
const toggle = document.getElementById('themeToggle');
if (toggle) {
  const icon = toggle.querySelector('.theme-icon');
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '☽';

  toggle.addEventListener('click', () => {
    const cur  = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (icon) icon.textContent = next === 'dark' ? '☀' : '☽';
  });
}

// ==========================================
// MOBILE NAV FEATURE
// ==========================================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav  = document.getElementById('closeNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
}
if (closeNav && mobileNav) {
  closeNav.addEventListener('click', () => mobileNav.classList.remove('open'));
}
if (mobileNav) {
  document.querySelectorAll('.mob-link').forEach(l =>
    l.addEventListener('click', () => mobileNav.classList.remove('open'))
  );
}

// ==========================================
// IMAGE GALLERY FEATURE
// ==========================================
function initGallery() {
  const track   = document.querySelector('.gallery-track');
  const slides  = document.querySelectorAll('.gallery-slide');
  const dots    = document.querySelectorAll('.gallery-dot');
  const prev    = document.querySelector('.gallery-btn.prev');
  const next    = document.querySelector('.gallery-btn.next');
  const dotsWrap = document.querySelector('.gallery-dots');

  if (!track || slides.length === 0) return;

  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prev) prev.addEventListener('click', () => goTo(current - 1));
  if (next) next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Hide arrows if only one slide
  if (slides.length <= 1) {
    if (prev) prev.style.display = 'none';
    if (next) next.style.display = 'none';
    if (dotsWrap) dotsWrap.style.display = 'none';
  }

  goTo(0);
}

// ==========================================
// SCROLL REVEAL FEATURE
// ==========================================
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

// ==========================================
// FOOTER FEATURES
// ==========================================
function initFooterFeatures() {
  // 1. LIVE LOCAL TIME — Asia/Manila (UTC+8)
  const timeEl = document.getElementById('localTime');
  if (timeEl) {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Manila' };
      timeEl.textContent = now.toLocaleTimeString('en-US', options);
    };
    updateTime();
    setInterval(updateTime, 30000); // 30s tick cycle
  }

  // 2. DYNAMIC YEAR AUTO-INJECTOR
  const yearEl = document.getElementById('fyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ==========================================
// INITIALIZATION & EASTER EGGS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initReveal();
  initFooterFeatures();

  // 3. CONSOLE EASTER EGG
  console.log(
    "%c✦ hey there, fellow dev! ✦",
    "color:#c97a7a; font-size:16px; font-weight:bold; font-family: sans-serif;"
  );
  console.log(
    "%cthanks for poking around. if you're a recruiter or just curious — let's connect: mishgellica@gmail.com",
    "color:#4a7a5a; font-size:13px; font-family: sans-serif;"
  );
  console.log(
    "%c(and yes, this portfolio was hand-coded with a lot of trial, error, and iced coffee.)",
    "color:#7a6050; font-size:12px; font-style: italic; font-family: sans-serif;"
  );
});

const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

