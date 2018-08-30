// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let i = 0;

chrome.runtime.onInstalled.addListener(function () {
    let currNode = {id: null};
    const setCurrNode = () => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tab) {
            let currTab = tab[0];
            payload.windows[currTab.windowId].visits.forEach(visit => {
                let visitObj = payload.visits[visit];
                if (visitObj.url === currTab.url && visitObj.chromeTabId === currTab.id) {
                    currNode = visitObj;
                }
            })
        });
    };

    const historyNode = (visit) => {
        payload.windows[visit.windowId].visits.forEach(historyItemId => {
            let historyItem = payload.visits[historyItemId];
            if (historyItem.chromeTabId === visit.id && historyItem.url === visit.url) {
                currNode = historyItem;
                return true;
            } else {
                setCurrNode();
                return false;
            }
        })
    }

    const setChildren = (visit) => {
        // console.log(visit);
        let par = visit.parent;
        if (par) {
            payload.visits[par].children.push(visit.id);
        }
    };

    const idCreator = () => {
        return i++;
    };
    const getTransitionType = (url) => {
        chrome.history.getVisits({ url }, function (results) {
            if (results.length === 0) {
                return null;
            } else {
                return results.pop().id;
            }
        })
    };

    // const createWindow = (window, vistId) => {
    //     return {
    //         id: window.id,
    //         visits: [visitId]
    //     };
    // }

    const createNode = (tab) => {
        let id = idCreator()
        let newNode =  {
            id: id,
            url: tab.url,
            title: tab.title,
            chromeTabId: tab.id,
            chromeWindowId: tab.windowId,
            children: [],
            timeCreated: Date.now(),
            transitionType: getTransitionType(tab.url)
        }
        if (currNode.chromeTabId === newNode.chromeTabId) {
            newNode.parent = currNode.id;
        } else {
            newNode.parent = null;
        }
        return newNode;
    };

    // const setParent = (tab, payload) => {
    //     let window = payload.windows[tab.windowId];
    //     let candidateId = window.visits[window.visits.length - 1];
    //     let candidate = payload.visits[candidateId];
    //     if (candidate.tabId === tab.id) {
    //         parent.
    //     }
    // }

    let payload = {windows: {}, visits: {}};
    chrome.windows.getAll({populate: true, windowTypes: ["normal"]}, function(windows){
        windows.forEach(window => {
            let windowObject = {id: window.id, visits: []}
            window.tabs.forEach(visit => {
                let newNode = createNode(visit);
                // console.log(newNode);
                windowObject.visits.push(newNode.id);
                payload.visits[newNode.id] = newNode;
                payload.windows[visit.windowId] = windowObject;
            });
            // console.log(payload);
            
        })
        setCurrNode();
        window.localStorage.setItem(`session`, JSON.stringify(payload));
        

        // chrome.tabs.onCreated.addListener(function(tab) {
        //     if (tab.url === "chrome://newtab/") {return}
            
        //     let newNode = createNode(tab);
        //     payload[tab.windowId][tab.id].push(newNode);
        //     window.localStorage[sessionId] = JSON.stringify(payload);
        //     chrome.webNavigation.getAllFrames({ tabId: tab.id }, function (frames) {
        //         // console.log({ [tab.id]: frames })
        //     });
        //     // console.log(payload);
        //     // console.log(window.localStorage);
        // });
        chrome.tabs.onActivated.addListener(function() {
            setCurrNode();
        })
        chrome.tabs.onUpdated.addListener(function(visitId, changeInfo, visit) {
            
            if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
                // console.log(visit.url);
                let newNode = createNode(visit);

                //check if tab and url already exist and reset current node
                historyNode(visit)
                    
                payload.windows[visit.windowId].visits.push(newNode.id);
                payload.visits[newNode.id] = newNode;
                setChildren(newNode);
                
                window.localStorage.session = JSON.stringify(payload);
                console.log(payload);
                // console.log(window.localStorage);
            }
        });


        
        
    })
    // chrome.tabs.getCurrent( tab => {
    //     console.log(tab);
    // });
    // console.log(payload);
    // chrome.tabs.getAllInWindow(function(tabs) {
    //     console.log(tabs);
    // })

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
