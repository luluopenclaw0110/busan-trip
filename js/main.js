/* =========================================
   BUSAN TRIP - JavaScript
   秋天釜山・暖秋海洋色調
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero Image Loaded Animation ---- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    heroBg.classList.add('loaded');
  }

  /* ---- Header Scroll Effect ---- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ---- Mobile Navigation Toggle ---- */
  const navToggle = document.querySelector('.nav-toggle');
  const headerNav = document.querySelector('.header__nav');
  if (navToggle && headerNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      headerNav.classList.toggle('open');
      document.body.style.overflow = headerNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on nav link click
    headerNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        headerNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Fade-in on Scroll (Intersection Observer) ---- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ---- Page Navigation (spots.html / food.html) ---- */
  const pageNavBtns = document.querySelectorAll('.page-nav__btn');
  const pageSections = document.querySelectorAll('.page-section');

  if (pageNavBtns.length > 0) {
    pageNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        // Update active nav
        pageNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Scroll to section
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offset = 68 + 52 + 16; // header + nav + gap
          const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });

    // Highlight active nav on scroll
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 200;
      let currentId = '';

      pageSections.forEach(section => {
        if (section.offsetTop <= scrollY) {
          currentId = section.getAttribute('id');
        }
      });

      pageNavBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-target') === currentId);
      });
    }, { passive: true });
  }

  /* ---- Smooth Scroll for Anchor Links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 68;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
