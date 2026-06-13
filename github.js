window.applyTheme = function (theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('gh-launcher-theme', theme);
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

  searchInput.addEventListener('input', function () {
    searchButton.disabled = searchInput.value.trim().length === 0;
  });

  searchButton.addEventListener('click', launchSearch);

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') launchSearch();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  searchInput.focus();
});

function formatStars(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

async function fetchGitHubRepos(query) {
  var url = 'https://api.github.com/search/repositories?q=' + encodeURIComponent(query) + '&per_page=10&sort=stars&order=desc';
  var res = await fetch(url);
  if (!res.ok) throw new Error('GitHub API error: ' + res.status);
  return res.json();
}

function renderResults(items) {
  var container = document.getElementById('results-container');
  if (!container) return;
  container.innerHTML = '';

  if (!items || items.length === 0) {
    container.innerHTML = '<div class="results-status">No repositories found.</div>';
    return;
  }

  var list = document.createElement('ul');
  list.id = 'results-list';

  items.forEach(function (item) {
    var li = document.createElement('li');
    li.className = 'result-item';

    var name = document.createElement('span');
    name.className = 'repo-name';
    name.textContent = item.full_name;

    var stars = document.createElement('span');
    stars.className = 'repo-stars';
    stars.textContent = '★ ' + formatStars(item.stargazers_count);

    var desc = document.createElement('p');
    desc.className = 'repo-description';
    desc.textContent = item.description || 'No description';

    li.appendChild(name);
    li.appendChild(stars);
    li.appendChild(desc);

    li.addEventListener('click', function () {
      window.open(item.html_url, '_blank', 'noopener,noreferrer');
    });

    list.appendChild(li);
  });

  container.appendChild(list);
}

async function launchSearch() {
  var searchInput = document.getElementById('search-input');
  var container = document.getElementById('results-container');
  if (!searchInput || !container) return;

  var query = searchInput.value.trim();
  if (!query) return;

  container.innerHTML = '<div class="results-status">Searching...</div>';

  try {
    var data = await fetchGitHubRepos(query);
    renderResults(data.items);
  } catch (e) {
    container.innerHTML = '<div class="results-status">Error: ' + e.message + '</div>';
  }
}

window.fetchGitHubRepos = fetchGitHubRepos;
window.renderResults = renderResults;
