/**
 * Yellow Maxikiosco — main.js
 * Módulos: cursor, scroll, nav, reveal, burger, back-to-top, whatsapp float
 */

'use strict';

/* ═══════════════════════════════════════════
   UTILIDADES
═══════════════════════════════════════════ */

/**
 * Ejecuta un callback cuando el DOM está listo.
 * @param {Function} fn
 */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Debounce: limita la frecuencia de ejecución de una función.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Verifica si el dispositivo es touch (sin hover).
 * @returns {boolean}
 */
function isTouchDevice() {
  return !window.matchMedia('(hover: hover)').matches;
}

/**
 * Respeta la preferencia del usuario sobre movimiento.
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ═══════════════════════════════════════════
   MÓDULO: CURSOR PERSONALIZADO
═══════════════════════════════════════════ */
function initCursor() {
  if (isTouchDevice()) return; // Solo en desktop

  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (!cursor || !cursorRing) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  // Seguir posición del mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  }, { passive: true });

  // Animación fluida del ring con lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 17}px, ${ringY - 17}px)`;
    rafId = requestAnimationFrame(animateRing);
  }

  animateRing();

  // Hover en elementos interactivos
  const hoverTargets = document.querySelectorAll(
    'a, button, .product-card, .promo-card, .cel-item, .info-card'
  );

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovered'));
  });

  // Ocultar cursor al salir de la ventana
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
}

/* ═══════════════════════════════════════════
   MÓDULO: BARRA DE PROGRESO + SCROLL
═══════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

    bar.style.width = `${progress}%`;
    bar.setAttribute('aria-valuenow', Math.round(progress));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // Estado inicial
}

/* ═══════════════════════════════════════════
   MÓDULO: NAVBAR
═══════════════════════════════════════════ */
function initNavbar() {
  const nav      = document.getElementById('main-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!nav) return;

  function onScroll() {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('is-scrolled', scrolled);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Estado inicial

  // Active link según sección visible
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: '-10% 0px -60% 0px' }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
}

/* ═══════════════════════════════════════════
   MÓDULO: MENÚ MOBILE (BURGER)
═══════════════════════════════════════════ */
function initMobileMenu() {
  const burger   = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');

  if (!burger || !mobileNav) return;

  mobileNav.setAttribute('aria-hidden', 'true');

  function openMenu() {
    mobileNav.classList.add('is-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar menú de navegación');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Foco en el primer link
    const firstLink = mobileNav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú de navegación');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    burger.focus();
  }

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Cerrar al hacer click en un link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar al hacer click fuera
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMenu();
  });
}

/* ═══════════════════════════════════════════
   MÓDULO: REVEAL ON SCROLL
═══════════════════════════════════════════ */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Solo una vez
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ═══════════════════════════════════════════
   MÓDULO: BOTÓN VOLVER ARRIBA
═══════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function onScroll() {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
}

/* ═══════════════════════════════════════════
   MÓDULO: BOTÓN FLOTANTE WHATSAPP
═══════════════════════════════════════════ */
function initWhatsAppFloat() {
  const btn = document.getElementById('whatsapp-float');
  if (!btn) return;

  function onScroll() {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════
   MÓDULO: SMOOTH SCROLL PARA LINKS INTERNOS
═══════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight || 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  });
}

/* ═══════════════════════════════════════════
   MÓDULO: TICKER PAUSE ON FOCUS
═══════════════════════════════════════════ */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;

  // Pausa al hacer hover (ya cubierto por CSS) y al enfocar
  track.addEventListener('focusin', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('focusout', () => {
    track.style.animationPlayState = 'running';
  });

  // Respetar preferencia de movimiento reducido
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.animation = 'none';
  }
}

/* ═══════════════════════════════════════════
   MÓDULO: RESIZE HANDLER
═══════════════════════════════════════════ */
function initResizeHandler() {
  const handleResize = debounce(() => {
    // Cerrar menu mobile si se expande a desktop
    const mobileNav = document.getElementById('mobile-nav');
    const burger    = document.getElementById('burger');
    if (window.innerWidth > 768 && mobileNav?.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      burger?.classList.remove('is-open');
      burger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }, 150);

  window.addEventListener('resize', handleResize);
}

/* ═══════════════════════════════════════════
   INICIO — Orquesta todos los módulos
═══════════════════════════════════════════ */
ready(() => {
  initCursor();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initReveal();
  initBackToTop();
  initWhatsAppFloat();
  initSmoothScroll();
  initTicker();
  initResizeHandler();
});
