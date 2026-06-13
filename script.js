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

document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search-input');
  var searchButton = document.getElementById('search-button');
  if (!searchInput || !searchButton) return;

  function launchSearch() {
    var trimmed = searchInput.value.trim();
    if (!trimmed) return;
    var url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(trimmed);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  searchInput.addEventListener('input', function () {
    searchButton.disabled = searchInput.value.trim().length === 0;
  });

  searchButton.addEventListener('click', launchSearch);

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') launchSearch();
  });
});
