/* Scroll Reveal - Intersection Observer based animations */
(function () {
  'use strict';

  // Tag elements for animation based on their role
  function tagElements() {
    // Section headings fade up
    document.querySelectorAll('.section h2, .section .section-intro, .section .lead').forEach(function (el) {
      if (!el.closest('.hero')) el.classList.add('reveal');
    });

    // Card grids stagger in
    document.querySelectorAll('.thesis-grid, .portfolio-grid, .about-pillars, .criteria-grid').forEach(function (el) {
      el.classList.add('reveal-stagger');
    });

    // About content slides from left
    document.querySelectorAll('.about-content').forEach(function (el) {
      el.classList.add('reveal');
    });

    // Individual portfolio cards (if not in a stagger container)
    document.querySelectorAll('.portfolio-card').forEach(function (el) {
      if (!el.parentElement.classList.contains('reveal-stagger')) {
        el.classList.add('reveal');
      }
    });

    // Filter bar
    document.querySelectorAll('.portfolio-filters, .filter-bar').forEach(function (el) {
      el.classList.add('reveal');
    });

    // Stats / numbers
    document.querySelectorAll('.stats-grid, .stats').forEach(function (el) {
      el.classList.add('reveal-stagger');
    });

    // Contact section
    document.querySelectorAll('.contact-content, .contact .container > *').forEach(function (el) {
      el.classList.add('reveal');
    });
  }

  function initObserver() {
    var options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      tagElements();
      initObserver();
    });
  } else {
    tagElements();
    initObserver();
  }
})();
