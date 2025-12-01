// ==UserScript==
// @name         Shorthop
// @namespace    shorthop.bypass.gmxch
// @version      shorthop5.9
// @description  shorthop bypass
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  const jsHost = location.host;

  function renderCaptchaBox(imageUrl, icons, endpoint, basePayload, ccContent) {
    const box = document.createElement('div');
    box.id = 'captcha-box';
    box.style = `
      position: absolute;
      top: 400px;
      right: 30px;
      background: #fff;
      border: 1px solid #333;
      padding: 10px;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 9999;
      max-width: 500px;
      max-height: 100vh;
      overflow: auto;
    `;

    const iconButtons = icons.map((icon, i) => {
      return `<button data-index="${i}" style="margin:10px;">[${i}] ${icon}</button>`;
    }).join('');

    box.innerHTML = `
      <div style="margin-top:10px;"><b>Captcha Image:</b><br><img src="${imageUrl}" style="max-width:100%; border:1px solid #ccc;" /></div>
      <div style="margin-top:10px;"><b>Choose Icon:</b><br>${iconButtons}</div>
      <div id="captcha-status" style="margin-top:10px; color:green;"></div>
      <div style="margin-top:10px;"><b>Payload:</b>
      <pre id="payload-preview" style="background:#f9f9f9; border:1px solid #ccc; padding:5px; max-height:200px; overflow:auto;"></pre>
      </div>
      <button id="submit-payload" style="margin-top:10px;">Submit</button>
      `;

    document.body.appendChild(box);

    box.querySelectorAll('button[data-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const payload = new URLSearchParams(basePayload);
        for (const [key, value] of payload.entries()) {
          if (value === '') {
            payload.set(key, index);
            break;
          }
        }
        payload.delete('iconIndex');
        GM_xmlhttpRequest({
          method: 'POST',
          url: endpoint,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': location.href,
            'User-Agent': navigator.userAgent
          },
          data: payload.toString(),
          withCredentials: true,
          onload: res => {
            try {
              const json = JSON.parse(res.responseText);
              const isSuccess = Object.values(json).includes(true);
              if (isSuccess) {
                box.querySelector('#captcha-status').textContent = 'verified!';
                const captchaTagMatch = ccContent.match(/document\.querySelector\("([^"]+)"\)\.innerHTML\s*=\s*`/);
                const captchaTag = captchaTagMatch ? captchaTagMatch[1] : null;
                let tries = 0;
                const maxTries = 10;
                const interval = setInterval(() => {
                    tries++;
                    let targetForm = null;
                    if (captchaTag) {
                        targetForm = [...document.querySelectorAll('form')].find(form => {
                            return form.getElementsByTagName(captchaTag).length > 0;
                        });
                    }
                    if (targetForm || tries >= maxTries) {
                        clearInterval(interval);
                        const finalPayload = {};
                        if (targetForm) {
                            const inputs = [...targetForm.querySelectorAll('input')];
                            inputs.forEach(input => {
                                const name = input.name;
                                const value = input.value;
                                if (name) finalPayload[name] = value;
                            });
                        }
                        const idMatches = [...ccContent.matchAll(/getElementById\("([^"]+)"\)/g)].map(m => m[1]);
                        const keyMatches = [...ccContent.matchAll(/\.value\s*=\s*response\.([a-zA-Z0-9_]+);/g)].map(m => m[1]);
                        for (let i = 0; i < Math.min(idMatches.length, keyMatches.length); i++) {
                            const inputId = idMatches[i];
                            const jsonKey = keyMatches[i];
                            if (json[jsonKey]) {
                                const input = document.getElementById(inputId);
                                const name = (input && input.name) ? input.name : inputId;
                                finalPayload[name] = json[jsonKey];
                            } 
                        }
                        document.getElementById('payload-preview').textContent = JSON.stringify(finalPayload, null, 2);
                        const form = document.createElement('form');
                        form.method = 'POST';
                        form.action = location.href;
                        form.style.display = 'none';
                        for (const [key, value] of Object.entries(finalPayload)) {
                            const input = document.createElement('input');
                            input.type = 'hidden';
                            input.name = key;
                            input.value = value;
                            form.appendChild(input);
                        }
                        document.body.appendChild(form);
                        setTimeout(() => {
                            form.submit();
                        }, 6000);
                    }
                }, 300);
              } else {
                box.querySelector('#captcha-status').textContent = 'failed Captcha';
              }
            } catch (e) {
              box.querySelector('#captcha-status').textContent = 'invalid Response';
            }
          },
          onerror: err => {
            box.querySelector('#captcha-status').textContent = 'failed ';
          }
        });
      });
    });
  }

  const slScript = [...document.scripts].find(s => s.src.includes('/sl/'));
  if (!slScript) return;

  const slUrl = slScript.src.startsWith('//')
    ? `https:${slScript.src}`
    : slScript.src.startsWith('/')
      ? `${location.origin}${slScript.src}`
      : slScript.src;

  GM_xmlhttpRequest({
    method: 'GET',
    url: slUrl,
    headers: {
      'Referer': location.href,
      'User-Agent': navigator.userAgent
    },
    onload: res => {
      const slContent = res.responseText;
      const tokenMatch = slContent.match(/\?[a-f0-9]{32}=true/);
      const token = tokenMatch ? tokenMatch[0] : null;
      const ccMatch = slContent.match(/\/cc\/[\w\d]+\.js\?onload=[\w\d]+&action=captcha/);
      const ccUrl = ccMatch ? `https://${jsHost}${ccMatch[0]}` : null;
      const keyMatch = slContent.match(/data:\s*\{\s*([a-zA-Z0-9_]+)\s*:\s*1\s*\}/);
      const key = keyMatch ? keyMatch[1] : null;
      if (token && key && ccUrl) {
        const validationUrl = slUrl.replace(/\/sl\/.+\.js/, '/') + token;
        GM_xmlhttpRequest({
          method: 'POST',
          url: validationUrl,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': location.href,
            'User-Agent': navigator.userAgent
          },
          data: `${key}=1`,
          onload: res2 => {
            GM_xmlhttpRequest({
              method: 'GET',
              url: ccUrl,
              headers: {
                'Referer': location.href,
                'User-Agent': navigator.userAgent
              },
              onload: res3 => {
                const ccContent = res3.responseText;
                const imgMatch = ccContent.match(/<img\s+src="([^"]+)"/);
                const imageUrl = imgMatch ? `https://${jsHost}${imgMatch[1]}` : null;
                const iconMatch = ccContent.match(/captchaData\s*=\s*\{\s*"options"\s*:\s*\[([^\]]+)\]/);
                const iconsRaw = iconMatch ? iconMatch[1] : '';
                const icons = iconsRaw.split(',').map(i => i.replace(/["']/g, '').trim());
                const postMatch = ccContent.match(/xhr\.open\("POST",\s*"([^"]+)"/);
                const endpoint = postMatch ? `https://${jsHost}${postMatch[1]}` : null;
                const payloadMatch = ccContent.match(/xhr\.send\(\s*"([^"]+)"\s*\+\s*([a-zA-Z0-9_]+)\s*\)/);
                const basePayload = payloadMatch ? payloadMatch[1] : '';
                if (imageUrl && icons.length && endpoint && basePayload) {
                  renderCaptchaBox(imageUrl, icons, endpoint, basePayload, ccContent);
                }
              }
            });
          }
        });
      }
    }
  });
})();