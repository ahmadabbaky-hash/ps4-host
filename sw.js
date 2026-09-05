const CACHE_NAME = 'ps4-host-v2';
const urlsToCache = [
  './',
  './index.html',
  './sw.js'
  // أضف هنا مسارات أي ملفات أخرى تريد حفظها، مثل:
  // './firmware/900/index.html',
  // './firmware/900/goldhen.bin'
];

// تثبيت الـ Service Worker وحفظ الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// استرجاع الملفات من الكاش في حالة عدم وجود إنترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // إرجاع الملف من الكاش
        }
        return fetch(event.request); // جلب الملف من الإنترنت إذا لم يكن مخزناً
      })
  );
});
