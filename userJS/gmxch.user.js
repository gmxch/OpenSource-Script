// ==UserScript==
// @name         gmxch
// @namespace    template.by.gmxch
// @version      gmxch
// @description  gmxch watermark
// @author       gmxch
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==


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