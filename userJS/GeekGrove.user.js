// ==UserScript==
// @name         GeekGrove
// @namespace    geekgrove.bypass.gmxch
// @version      G9
// @description  geekgrove bypass
// @author       gmxch
// @match        *://vitalityvista.net/*
// @match        *://geekgrove.net/*
// @match        *://coinhub.wiki/*
// @run-at       document-start
// ==/UserScript==


(function(/*adb-patch*/) {
    'use strict';
    const originalCreateElement = Document.prototype.createElement;
    Document.prototype.createElement = function(tagName) {
        const el = originalCreateElement.call(this, tagName);
        if (['div','img','iframe'].includes(tagName)) {
            Object.defineProperty(el, 'offsetHeight', { get: () => 1 });
            Object.defineProperty(el, 'offsetWidth', { get: () => 1 });
            Object.defineProperty(el, 'naturalWidth', { get: () => 1 });
            Object.defineProperty(el, 'complete', { get: () => true });
        }
        return el;
    };
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if(node.tagName === 'IFRAME' && node.src.includes('acceptable.a-ads.com')) {
                    node.style.display = 'block';
                    node.style.width = '1px';
                    node.style.height = '1px';
                    node.style.position = 'absolute';
                }
                if(node.tagName === 'IMG' && (node.src.includes('hilltopads') || node.src.includes('adskeeper'))) {
                    node.style.display = 'block';
                    node.width = 1;
                    node.height = 1;
                }
            });
        });
    });
    observer.observe(document, { childList: true, subtree: true });
    window.addEventListener('DOMContentLoaded', () => {
        let ccv1 = document.querySelector('.ccv1');
        if(!ccv1) {
            ccv1 = document.createElement('input');
            ccv1.type = 'hidden';
            ccv1.className = 'ccv1';
            ccv1.id = 'ccv1';
            ccv1.value = 'dummy_token';
            document.body.appendChild(ccv1);
        }
        const cpObj = document.getElementById('cpobj');
        if(cpObj) {
            cpObj.addEventListener('cpend', () => {
                const cpRes = document.getElementById('cpres').value;
                ccv1.value = cpRes;
                if(typeof window.submitVerification === 'function') {
                    window.submitVerification(cpRes);
                }
            });
        }
    });
    window.dataLayer = window.dataLayer || [];
    window.google_tag_manager = window.google_tag_manager || { 'GTM-XXXX': {} };

})();

(function(/*timer-patch*/) {
  'use strict';
  window.addEventListener('load', () => {
    const waitTimer = setInterval(() => {
      const timerInput = document.getElementById('lpt');
      if (timerInput) {
        clearInterval(waitTimer);
        timerInput.value = '0';
        const timerDisplay = document.getElementById('linkTimer');
        if (timerDisplay) {
          timerDisplay.innerText = '0';
        }
      }
    }, 500);
  });
})();

(function(/*watermark*/) {
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
