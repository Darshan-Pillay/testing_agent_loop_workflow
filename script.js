document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('#yt-btn');
  btn.addEventListener('click', function () {
    window.open('https://www.youtube.com', '_blank', 'noopener,noreferrer');
  });
});

window.applyTheme = function (theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('yt-launcher-theme', theme);
  var icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
  var toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  var icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.textContent = current === 'dark' ? '🌙' : '☀️';
  }
  toggleBtn.setAttribute('aria-pressed', current === 'light' ? 'true' : 'false');

  toggleBtn.addEventListener('click', function () {
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = currentTheme === 'dark' ? 'light' : 'dark';
    window.applyTheme(next);
  });
});
