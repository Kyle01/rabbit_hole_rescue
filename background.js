// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let i = 0;

chrome.runtime.onInstalled.addListener(function () {
    const idCreator = () => {
        return i++;
    }
    const getTransitionType = (url) => {
        chrome.history.getVisits({ url }, function (results) {
            if (results.length === 0) {
                return null;
            } else {
                return results.pop().id;
            }
        })
    };

    const createNode = (tab) => {
        return {
            url: tab.url,
            title: tab.title,
            chromeTabId: tab.id,
            chromeWindowId: tab.windowId,
            parent: null,
            children: [],
            timeCreated: Date.now(),
            transitionType: getTransitionType(tab.url)
        }
    }

    let savedTabs = {};
    chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, function(windows){
        windows.forEach(window => {
            window.tabs.forEach(tab => {
                let newNode = createNode(tab);
                savedTabs[idCreator()] = newNode;
            });
        })
        

        chrome.tabs.onCreated.addListener(function(tab) {
            if (tab.url === "chrome://newtab/") {return}
            
            let newNode = createNode(tab)
            savedTabs[idCreator()] = newNode;
            console.log(savedTabs);
        });

        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
                let newNode = createNode(tab);
                savedTabs[idCreator()] = newNode;
                console.log(savedTabs);
            }
        });

        
    })
    console.log(savedTabs);
});


// dates have windows

// windows have tabs 

// parent tabs have children tabs


// what to check for in node

//createWindow = new Window

//createTab = new Node

//updateTab = new Node with old Node as parent

//newTab BUT from link, where to put on tree

//save Node to folders?

//Node info
    //node_id*
    //website_url*
    //chrome_window_id*
    //chrome_tab_id*
    //website title*
    //website desc?
    //parent*
    //children*
    //currentNode
    //timeCreated*
    //timeRevisited?
    //timeUpdated?
    //timeLeft?
    //totalTime?
    //totalViews?
    //transitionType*
    //Notes?
    //favorite/save?


//Initial Node Info
    //id
    //web_url
    //chrome_window_id
    //chrome_tab_id
    //web_title
    //parent
    //children
    //timeCreated
    //transitionType

//listeners
    //createWindow
    //createTab
    //updateTab
    //changeTab/currentTab
