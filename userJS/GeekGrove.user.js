// ==UserScript==
// @name         GeekGrove
// @namespace    geekgrove.bypass.gmxch
// @version      G11.4
// @description  geekgrove bypass
// @author       gmxch
// @match        *://vitalityvista.net/*
// @match        *://geekgrove.net/*
// @match        *://coinhub.wiki/*
// @run-at       document-start
// ==/UserScript==

try {
  Object.defineProperty(window.location, 'reload', {
    value: () => {},
    writable: false,
    configurable: false
  });
} catch (e) {}
window.location.reload = () => {};
window.onbeforeunload = null;

try {
  Object.defineProperty(window, 'rbls', {
    get: () => true,
    set: () => {},
    configurable: false
  });
} catch (e) {}

const originTO = window.setTimeout;
window.setTimeout = function(fn, delay) {
  const fnStr = fn.toString();
  if (fnStr.includes('revbid.net') && fnStr.includes('onerror') && fnStr.includes('reload')) {
    return originTO(() => {
      const originalReload = window.location.reload;
      window.location.reload = () => {};
      fn();
      window.location.reload = originalReload;
    }, delay);
  }
  return originTO(fn, delay);
};

const originAP = Element.prototype.appendChild;
Element.prototype.appendChild = function(child) {
  if (child.tagName === 'SCRIPT' && child.src && child.src.includes('revbid.net')) {
    child.onerror = () => {};
  }
  return originAP.call(this, child);
};

Object.defineProperty(HTMLScriptElement.prototype, 'onerror', {
  set: function(fn) {
    if (fn && fn.toString().includes('reload')) {
      this.onerror = () => {};
    } else {
      this.onerror = fn;
    }
  }
});
document.hasFocus = () => true;


function spooferAd(el) {
  try {
    Object.defineProperty(el, 'offsetHeight', { get: () => 1 });
    Object.defineProperty(el, 'offsetWidth', { get: () => 1 });
    Object.defineProperty(el, 'naturalWidth', { get: () => 32 });
    Object.defineProperty(el, 'complete', { get: () => true });
  } catch (e) {
    el.style.display = 'block';
    el.style.width = '1px';
    el.style.height = '1px';
    el.style.position = 'absolute';
  }
}

const originCE = Document.prototype.createElement;
Document.prototype.createElement = function(tagName) {
  const el = originCE.call(this, tagName);
  if (['div', 'img', 'iframe'].includes(tagName.toLowerCase())) {
    spooferAd(el);
  }
  return el;
};

function adbPatcher() {
  const selectors = [
    '.adsbox',
    '.banner_ads',
    'iframe[src*="a-ads"]',
    'img[alt="cclogo"]',
    'img[src*="adskeeper"]',
    'img[src*="hilltopads"]'
  ];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(spooferAd);
  });
}
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    adbPatcher();
  }
});
new MutationObserver(adbPatcher).observe(document, { childList: true, subtree: true });
new MutationObserver((mutations) => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.tagName === 'IFRAME' && node.src.includes('acceptable.a-ads.com')) {
        node.style.display = 'block';
        node.style.width = '1px';
        node.style.height = '1px';
        node.style.position = 'absolute';
      }
      if (node.tagName === 'IMG' && (node.src.includes('hilltopads') || node.src.includes('adskeeper'))) {
        node.style.display = 'block';
        node.width = 1;
        node.height = 1;
      }
    });
  });
}).observe(document, { childList: true, subtree: true });

window.dataLayer = window.dataLayer || [];
window.google_tag_manager = window.google_tag_manager || { 'GTM-XXXX': {} };

window.addEventListener('DOMContentLoaded', (/*captcha*/) => {
  let ccv1 = document.querySelector('.ccv1');
  if (!ccv1) {
    ccv1 = document.createElement('input');
    ccv1.type = 'hidden';
    ccv1.className = 'ccv1';
    ccv1.id = 'ccv1';
    ccv1.value = 'dummy_token';
    document.body.appendChild(ccv1);
  }
  const cpObj = document.getElementById('cpobj');
  if (cpObj) {
    cpObj.addEventListener('cpend', () => {
      const cpRes = document.getElementById('cpres').value;
      ccv1.value = cpRes;
      if (typeof window.submitVerification === 'function') {
        window.submitVerification(cpRes);
      }
    });
  }
});


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


(function() {
    'use strict';
    function hideElement() {
        const target = document.querySelector('.mb-4.mt-5.container-fluid');
        if (target) {
            target.style.display = 'none';
        }
    }
    window.addEventListener('load', hideElement);
    const observer = new MutationObserver(hideElement);
    observer.observe(document.body, { childList: true, subtree: true });
})();