;

const CACHE_NAME = 'CV-WEB',
  urlsToCache = [
    './',
    'index.html',
    '../Proyecto_Tic+_Desarrollo_FrontEnd/Recursos/Css/estilos.css',

    '../Proyecto_Tic+_Desarrollo_FrontEnd/Recursos/Js/script.js',

    './Proyecto_Tic+_Desarrollo_FrontEnd/Recursos/PWA-Iconos/icons/icon-512x512.png',
    './Proyecto_Tic+_Desarrollo_FrontEnd/Recursos/PWA-Iconos/icons/icon-72x72.png'
  ];


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
});

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
});


self.addEventListener('fetch', e => {
  
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          
          return res
        }
        
        return fetch(e.request)
      })
  )
})