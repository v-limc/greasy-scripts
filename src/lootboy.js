// ==UserScript==
// @name         LootBoy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.lootboy.de/*
// @require      https://unpkg.com/jquery
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const lang = 'en';
  const API_URL = "https://api.lootboy.de";
  let TOKEN = JSON.parse(localStorage["reduxPersist:auth"]).token;

  async function fetchOffers(host) {
    return fetch(host + "/v1/offers?lang=" + lang, {
      method: "GET",
      headers: {Accept: "application/json", "Accept-Language": lang}
    }).then(function (e) {
      if (200 === e.status) return e.json();
      throw new Error("Fetch offers failed with status code " + e.status)
    })
  }

  async function fetchOffersTaken(host, token) {
    return fetch(host + "/v1/offers/taken?lang=" + lang, {
      method: "GET",
      headers: {Accept: "application/json", "Accept-Language": lang, Authorization: "Bearer " + token}
    }).then(function (e) {
      if (200 === e.status) return e.json();
      throw new Error("Fetch taken offers failed with status code " + e.status)
    })
  }

  async function takeUpOnOffer(host, token, id) {
    return fetch(host + "/v1/offers/" + id + "?lang=" + lang, {
      method: "PUT",
      headers: {Accept: "application/json", "Accept-Language": lang, Authorization: "Bearer " + token}
    }).then(function (e) {
      if (200 === e.status) return e.json();
      throw new Error("Take up on offer failed with status code " + e.status)
    })
  }

  async function onLootBtnClick() {
    let offerList = await fetchOffers(API_URL)
    console.log("all offers: ", offerList);

    let {offers: takenOfferIdList} = await fetchOffersTaken(API_URL, TOKEN);
    let takenOfferIdSet = new Set(takenOfferIdList)
    console.log("taken offer ids: ", takenOfferIdSet);

    let notTakenOfferList = offerList.filter(offer => !takenOfferIdSet.has(offer.id));
    console.log("not taken offers: ", notTakenOfferList);

    let message = offerList.map(offer => {
      const {description, id, diamondBonus} = offer;
      return `${description}(钻 * ${diamondBonus}): ${takenOfferIdSet.has(offer.id) ? "Taken" : "Not Taken"}`
    }).join("\n")
    if (confirm(message)) {
      for (let offer of offerList) {
        await takeUpOnOffer(API_URL, TOKEN, offer.id);
      }
    }
  }

  $(document).ready(() => {
    let btn = document.createElement("button")
    btn.innerText = "一键撸钻"
    document.getElementsByClassName('menuIcons')[0].append(btn)
    btn.onclick = () => onLootBtnClick()
  })
})
();
