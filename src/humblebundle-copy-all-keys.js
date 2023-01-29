// ==UserScript==
// @name        Humble Bundle - Copy All Keys
// @namespace   Violentmonkey Scripts
// @match       https://www.humblebundle.com/downloads
// @grant       none
// @version     1.0
// @author      -
// @description 2022/7/23 12:08:16
// ==/UserScript==

(function () {
  "use strict";

  const getAllKeys = () => {
    let r = $("div.key-list > div.key-redeemer")
      .map(
        (i, n) =>
          $(n).find("div.heading-text > h4")[0].innerText +
          " " +
          $(n).find("div.keyfield-value")[0].innerText
      )
      .get()
      .join("\n");
    return r;
  };

  function createButton() {
    $("div.sr-user").append(
      '<button class="sr-user-button js-sr-user-button sr-user-copy-all-keys"><i class="hb hb-steam sr-user-button-icon"></i><span class="sr-user-button-text">复制所有密钥</span></button>'
    );
    $(document).on(
      "click",
      ".sr-user-button.js-sr-user-button.sr-user-copy-all-keys",
      async function () {
        try {
            await navigator.clipboard.writeText(getAllKeys());
            alert("Copy success")
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
      }
    );
  }

  setTimeout(() => {
    createButton();
  }, 1000);
})();
