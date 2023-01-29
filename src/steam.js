// ==UserScript==
// @name        My Steam Tools
// @namespace   v-limc
// @match        https://steamcommunity.com/id/*/badges/
// @match        https://steamcommunity.com/id/*/stats/appid/*/achievements
// @grant       none
// @version     1.0
// @author      limc
// @description 2021/10/4 下午8:27:22
// @require      https://unpkg.com/jquery
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 隐藏已解锁成就
     */
     $('#personalAchieve > div.achieveRow').filter(function (index) {
        if ($("div.achieveUnlockTime", this).length > 0) {
            $(this).css('display', 'none')
        };
    })

    // 卖卡

    // let badges = $('div.maincontent > div.badges_sheet > div > a')
    // for (let badge of badges) {
    //     fetch(badge.href).then(response => response.text().then(text => {
    //         let multibuy = $(text).find('div.badge_cards_to_collect > div.gamecards_inventorylink > a')[0]
    //         if (multibuy) {
    //             let multibuyHref = multibuy.href.replace('https://steamcommunity-a.akamaihd.net/', 'https://steamcommunity.com/')
    //             fetch(multibuyHref).then(response => response.text().then(text => {
    //                 let inputs = $(text).find("tr:not([style='opacity: 0.5;']) input.market_dialog_input.market_multi_price")
    //                 let prices = $.map(inputs, input => {
    //                     let price = input.value
    //                     return +price.substr(price.lastIndexOf(' ') + 1)
    //                 })
    //                 let sum = prices.reduce((a, b) => a + b)
    //                 badge.innerText = `Price Needed: ${sum}`
    //                 if (prices.every(price => price <= 0.2)) {
    //                     console.log(multibuyHref)
    //                 }
    //             }))
    //         }
    //     }))
    // }

    // https://steamcommunity.com/id/mightyvincent/gamecards/504230/
    // https://steamcommunity.com/market/multibuy?appid=753&items[]=504230-Madeline&qty[]=0&items[]=504230-Badeline&qty[]=1&items[]=504230-Theo&qty[]=1&items[]=504230-Mr.%20Oshiro&qty[]=0&items[]=504230-Granny&qty[]=0

    // 获取市场价
    // https://steamcommunity.com/market/listings/753/299460-Woodle%20Bush#
    // fetch("https://steamcommunity.com/market/itemordershistogram?country=CN&language=schinese&currency=23&item_nameid=14370676&two_factor=0", {
    //     "credentials": "omit",
    //     "headers": {
    //         "accept": "*/*",
    //         "x-requested-with": "XMLHttpRequest"
    //     },
    //     "referrer": "https://steamcommunity.com/market/listings/753/299460-Woodle%20Bush",
    //     "referrerPolicy": "no-referrer-when-downgrade",
    //     "body": null,
    //     "method": "GET",
    //     "mode": "cors"
    // });

    // 获取库存
    // fetch("https://steamcommunity.com/inventory/76561198007199960/753/6?l=schinese", {
    //     "credentials": "include",
    //     "headers": {
    //         "accept": "*/*",
    //         "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-origin",
    //         "x-requested-with": "XMLHttpRequest"
    //     },
    //     "referrer": "https://steamcommunity.com/id/mightyvincent/inventory/",
    //     "referrerPolicy": "no-referrer-when-downgrade",
    //     "body": null,
    //     "method": "GET",
    //     "mode": "cors"
    // }).then(response => console.log(response.json()));


    // fetch("https://steamcommunity.com/market/multibuy?appid=753&items[]=368360-Ted&qty[]=1&items[]=368360-Sergeant&qty[]=0&items[]=368360-Dolores&qty[]=0&items[]=368360-Mary%20Jane&qty[]=0&items[]=368360-Timmy&qty[]=1", {
    //     "credentials": "include",
    //     "headers": {
    //         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    //         "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
    //         "cache-control": "max-age=0",
    //         "sec-fetch-mode": "navigate",
    //         "sec-fetch-site": "same-origin",
    //         "sec-fetch-user": "?1",
    //         "upgrade-insecure-requests": "1"
    //     },
    //     "referrer": "https://steamcommunity.com/id/mightyvincent/gamecards/368360/",
    //     "referrerPolicy": "no-referrer-when-downgrade",
    //     "body": null,
    //     "method": "GET",
    //     "mode": "cors"
    // });
})();