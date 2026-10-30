// Surveillance feed: slow self-scrolling strip that loops seamlessly.
// Pauses on hover / touch / keyboard focus, can be dragged with a mouse or swiped,
// and stays still for visitors with reduced motion turned on.
(function () {
  var reel = document.querySelector('#feed .reel');
  if (!reel) return;
  var track = reel.querySelector('.reel-track');
  var originals = Array.prototype.slice.call(track.children);
  if (!originals.length) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var looping = !reduce.matches;

  // Clone the frames once so the strip can wrap without a visible seam.
  if (looping) originals.forEach(function (node) {
    var copy = node.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('img').forEach(function (img) { img.alt = ''; });
    track.appendChild(copy);
  });
  track.querySelectorAll('video').forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  var SPEED = 28; // pixels per second
  var pos = 0;
  var hovering = false, touching = false, focused = false, dragging = false;
  var resumeAt = 0;
  var last = 0;

  function loopWidth() {
    // Distance from the first frame to its clone.
    var clone = track.children[originals.length];
    return clone ? clone.offsetLeft - track.children[0].offsetLeft : 0;
  }

  function wrap() {
    var w = loopWidth();
    if (w <= 0) return;
    if (reel.scrollLeft > w) reel.scrollLeft -= w;
    else if (reel.scrollLeft < 1) reel.scrollLeft += w;
    pos = reel.scrollLeft;
  }

  function tick(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    var paused = reduce.matches || hovering || touching || focused || dragging || now < resumeAt || document.hidden;
    if (!paused) {
      pos += SPEED * dt;
      var w = loopWidth();
      if (w > 0 && pos >= w) pos -= w;
      reel.scrollLeft = pos;
    } else {
      pos = reel.scrollLeft;
    }
    requestAnimationFrame(tick);
  }

  // Only wrap here while the visitor is moving the strip; while it auto-scrolls,
  // tick() keeps the exact (sub-pixel) position itself.
  reel.addEventListener('scroll', function () {
    if (looping && (hovering || touching || focused || dragging || performance.now() < resumeAt)) wrap();
  }, { passive: true });
  reel.addEventListener('mouseenter', function () { hovering = true; });
  reel.addEventListener('mouseleave', function () { hovering = false; });
  reel.addEventListener('focusin', function () { focused = true; });
  reel.addEventListener('focusout', function () { focused = false; });
  reel.addEventListener('touchstart', function () { touching = true; }, { passive: true });
  reel.addEventListener('touchend', function () { touching = false; resumeAt = performance.now() + 2500; }, { passive: true });
  reel.addEventListener('touchcancel', function () { touching = false; }, { passive: true });

  // Mouse / pen drag. Touch uses the browser's own swipe scrolling.
  var startX = 0, startScroll = 0, moved = false;
  reel.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    dragging = true; moved = false;
    startX = e.clientX; startScroll = reel.scrollLeft;
    reel.classList.add('dragging');
    reel.setPointerCapture(e.pointerId);
  });
  reel.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    reel.scrollLeft = startScroll - dx;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    reel.classList.remove('dragging');
  }
  reel.addEventListener('pointerup', endDrag);
  reel.addEventListener('pointercancel', endDrag);
  reel.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

  // Arrow keys when the strip has focus.
  reel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { reel.scrollLeft += 200; e.preventDefault(); }
    if (e.key === 'ArrowLeft') { reel.scrollLeft -= 200; e.preventDefault(); }
  });

  if (!looping) return;
  reel.scrollLeft = pos = 1;
  requestAnimationFrame(tick);
})();
