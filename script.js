/* RiemannChow 的作品 — 轻交互：滚动浮现、卡片跟随光晕、页脚年份 */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reveal = function (el) { el.classList.add('in'); };

  // 首屏内的元素同步显示，不依赖观察器回调时序
  var showInView = function () {
    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) reveal(el);
    });
  };
  showInView();

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) {
      if (!el.classList.contains('in')) io.observe(el);
    });
  } else {
    items.forEach(reveal);
  }

  // 兜底：页面加载完成后再检查一次；极端情况下 2 秒后无条件全部显示，
  // 避免任何环境问题导致内容一直隐藏。
  window.addEventListener('load', showInView);
  window.setTimeout(function () { items.forEach(reveal); }, 2000);

  // 卡片 hover 时让柔光跟着鼠标走
  Array.prototype.forEach.call(document.querySelectorAll('.tool-card.featured'), function (card) {
    card.addEventListener('pointermove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });
})();
