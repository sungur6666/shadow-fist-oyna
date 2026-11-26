const C='shadowfist-v6.6';const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'||q.url.endsWith('index.html')){e.respondWith(fetch(q).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(q,cp));return r}).catch(()=>caches.match(q).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(q,cp));return res})))});
