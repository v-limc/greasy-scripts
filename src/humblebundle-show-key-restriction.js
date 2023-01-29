// ==UserScript==
// @name         Humble Key Restriction
// @description  Display Humble Bundle region restriction infomation on Humble's download page
// @author       Cloud
// @namespace    https://github.com/umaim/Humble-Key-Restriction
// @supportURL   https://github.com/umaim/Humble-Key-Restriction/issues
// @version      1.4.4
// @updateURL    https://github.com/umaim/Humble-Key-Restriction/raw/master/HKR.meta.js
// @downloadURL  https://github.com/umaim/Humble-Key-Restriction/raw/master/HKR.user.js
// @icon         https://humblebundle-a.akamaihd.net/static/hashed/46cf2ed85a0641bfdc052121786440c70da77d75.png
// @include      https://www.humblebundle.com/downloads*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

/* global GM_xmlhttpRequest */

(function () {
  'use strict';

  // From: https://github.com/clancy-chao/Steam-Bundle-Sites-Extension
  const localization = {
    AD: '安道尔',
    AE: '阿拉伯联合酋长国',
    AF: '阿富汗',
    AG: '安提瓜和巴布达',
    AI: '安圭拉',
    AL: '阿尔巴尼亚',
    AM: '亚美尼亚',
    AO: '安哥拉',
    AQ: '南极洲',
    AR: '阿根廷',
    AS: '美属萨摩亚',
    AT: '奥地利',
    AU: '澳大利亚',
    AW: '阿鲁巴',
    AX: '奥兰群岛',
    AZ: '阿塞拜疆',
    BA: '波斯尼亚和黑塞哥维那',
    BB: '巴巴多斯',
    BD: '孟加拉',
    BE: '比利时',
    BF: '布基纳法索',
    BG: '保加利亚',
    BH: '巴林',
    BI: '布隆迪',
    BJ: '贝宁',
    BL: '圣巴托洛缪岛',
    BM: '百慕大',
    BN: '文莱',
    BO: '玻利维亚',
    BQ: '博奈尔',
    BR: '巴西',
    BS: '巴哈马',
    BT: '不丹',
    BU: '缅甸',
    BV: '布韦岛',
    BW: '博兹瓦纳',
    BY: '白俄罗斯',
    BZ: '伯利兹',
    CA: '加拿大',
    CC: '科科斯（基林）群岛',
    CD: '刚果（金）',
    CF: '中非共和国',
    CG: '刚果（布）',
    CH: '瑞士',
    CI: '科特迪瓦',
    CK: '库克群岛',
    CL: '智利',
    CM: '喀麦隆',
    CN: '中国',
    CO: '哥伦比亚',
    CR: '哥斯达黎加',
    CS: '塞尔维亚和黑山',
    CU: '古巴',
    CV: '佛得角',
    CW: '库拉索',
    CX: '圣诞岛',
    CY: '塞浦路斯',
    CZ: '捷克',
    DE: '德国',
    DJ: '吉布提',
    DK: '丹麦',
    DM: '多米尼克',
    DO: '多米尼加',
    DZ: '阿尔及利亚',
    EC: '厄瓜多尔',
    EE: '爱沙尼亚',
    EG: '埃及',
    EH: '西撒哈拉',
    ER: '厄立特里亚',
    ES: '西班牙',
    ET: '埃塞俄比亚',
    FI: '芬兰',
    FJ: '斐济',
    FK: '福克兰群岛',
    FM: '密克罗尼西亚',
    FO: '法罗群岛',
    FR: '法国',
    GA: '加蓬',
    GB: '英国',
    GD: '格林纳达',
    GE: '格鲁吉亚',
    GF: '法属圭亚那',
    GG: '根西',
    GH: '加纳',
    GI: '直布罗陀',
    GL: '格陵兰',
    GM: '冈比亚',
    GN: '几内亚',
    GP: '瓜德鲁普',
    GQ: '赤道几内亚',
    GR: '希腊',
    GS: '南乔治亚岛和南桑威奇群岛',
    GT: '危地马拉',
    GU: '关岛',
    GW: '几内亚比绍',
    GY: '圭亚那',
    HK: '香港',
    HM: '赫德岛和麦克唐纳群岛',
    HN: '洪都拉斯',
    HR: '克罗地亚',
    HT: '海地',
    HU: '匈牙利',
    ID: '印尼',
    IE: '爱尔兰',
    IL: '以色列',
    IM: '马恩岛',
    IN: '印度',
    IO: '英属印度洋领地',
    IQ: '伊拉克',
    IR: '伊朗',
    IS: '冰岛',
    IT: '意大利',
    JE: '泽西岛',
    JM: '牙买加',
    JO: '约旦',
    JP: '日本',
    KE: '肯尼亚',
    KG: '吉尔吉斯',
    KH: '柬埔寨',
    KI: '基里巴斯',
    KM: '科摩罗',
    KN: '圣基茨和尼维斯',
    KP: '朝鲜',
    KR: '韩国',
    KW: '科威特',
    KY: '开曼群岛',
    KZ: '哈萨克斯坦',
    LA: '老挝',
    LB: '黎巴嫩',
    LC: '圣卢西亚',
    LI: '列支敦士登',
    LK: '斯里兰卡',
    LR: '利比里亚',
    LS: '莱索托',
    LT: '立陶宛',
    LU: '卢森堡',
    LV: '拉脱维亚',
    LY: '利比亚',
    MA: '摩洛哥',
    MC: '摩纳哥',
    MD: '摩尔多瓦',
    ME: '黑山',
    MF: '法属圣马丁',
    MG: '马达加斯加',
    MH: '马绍尔群岛',
    MK: '马其顿',
    ML: '马里',
    MM: '缅甸',
    MN: '蒙古',
    MO: '澳门',
    MP: '北马里亚纳群岛',
    MQ: '马提尼克',
    MR: '毛里塔尼亚',
    MS: '蒙塞拉特',
    MT: '马耳他',
    MU: '毛里求斯',
    MV: '马尔代夫',
    MW: '马拉维',
    MX: '墨西哥',
    MY: '马来西亚',
    MZ: '莫桑比克',
    NA: '纳米比亚',
    NC: '新喀里多尼亚',
    NE: '尼日尔',
    NF: '诺福克岛',
    NG: '尼日利',
    NI: '尼加拉瓜',
    NL: '荷兰',
    NO: '挪威',
    NP: '尼泊尔',
    NR: '瑙鲁',
    NU: '纽埃',
    NZ: '新西兰',
    OM: '阿曼',
    PA: '巴拿马',
    PE: '秘鲁',
    PF: '法属波利尼西亚a',
    PG: '巴布亚新几内亚',
    PH: '菲律宾',
    PK: '巴基斯坦',
    PL: '波兰',
    PM: '圣皮埃尔和密克隆',
    PN: '皮特凯恩群岛',
    PR: '波多黎各',
    PS: '巴勒斯坦',
    PT: '葡萄牙',
    PW: '帕劳',
    PY: '巴拉圭',
    QA: '卡塔尔',
    RE: '留尼旺島',
    RO: '罗马尼亚',
    RS: '塞尔维亚',
    RU: '俄罗斯',
    RW: '卢旺达',
    SA: '沙特阿拉伯',
    SB: '所罗门群岛',
    SC: '塞舌尔',
    SD: '苏丹',
    SE: '瑞典',
    SG: '新加坡',
    SH: '圣赫勒拿、阿森松与特斯坦达库尼亚',
    SI: '斯洛文尼',
    SJ: '斯瓦尔巴群岛和扬马延岛',
    SK: '斯洛伐克',
    SL: '塞拉利昂',
    SM: '圣马力诺',
    SN: '塞内加尔',
    SO: '索马里',
    SR: '苏里南',
    SS: '南苏丹',
    ST: '圣多美和普林西比',
    SV: '萨尔瓦多',
    SX: '荷属圣马丁',
    SY: '叙利亚',
    SZ: '斯威士兰',
    TC: '特克斯和凯科斯群岛',
    TD: '乍得',
    TF: '法属南部领土',
    TG: '多哥',
    TH: '泰国',
    TJ: '塔吉克斯坦',
    TK: '托克劳',
    TL: '东帝汶',
    TM: '土库曼斯坦',
    TN: '突尼斯',
    TO: '汤加',
    TR: '土耳其',
    TT: '特立尼达和多巴哥',
    TV: '图瓦卢',
    TW: '台湾',
    TZ: '坦桑尼亚',
    UA: '乌克兰',
    UG: '乌干达',
    UM: '美国本土外小岛屿',
    US: '美国',
    UY: '乌拉圭',
    UZ: '乌兹别克斯坦',
    VA: '圣座',
    VC: '圣文森特和格林纳丁斯',
    VE: '委内瑞拉',
    VG: '英属维尔京群岛',
    VI: '美属维尔京群岛',
    VN: '越南',
    VU: '瓦努阿图',
    WF: '瓦利斯和富图纳群岛',
    WS: '萨摩亚',
    XK: '科索沃',
    YE: '也门',
    YT: '马约特',
    ZA: '南非',
    ZM: '赞比亚',
    ZW: '津巴布韦',
  };

  /*Format: 
  { 
    Game Title : {
    exclusive_countries: Array<string>,
    disallowed_countries: Array<string>,
    machine_name: string,
    team_app_id:? number
    },
    Game Title : {...},
    ...
  }
  */
  const productsInfo = [];

  const getProductsInfo = () => {
    const splitedURL = location.href.split(/downloads\?key=([A-Za-z0-9]+)/);
    if (splitedURL.length >= 2) {
      const orderID = splitedURL[1];
      const ApiURL = `https://www.humblebundle.com/api/v1/order/${orderID}?all_tpkds=true`;
      console.log('Humble Key Restriction User Script::', `Request API ${ApiURL}`);
      /*GM_xmlhttpRequest({
        method: 'GET',
        url: ApiURL,
        onload: (res) => {
          const { status, responseText } = res;
          if (status === 200) {
            console.log("foobar", responseText)
            if (responseText != '') {
              const products = JSON.parse(responseText).tpkd_dict.all_tpks;
              for (let product of products) {
                const humanName = product.human_name;
                productsInfo[humanName] = {};
                productsInfo[humanName].exclusive_countries = product.exclusive_countries;
                productsInfo[humanName].disallowed_countries = product.disallowed_countries;
                productsInfo[humanName].machine_name = product.machine_name;
                if (product.steam_app_id && product.steam_app_id !== '') {
                  productsInfo[humanName].steam_app_id = product.steam_app_id;
                }
              }
              setTimeout(() => {
                insertHTML();
              }, 2000);
            }
          } else {
            console.error('Humble Key Restriction User Script::', `Request order failed with ${status} HTTP status and ${responseText} content.`);
          }
        },
      });*/
      fetch(ApiURL, {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          // "accept-language": "zh-CN,zh;q=0.9",
          // "sec-ch-ua": "\"Microsoft Edge\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
          // "sec-ch-ua-mobile": "?0",
          // "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.humblebundle.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }).then(response => {
        response.json()
          .then(json => {
              const products = json.tpkd_dict.all_tpks;
              for (let product of products) {
                const humanName = product.human_name;
                productsInfo[humanName] = {};
                productsInfo[humanName].exclusive_countries = product.exclusive_countries;
                productsInfo[humanName].disallowed_countries = product.disallowed_countries;
                productsInfo[humanName].machine_name = product.machine_name;
                if (product.steam_app_id && product.steam_app_id !== '') {
                  productsInfo[humanName].steam_app_id = product.steam_app_id;
                }
              }
              setTimeout(() => {
                insertHTML();
              }, 2000);
        });
        
      });
      
    }
  };

  const insertHTML = () => {
    let nodes = document.getElementsByClassName('key-redeemer');
    if (nodes.length === 0) {
      setTimeout(() => {
        console.error('Humble Key Restriction User Script::', 'Insert HTML again!');
        insertHTML();
      }, 500);
      return;
    }
    console.log('Humble Key Restriction User Script::', 'Insert HTML!');
    for (let node of nodes) {
      let headingNode = node.getElementsByClassName('heading-text');
      if (headingNode.length === 1) {
        let headingText = headingNode.item(0).firstElementChild.innerText.trim();
        const productInfo = productsInfo[headingText];
        if (productInfo) {
          const insertElem = document.createElement('div');
          insertElem.className = 'humble-key-restriction';

          // Add Steam Store Link
          if (productInfo.steam_app_id) {
            const steamAppElem = document.createElement('a');
            steamAppElem.href = `https://store.steampowered.com/app/${productInfo.steam_app_id}`;
            steamAppElem.setAttribute('lang', 'zh-CN');
            steamAppElem.textContent = `Steam 商店链接：https://store.steampowered.com/app/${productInfo.steam_app_id}`;
            steamAppElem.target = '_blank';
            steamAppElem.rel = 'noopener';
            insertElem.append(steamAppElem);
            insertElem.append(document.createElement('br'));
          }

          // Add Machine Name
          const machineNameElem = document.createElement('span');
          machineNameElem.innerText = `Machine Name: ${productInfo.machine_name}`;
          insertElem.append(machineNameElem);
          insertElem.append(document.createElement('br'));

          // Add restriction information
          if (productInfo.exclusive_countries.length === 0 && productInfo.disallowed_countries.length === 0) {
            const noRestrictionElem = document.createElement('span');
            noRestrictionElem.setAttribute('style', 'color: #97B147; font-weight: bold;');
            noRestrictionElem.setAttribute('lang', 'zh-CN');
            noRestrictionElem.innerText = '无激活限制';
            insertElem.append(noRestrictionElem);
          } else {
            if (productInfo.exclusive_countries.length > 0) {
              const exclusiveCountryElem = document.createElement('span');
              exclusiveCountryElem.setAttribute('style', 'color:red; font-weight: bold; word-wrap:break-word; overflow:hidden;');
              exclusiveCountryElem.setAttribute('lang', 'zh-CN');
              exclusiveCountryElem.innerText = `只能在以下地区激活：${translate(productInfo.exclusive_countries)}`;
              insertElem.append(exclusiveCountryElem);
              insertElem.append(document.createElement('br'));
            }
            if (productInfo.disallowed_countries.length > 0) {
              const disallowedCountryElem = document.createElement('span');
              disallowedCountryElem.setAttribute('style', 'color:red; font-weight: bold; word-wrap:break-word; overflow:hidden;');
              disallowedCountryElem.setAttribute('lang', 'zh-CN');
              disallowedCountryElem.innerText = `不能在以下地区激活：${translate(productInfo.disallowed_countries)}`;
              insertElem.append(disallowedCountryElem);
            }
          }
          node.querySelector('.container').after(insertElem);
        }
      }
    }
  };

  const translate = arr => {
    return arr.map(attr => localization[attr]).reduce((a, b) => `${a}、${b}`);
  };

  getProductsInfo();

})();
