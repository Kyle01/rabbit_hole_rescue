// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
    });

    // chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    //     let = tabs.url;
    //     console.log(tabs);
    // });

    // chrome.tabs.getCurrent(function(result) {console.log(result); });

    // chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, function(windows){
    //     const tabs = {}; 
    //     windows.forEach (window => {
    //         tabs[window.id] = window.tabs
    //     })

    //     console.log(tabs);
    // });

    // chrome.history.getVisits({ url: 'https://expressjs.com/en/guide/routing.html'}, function(results) {
    //     console.log(results);
    // });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'developer.chrome.com' },
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    let savedTabs = {};
    chrome.tabs.query({currentWindow: true}, function(tabs){
        tabs.forEach(tab => {
            savedTabs[tab.id] = { url: tab.url, title: tab.title };
        });

        chrome.tabs.onCreated.addListener(function(tab) {
            savedTabs[tab.id] = { url: tab.url, title: tab.title };
            // console.log(tab);
            // console.log(savedTabs);
        });

        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            console.log(tabId);
            if (changeInfo.url !== undefined ) {
                console.log(changeInfo.url);
            }
        });

        
    })
    console.log(savedTabs);
});