document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('#yt-btn');
  btn.addEventListener('click', function () {
    window.open('https://www.youtube.com', '_blank', 'noopener,noreferrer');
  });
});
