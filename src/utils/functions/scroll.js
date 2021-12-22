// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function scrollToElm(container, elm, duration) {
  var pos = getRelativePos(elm, container);
  scrollTo(container, pos.top - 47, duration / 1000); // duration in seconds
}

function getRelativePos(elm, container) {
  var pPos = container.getBoundingClientRect(), // parent pos
    cPos = elm.getBoundingClientRect(), // target pos
    pos = {};

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  (pos.top = cPos.top - pPos.top + container.scrollTop),
    (pos.right = cPos.right - pPos.right),
    (pos.bottom = cPos.bottom - pPos.bottom),
    (pos.left = cPos.left - pPos.left);

  return pos;
}

function scrollTo(element, to, duration, onDone) {
  var start = element.scrollTop,
    change = to - start,
    startTime = performance.now(),
    now,
    elapsed,
    t;

  function animateScroll() {
    now = performance.now();
    elapsed = (now - startTime) / 1000;
    t = elapsed / duration;

    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    element.scrollTop = start + change * easeInOutQuad(t);

    if (t < 1) window.requestAnimationFrame(animateScroll);
    else onDone && onDone();
  }

  animateScroll();
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
