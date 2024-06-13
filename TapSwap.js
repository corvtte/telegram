// ==UserScript==
// @name         TapSwap
// @namespace    http://tampermonkey.net/
// @match        *://*.hamsterkombat.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function replaceScriptUrl() {
        const urlsToReplace = [
            'https://app.tapswap.club/js/telegram-web-app.js',
            'https://app.tapswap.club/js/telegram-web-app.js'
        ];
        const newUrl = 'https://github.com/corvtte/telegram/blob/main/telegram-web-app.js';

        const scripts = document.getElementsByTagName('script');
        for (let script of scripts) {
            if (urlsToReplace.includes(script.src)) {
                const newScript = document.createElement('script');
                newScript.src = newUrl;
                newScript.type = 'text/javascript';

                script.parentNode.replaceChild(newScript, script);
                console.log('Script URL replaced:', newScript.src);
            }
        }
    }

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                replaceScriptUrl();
            }
        });
    });

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(document.body, config);

    replaceScriptUrl();
})();
