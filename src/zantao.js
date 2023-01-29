// ==UserScript==
// @name        ZenTaoUtils
// @namespace   limc92
// @match       https://zendao.yuntongxun.com/pro/effort-calendar.html
// @grant       none
// @version     1.0
// @author      -
// @description 2020/12/17 下午5:30:30
// ==/UserScript==
$(function () {
  'use strict';

  setTimeout(function () {
    let $dayCells = $('div#effortCalendar td.cell-day div.day');
    $dayCells.each(function (i, dayCell) {
      let $dayCell = $(dayCell);
      let $timeSpans = $dayCell.find('span.time');

      if ($timeSpans.length === 0) {
        return;
      }

      let timeValues = $timeSpans.map(function () {
        return parseFloat($(this).text().replace(/(\d+)h/, '$1'));
      }).get();

      let sum = timeValues.reduce((total, currentValue) => total + currentValue, 0);

      $dayCell.append(`<span class="number" style="font-weight: bolder">${sum}h</span>`);
    });
  }, 1000);







  function batchEditEffort() {
    fetch("https://zendao.yuntongxun.com/pro/effort-edit-146727.html?onlybody=yes", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://zendao.yuntongxun.com/pro/effort-edit-146935.html?onlybody=yes",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "product%5B%5D=200&project=831&objectType=task&objectID=20551",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });


    fetch("https://zendao.yuntongxun.com/pro/effort-edit-146935.html?onlybody=yes", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "iframe",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1"
      },
      "referrer": "https://zendao.yuntongxun.com/pro/effort-edit-146935.html?onlybody=yes",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "product%5B%5D=200&project=831&date=2021-10-14&consumed=1&left=1&objectType=task&objectID=20551&work=%E5%AE%8C%E5%96%84%E5%AF%B9%E8%AF%9D%E8%AE%B0%E5%BD%95%E6%97%81%E8%B7%AF",
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

  }

});