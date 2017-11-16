var CACHE_STATIC_NAME = "static-v2";
var CACHE_DYNAMIC_NAME = "dynamic-v2";

self.addEventListener('install', function(e){
    console.log("[Service Worker] Installing Service Worker...", e);
    e.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then((cache)=>{
                console.log("[Service Worker] Precaching App Shell");

                cache.addAll([
                    "./",
                    "./index.html",
                    "./app/bundle.js",
                    "./app/bundle.css"
                ]);
            })
    );
});

self.addEventListener('activate', function(e){
    console.log("[Service Worker] Activating Service Worker...", e);
    e.waitUntil(
        caches.keys()
            .then((keyList)=>{
                return Promise.all(keyList.map((key)=>{
                    if(key != CACHE_STATIC_NAME && key != CACHE_DYNAMIC_NAME)
                        return caches.delete(key);
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e){
    console.log("[Service Worker] Fetching something...", e);
    e.respondWith(
        caches.match(e.request)
            .then((response)=>{
                if(response)
                    return response;
                else
                    return fetch(e.request, {mode: "no-cors"})
                                .then((res)=>{
                                    return caches.open(CACHE_DYNAMIC_NAME)
                                        .then((cache)=>{
                                            cache.put(e.request.url, res.clone())
                                            return res;
                                        });
                                })
                                .catch(()=>{});
            })
    );
});