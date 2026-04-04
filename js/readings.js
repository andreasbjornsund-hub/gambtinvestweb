/* ── Key Readings Slider ── */
(function () {
  const track = document.getElementById('readingsTrack');
  if (!track) return;

  const wrap = track.closest('.readings-slider-wrap');
  const btnL = wrap.querySelector('.readings-arrow--left');
  const btnR = wrap.querySelector('.readings-arrow--right');

  // Scroll distance = roughly 3 cards
  function scrollAmount() {
    return track.clientWidth * 0.75;
  }

  btnL.addEventListener('click', function () {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  btnR.addEventListener('click', function () {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  // ── Auto-scroll (pause on hover / touch) ──
  var autoInterval = null;
  var paused = false;

  function startAuto() {
    if (autoInterval) return;
    autoInterval = setInterval(function () {
      if (paused) return;
      // If near the end, loop back
      var maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 4000);
  }

  function stopAuto() {
    clearInterval(autoInterval);
    autoInterval = null;
  }

  // Pause on hover / touch
  track.addEventListener('mouseenter', function () { paused = true; });
  track.addEventListener('mouseleave', function () { paused = false; });
  track.addEventListener('touchstart', function () { paused = true; }, { passive: true });
  track.addEventListener('touchend', function () {
    // Resume after a short delay so swipe feels natural
    setTimeout(function () { paused = false; }, 2000);
  });

  // Also pause when arrow buttons are used (resume after delay)
  [btnL, btnR].forEach(function (btn) {
    btn.addEventListener('click', function () {
      paused = true;
      setTimeout(function () { paused = false; }, 5000);
    });
  });

  startAuto();

  // ── Keyboard navigation (when section is in view) ──
  document.addEventListener('keydown', function (e) {
    if (!isInViewport(track)) return;
    if (e.key === 'ArrowLeft') {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    }
  });

  function isInViewport(el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }
})();
