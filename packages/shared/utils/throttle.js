export function throttle(func, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > wait) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}
