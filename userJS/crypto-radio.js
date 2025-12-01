// ==UserScript==
// @name         Crypto Radio
// @namespace    cr.bypass.gmxch
// @version      CR6
// @description  crypto radio bypass
// author        gmxch
// @match        *://*/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function PatchAds() {
        const container = document.querySelector('.container-fluid .row');
        if (!container) return;
        const adTypes = [
            { type: 'revbid-square', width: 300, height: 250 },
            { type: 'revbid-big-skyscraper', width: 120, height: 600 },
            { type: 'revbid-leaderboard', width: 728, height: 90 }
        ];
        for (let i = 0; i < 10; i++) {
            const ad = adTypes[i % adTypes.length];
            const fakeAd = document.createElement('div');
            fakeAd.className = 'placed-ad';
            fakeAd.id = `${ad.type}-dummy-${i+1}`;
            fakeAd.style.width = ad.width + 'px';
            fakeAd.style.minWidth = ad.width + 'px';
            fakeAd.style.height = ad.height + 'px';
            fakeAd.style.minHeight = ad.height + 'px';
            fakeAd.style.backgroundColor = 'rgba(0,0,0,0.05)';
            fakeAd.style.border = '1px solid rgba(0,0,0,0.1)';
            fakeAd.style.display = 'block';
            fakeAd.style.visibility = 'visible';
            fakeAd.style.margin = '5px';
            for (let j = 0; j < 3; j++) {
                const child = document.createElement('span');
                child.textContent = `kontol pecah ${j+1}`;
                fakeAd.appendChild(child);
            }
            container.appendChild(fakeAd);
        }
    }

    function PatchNetwork() {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (/revbid\.net|prebid\.revbid\.net/.test(url)) {
                return Promise.resolve(new Response(JSON.stringify({status:200})));
            }
            return originalFetch.apply(this, arguments);
        };
        const origXHR = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(method, url) {
            this.isFake = /revbid\.net|prebid\.revbid\.net/.test(url);
            return origXHR.apply(this, arguments);
        };
        const sendXHR = window.XMLHttpRequest.prototype.send;
        window.XMLHttpRequest.prototype.send = function(body) {
            if (this.isFake) {
                this.onload && this.onload();
            } else {
                sendXHR.apply(this, arguments);
            }
        };
    }
    function PatchVisibile() {
        const ads = document.querySelectorAll('.placed-ad, [id^="revbid-"], [id^="google_ads_"]');
        ads.forEach(ad => {
            ad.style.display = 'block';
            ad.style.visibility = 'visible';
            if (!ad.style.width) ad.style.width = '120px';
            if (!ad.style.height) ad.style.height = '60px';
        });
    }
    setTimeout(() => {
        PatchAds();
        PatchNetwork();
        PatchVisibile();
    }, 1500);
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