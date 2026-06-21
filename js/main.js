// ==========================================
// 1. DYNAMIC SCRAPBOOK CURSOR
// ==========================================
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.8)'; cursor.style.background = 'var(--green)'; });
document.addEventListener('mouseup',   () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)';   cursor.style.background = 'var(--pink)'; });

// ==========================================
// 2. DYNAMIC DARK MODE SYSTEM
// ==========================================
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

// ==========================================
// 3. RESPONSIVE MOBILE NAVIGATION
// ==========================================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav  = document.getElementById('closeNav');
hamburger.addEventListener('click',  () => mobileNav.classList.add('open'));
closeNav.addEventListener('click',   () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobileNav.classList.remove('open')));

// ==========================================
// 4. ACTIVE SCROLL NAVIGATION MONITOR
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--pink)' : ''; });
});

// ==========================================
// 5. OBSERVER SCROLL REVEAL ANIMATIONS
// ==========================================
document.querySelectorAll('.section-title,.about-grid,.skill-item,.project-card,.timeline-item,.cert-card,.contact-wrap,.stat-card').forEach(el => {
  el.classList.add('reveal');
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
  }, { threshold: 0.1 }).observe(el);
});

// ==========================================
// 7. CONTACT FORM SUBMISSION (Formspree)
// ==========================================
const form       = document.getElementById('contactForm');
const submitBtn  = document.getElementById('submitBtn');
const formNote   = document.getElementById('formNote');

if (form && submitBtn && formNote) {
  form.addEventListener('submit', async (e) => {
    // 1. STOP THE PAGE FROM RELOADING/SCROLLING TO TOP
    e.preventDefault(); 
    
    submitBtn.textContent = 'sending...';
    submitBtn.disabled = true;

    // 2. Gather form input data dynamically
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // 🛠️ Make sure YOUR_FORM_ID matches your actual 8-character Formspree ID code!
      const res = await fetch('https://formspree.io/f/mnjyorzq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        formNote.textContent = `thanks, ${data.name || 'there'}! i'll get back to you soon.`;
        formNote.style.color = 'var(--green)';
        form.reset();
      } else {
        throw new Error('server error');
      }
    } catch (error) {
      formNote.textContent = 'something went wrong. please email me directly!';
      formNote.style.color = 'var(--pink)';
    } finally {
      submitBtn.textContent = 'send it';
      submitBtn.disabled = false;
    }
  });
} else {
  console.warn("Contact form elements were not found in the DOM. Check your HTML IDs!");
}

// ==========================================
// 8. PINBOARD CERTIFICATE LIGHTBOX MODAL
// ==========================================
window.openCertModal = function(imageSrc) {
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  
  if (modal && modalImg) {
    modalImg.src = imageSrc;
    modal.style.display = "flex"; 
    
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);
    
    document.body.style.overflow = "hidden"; 
  }
};

// ==========================================
// 9. CLOSE CERTIFICATE MODAL FUNCTION
// ==========================================
window.closeCertModal = function() {
  const modal = document.getElementById("certModal");
  if (modal) {
    modal.classList.remove("active");
  
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
    
    document.body.style.overflow = "auto";
  }
};

  function initFooterFeatures() {
    // 1. LIVE LOCAL TIME — Davao City (Asia/Manila, UTC+8)
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

  document.addEventListener('DOMContentLoaded', () => {
    initFooterFeatures();

    // 3. CONSOLE EASTER EGG
    console.log(
      "%c✦ hey there, fellow dev! ✦",
      "color:#c97a7a; font-size:16px; font-weight:bold; font-family: sans-serif;"
    );
    console.log(
      "%cthanks for poking around. if you're a recruiter or just curious, let's connect: mishgellica@gmail.com",
      "color:#4a7a5a; font-size:13px; font-family: sans-serif;"
    );
    console.log(
      "%c(and yes, this portfolio was coded with a lot of trial, error, and ice cream.)",
      "color:#7a6050; font-size:12px; font-style: italic; font-family: sans-serif;"
    );
  });

const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

