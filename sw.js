const C='caminhadas-v1';
const A=['./','index.html','manifest.webmanifest','jspdf.umd.min.js','icon-192.png','icon-512.png','icon-180.png','fonts/barlow-400.woff2','fonts/barlow-600.woff2','fonts/barlow-condensed-700.woff2'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});
    const n=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>m);return m||n}))});
