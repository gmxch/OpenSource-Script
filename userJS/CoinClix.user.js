// ==UserScript==
// @name         CoinClix
// @namespace    coinclix.bypass.gmxch
// @version      CC
// @description  coinclix bypass
// @author       gmxch
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_openInTab
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';
    function onHost(hosts, callback) {
        if (hosts.some(host => window.location.hostname.includes(host))) {
            callback();
        }
    }
    (function checkError() {
        const errorC1 = [
            '(C1)',
            'Invalid data',
            'Refresh',
            'Captcha verification failed!'
            ];
            let reloadPage = false;
            const matchError = node => {
                try {
                    const txt = node?.textContent?.trim() || '';
                    return errorC1.some(msg => txt.includes(msg));
                } catch { return false; }
            };
            const triggerReload = () => {
                if (reloadPage) return;
                reloadPage = true;
                setTimeout(() => {
                    try { window.location.href = window.location.href; } catch {}
                }, 500);
            };
            const observeNode = node => {
                if (!node) return;
                const mo = new MutationObserver(() => {
                    if (matchError(node)) {
                        triggerReload();
                        mo.disconnect();
                    }
                });
                mo.observe(node, { childList: true, subtree: true, characterData: true, attributes: true });
                setTimeout(() => mo.disconnect(), 100000);
            };
            try {
                const errNode = document.getElementById('linkResErrorMsg');
                if (matchError(errNode) || matchError(document.body)) {
                    triggerReload();
                } else {
                    observeNode(errNode);
                    observeNode(document.body);
                }
            } catch {}
    })();

    onHost(["coinclix.co"], function () {
        GM_addStyle(`
            #linkInitForm {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 999999;
                background: #f9f9f9;
                border-top: 2px solid #ccc;
                padding: 10px;
                box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
                font-family: sans-serif;
            }
            #linkInitForm input, #linkInitForm button {
            height: 30px;
            font-size: 14px;
            }
        `);

/*
            #linkInitForm input {
                margin-right: 10px;
            }
            #linkInitForm button {
                margin-top: 5px;
            }
*/
        const form = document.createElement('div');
        form.id = 'linkInitForm';
        form.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
        <input type="text" id="domainInput" placeholder="geekgrove.net" style="width:180px;" />
        <input type="text" id="codeInput" placeholder="Abc12" style="width:120px;" />
        <button id="sendBtn" class="btn btn-success">Submit</button>
        </div>
        <div id="resultBox" style="margin-top:5px;"></div>
        `;
        document.body.appendChild(form);

        function copyCode() {
            const els = document.querySelectorAll('[data-clipboard-text]');
            for (const el of els) {
                const val = el.getAttribute('data-clipboard-text');
                if (/^[A-Za-z0-9]{5}$/.test(val)) return val;
            }
            return '';
        }

        function copyUrl() {
            const els = document.querySelectorAll('[data-clipboard-text], a[href]');
            for (const el of els) {
                const val = el.getAttribute('data-clipboard-text') || el.getAttribute('href') || '';
                const match = val.match(/(geekgrove\.net|vitalityvista\.net|coinhub\.wiki)/);
                if (match) return match[1];
            }
            return '';
        }
        
        function copyFromAccordion() {
            const knownDomains = ['geekgrove.net', 'vitalityvista.net', 'coinhub.wiki'];
            const els = document.querySelectorAll('.accordion-body');
            for (const el of els) {
                const txt = el.textContent.trim();
                const domainMatch = txt.match(/(geekgrove\.net|vitalityvista\.net|coinhub\.wiki)/);
                const codeMatch = txt.match(/\b[A-Za-z0-9]{5}\b/);
                if (domainMatch && codeMatch) {
                    return {
                        domain: domainMatch[1],
                        code: codeMatch[0]
                    };
                }
            }
            return { domain: '', code: '' };
        }

        function submit(domain, code) {
            const resultBox = document.getElementById('resultBox');
            resultBox.innerHTML = 'Sending...';

            GM_xmlhttpRequest({
                method: 'POST',
                url: `https://${domain}/link/process/`,
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({ linkInit: code }),
                onload: function (response) {
                    try {
                        const result = JSON.parse(response.responseText);
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = result.message;

                        const link = tempDiv.querySelector('a');
                        if (link && link.href) {
                            const path = link.getAttribute('href');
                            const fullUrl = `https://${domain}${path}`;
                            resultBox.innerHTML = `<div style="border:1px solid #ccc; padding:5px; margin-top:5px;">Redirecting: <a href="${fullUrl}" target="_blank">${fullUrl}</a></div>`;
                            GM_openInTab(fullUrl, { active: true });
                        } else {
                            resultBox.innerHTML = `<div style="color:red;">Continue not Found</div>`;
                        }
                    } catch (e) {
                        resultBox.innerHTML = '<span style="color:red;">Invalid Response</span>';
                    }
                },
                onerror: function () {
                    resultBox.innerHTML = '<span style="color:red;">Failed send Data</span>';
                }
            });
        }
/*
        setTimeout(() => {
            const code = copyCode();
            const domain = copyUrl();
            if (code) document.getElementById('codeInput').value = code;
            if (domain) document.getElementById('domainInput').value = domain;
            if (code && domain) {
                submit(domain, code);
            }
        }, 1500);
*/
        setTimeout(() => {
            let code = copyCode();
            let domain = copyUrl();
            if (!code || !domain) {
                const result = copyFromAccordion();
                if (!code) code = result.code;
                if (!domain) domain = result.domain;
            }
            if (code) document.getElementById('codeInput').value = code;
            if (domain) document.getElementById('domainInput').value = domain;
            if (code && domain) {
                submit(domain, code);
            }
        }, 5000);
        
        document.getElementById('sendBtn').addEventListener('click', () => {
            const domain = document.getElementById('domainInput').value.trim();
            const code = document.getElementById('codeInput').value.trim();
            if (domain && code) {
                submit(domain, code);
            }
        });
    });
    
    onHost(["geekgrove.net", "vitalityvista.net", "coinhub.wiki"], function () {
    function autoClick(regex) {
        function robust(el) {
            try {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.click();
            } catch (e) {}
        }
        const els = document.querySelectorAll('button, a, div[role="button"], input[type="button"], input[type="submit"]');
        for (const el of els) {
            const txt = (el.innerText || el.value || '').trim();
            if (txt && regex.test(txt) && !el.disabled) {
                robust(el);
                break;
            }
        }
    }
    window.addEventListener('load', () => {
        setInterval(() => {
            autoClick(/start/i);
            autoClick(/continue/i);
            autoClick(/verify/i);
        }, 1000);
    });
    });
})();