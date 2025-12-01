// ==UserScript==
// @name         CHP Adblock
// @namespace    chp.bypass.gmxch
// @version      CHP
// @description  CHP bypass
// @author       gmxch
// @exclude      *://*/__cf_chl/*
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function(){
'use strict';
const ALLOWED_HOSTS = [];
if (ALLOWED_HOSTS.length && !ALLOWED_HOSTS.includes(location.hostname)) return;
const safe = fn=>{ try{ return fn(); }catch(e){} };
safe(()=> {
  Object.defineProperty(window, 'adsbygoogle', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: window.adsbygoogle || {}
  });
});
function addFakeBait(){
  safe(()=>{
    if (document.querySelector('.Ad-Container[data-ad-manager-id], #__fake_filter_ads_by_classname')) return;
    const bait = document.createElement('div');
    bait.className = 'adsbygoogle Ad-Container sidebar-ad ad-slot ad ads doubleclick ad-placement ad-placeholder adbadge BannerAd adsbox';
    bait.style.cssText = 'width:1px!important;height:1px!important;position:fixed!important;left:-10000px!important;top:-1000px!important;visibility:visible!important;pointer-events:none;';
    bait.setAttribute('data-ad-manager-id','1');
    bait.id = '__fake_filter_ads_by_classname';
    const inner = document.createElement('div');
    inner.style.cssText = 'height:1px;width:1px;visibility:visible';
    bait.appendChild(inner);
    (document.documentElement || document).appendChild(bait);
    if (document.body && !document.body.contains(bait)) document.body.appendChild(bait);
  });
}
addFakeBait();
(function patchCreateElement(){
  const orig = Document.prototype.createElement;
  Document.prototype.createElement = function(tagName, options){
    const el = orig.call(this, tagName, options);
    if (String(tagName).toLowerCase() === 'script'){
      const setSrc = src=>{
        try{
          if(!src) return;
          const s = String(src);
          if (s.includes('pagead2.googlesyndication.com') || s.includes('googlesyndication')){
            Object.defineProperty(el, 'src', { configurable:true, enumerable:true, writable:true, value: 'about:blank' });
            setTimeout(()=>{
              try{ if (typeof el.onload === 'function') el.onload(); el.dispatchEvent(new Event('load')); }catch(e){}
            },1);
            return;
          }
        }catch(e){}
        try{ el.setAttribute('src', src); }catch(e){}
      };
      const origSetAttr = el.setAttribute.bind(el);
      el.setAttribute = function(name, value){
        if (String(name).toLowerCase() === 'src'){ setSrc(value); } else origSetAttr(name, value);
      };
      Object.defineProperty(el, 'src', {
        configurable:true, enumerable:true,
        set(v){ setSrc(v); },
        get(){ return el.getAttribute && el.getAttribute('src'); }
      });
    }
    return el;
  };
})();
(function patchXHR(){
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url){
    this._tm_url = url;
    return origOpen.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function(body){
    try{
      const url = this._tm_url || '';
      if (typeof url === 'string' && (url.includes('pagead2.googlesyndication.com') || url.includes('googlesyndication'))){
        const self = this;
        setTimeout(()=>{
          try{
            self.readyState = 4;
            self.status = 200;
            self.responseURL = url;
            self.responseText = '/* stubbed ads script */';
            if (typeof self.onreadystatechange === 'function') self.onreadystatechange();
            if (typeof self.onload === 'function') self.onload();
          }catch(e){}
        },1);
        return;
      }
    }catch(e){}
    return origSend.apply(this, arguments);
  };
})();
(function nukeModalObserver(){
  const isMaybeChp = node => {
    try{
      if (!node || node.nodeType !== 1) return false;
      const txt = (node.textContent||'').toLowerCase();
      if (txt.includes('ads blocker') || txt.includes('adblock') || txt.includes('disable these ads')) return true;
      const html = (node.innerHTML||'').toLowerCase();
      if (html.includes('chpadblock') || html.includes('chp_adblock')) return true;
      const srcimg = (node.querySelector && node.querySelector('img') && node.querySelector('img').src) || '';
      if (srcimg.includes('chpadblock.com')) return true;
      const cls = (node.className||'').toLowerCase();
      if (cls.includes('chp_') || cls.includes('adblock') || cls.includes('chpadblock')) return true;
      return false;
    }catch(e){ return false; }
  };
  const removeNode = n => { try{ if(n.parentNode) n.parentNode.removeChild(n);}catch(e){} };
  const mo = new MutationObserver(muts=>{
    for (const m of muts){
      for (const n of m.addedNodes){
        if (isMaybeChp(n)) removeNode(n);
        if (n.querySelectorAll) n.querySelectorAll('*').forEach(el=>{ if (isMaybeChp(el)) removeNode(el); });
      }
    }
  });
  safe(()=> mo.observe(document.documentElement || document, { childList:true, subtree:true }));
  setTimeout(()=> safe(()=> {
    document.querySelectorAll('div,section,main,aside').forEach(el=> { if (isMaybeChp(el)) removeNode(el); });
  }), 80);
})();
safe(()=>{
  const patch = target=>{
    try{
      if (!target) return;
      if (target.prototype){
        if (target.prototype.startWithServer) target.prototype.startWithServer = function(cb){ try{ cb(false); }catch(e){} };
        if (target.prototype.checkClassRequest) target.prototype.checkClassRequest = function(cb){ try{ cb(false); }catch(e){} };
        if (target.prototype.fairAdblock) target.prototype.fairAdblock = function(){ return false; };
        target.prototype.initialize = function(){ this.enable = false; };
      }
    }catch(e){}
  };
  patch(window.CHPAdblock || window.ChpAdblock || window.chpAdblock || window.CHPadblock || window.ChpAdBlock);
});
setInterval(()=>{
  safe(()=> {
    if (!document.querySelector('.Ad-Container')) addFakeBait();
    if (!window.adsbygoogle) window.adsbygoogle = {};
    const brand = document.querySelector('[id^="chp"], [class*="chp"], img[src*="chpadblock.com"]');
    if (brand) brand.remove();
  });
}, 500);
})();

(function() {
  function GMXCH(){
    if (document.querySelector('[data-wm="gmxch"]')) return;
    const div = document.createElement('div');
    const myname = "gmxch"
    div.dataset.wm = myname;
    div.textContent = myname;
    div.style.setProperty('position', 'fixed', 'important');
    div.style.setProperty('top', '50px', 'important');
    div.style.setProperty('left', '50%', 'important');
    div.style.setProperty('transform', 'translateX(-50%)', 'important');
    div.style.setProperty('right', 'auto', 'important');
    div.style.setProperty('bottom', 'auto', 'important');
    div.style.fontStyle = 'italic';
    div.style.fontWeight = 'bold';
    div.style.opacity = '0.7';
    div.style.fontSize = '30px';
    div.style.pointerEvents = 'none';
    div.style.zIndex = '999999';
    (document.body || document.documentElement).appendChild(div);
  }

  if (document.body) {
    GMXCH();
  } else {
    const mo = new MutationObserver((m, obs) => {
      if (document.body) {
        obs.disconnect();
        GMXCH();
      }
    });
    mo.observe(document.documentElement || document, { childList: true, subtree: true });
    setTimeout(() => { try { GMXCH(); } catch(e){} }, 1500);
  }
})();