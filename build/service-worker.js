self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // می‌توانی اینجا کش ساده اضافه کنی یا فقط درخواست‌ها را عبور بدهی
}); 