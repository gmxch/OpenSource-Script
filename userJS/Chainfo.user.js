// ==UserScript==
// @name         Chainfo
// @namespace    chainfo.bypass.gmxch
// @version      CH3
// @description  chainfo bypass
// @author       gmxch
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function(){
  'use strict';
  if(window.__adbypass_applied) return;
  window.__adbypass_applied = true;
  try {
    Object.defineProperty(window, 'blockAdBlock', { value: { active: false, onDetected: ()=>{}, onNotDetected: ()=>{} }, configurable: true });
    Object.defineProperty(window, 'BlockAdBlock', { value: window.blockAdBlock, configurable: true });
    Object.defineProperty(window, 'fuckAdBlock', { value: { onDetected: ()=>{}, onNotDetected: ()=>{} }, configurable: true });
    Object.defineProperty(window, 'AdBlockDetector', { value: { isDetected: false }, configurable: true });
    window.canRunAds = true;
    window.adBlockActive = false;
    window.AdBlock = { enabled: false };
  } catch(e){}
  function createBait(id) {
    try {
      if (!document.getElementById(id)) {
        const el = document.createElement('div');
        el.id = id;
        el.style.width = '1px';
        el.style.height = '1px';
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        el.style.top = '-9999px';
        el.style.display = 'block';
        document.documentElement.appendChild(el);
      }
    } catch(e){}
  }
  const baitIds = [
    'a',            
    '8JJFp',        
    'wp-post-id1',  
    'wp-pl-corts',  
    'wp-pl-corts-2',
    'aswift_0'     
  ];
  for (const id of baitIds) {
    if (document.body) createBait(id);
    else document.addEventListener('DOMContentLoaded', ()=>createBait(id));
  }
  function createWidescreenBait() {
    try {
      ['widescreen1','widescreen2','widescreen3'].forEach((wid,i)=>{
        if(!document.getElementById(wid)) {
          const container = document.createElement('div');
          container.id = wid;
          container.style.display = 'none';
          const d = document.createElement('div');
          d.id = 'google_ads_dummy_' + (i+1);
          container.appendChild(d);
          document.documentElement.appendChild(container);
        }
      });
    } catch(e){}
  }
  if (document.body) createWidescreenBait();
  else document.addEventListener('DOMContentLoaded', createWidescreenBait);
  (function(){
    const origFetch = window.fetch;
    window.fetch = function(resource, init){
      try {
        const url = (typeof resource === 'string') ? resource : (resource && resource.url) || '';
        if (url && (url.includes('googleads.g.doubleclick.net') || url.includes('ad-maven.com') || url.includes('pagead/interaction') || url.includes('r123dddd.ad-maven.com') || url.includes('play.google.com/log'))) {
          return Promise.resolve({
            url: url + '?base64=yes',
            type: 'basic',  
            statusText: 'OK',
            ok: true,
            status: 200,
            text: () => Promise.resolve(''),
            json: () => Promise.resolve({}),
            headers: { get: ()=>null }
          });
        }
      } catch(e){}
      return origFetch ? origFetch.apply(this, arguments) : Promise.reject(new Error('fetch not available'));
    };
  })();
  (function(){
    const origAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(node) {
      try {
        if (node && node.tagName && node.tagName.toLowerCase() === 'script') {
          const src = node.src || '';
          if (src && (src.includes('adpartner.min.js') || src.includes('googleads.g.doubleclick.net') || src.includes('quesignifi.ca') || src.includes('ad-maven.com'))) {
            setTimeout(()=> {
              try {
                if (typeof node.onload === 'function') node.onload();
                const ev = new Event('load');
                node.dispatchEvent(ev);
              } catch(e){}
            }, 50);
            return origAppendChild.call(this, node);
          }
        }
      } catch(e){}
      return origAppendChild.call(this, node);
    };
  })();
  try {
    if(!window.swpfuncs) window.swpfuncs = { registerEvent: ()=>{} };
  } catch(e){}
  try {
    const OrigObserve = MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function(target, options) {
      return OrigObserve.call(this, target, options);
    };
  } catch(e){}
  document.addEventListener('DOMContentLoaded', function(){
    try {
      const container = document.createElement('div');
      container.id = 'google_ads_extra';
      container.style.display = 'none';
      document.documentElement.appendChild(container);
    } catch(e){}
  });
})();