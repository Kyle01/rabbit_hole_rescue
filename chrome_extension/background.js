
'use strict';

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

let i = 0;

chrome.runtime.onMessage.addListener(function(message){
    let payload = { windows: {}, visits: {} };
    let currNode = { id: null };

    const setCurrNode = () => {
        chrome.tabs.query({ active: true, windowId: currNode.chromeWindowId }, function (tab) {
            let currTab = tab[0];
            payload.windows[currTab.windowId].visits.forEach(visit => {
                let visitObj = payload.visits[visit];
                if (visitObj.url === currTab.url && visitObj.chromeTabId === currTab.id) {
                    currNode = visitObj;
                }
            });
        });
    };

    const setChildren = (visit) => {
        let par = visit.parent;
        if (par) {
            payload.visits[par].children.push(visit.id);
        }
    };

    const idCreator = () => {
        return i++;
    };

    const historyNode = (visit) => {
        let historyIds = payload.windows[visit.windowId].visits;
        for (let i = 0; i < historyIds.length; i++) {
            let historyItem = payload.visits[historyIds[i]];
            if (historyItem.chromeTabId === visit.id && historyItem.url === visit.url) {
                return historyItem;
            }
        }
        return null;
    };

    const getTransitionType = (url) => {
        chrome.history.getVisits({ url }, function (results) {
            if (results.length === 0) {
                return null;
            } else {
                return results.pop().id;
            }
        });
    };

    const createNode = (tab) => {
        let id = idCreator();
        let newNode = {
            id: id,
            url: tab.url,
            title: tab.title,
            chromeTabId: tab.id,
            chromeWindowId: tab.windowId,
            children: [],
            timeCreated: Date.now(),
            transitionType: getTransitionType(tab.url)
        };
        if (currNode.chromeTabId === newNode.chromeTabId) {
            newNode.parent = currNode.id;
        } else {
            newNode.parent = null;
        }
        return newNode;
    };

    const activatedListener = () => {
        setCurrNode();
    };

    const updatedListener = (visitId, changeInfo, visit) => {

        if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
            let newNode = createNode(visit);
            let histNode = historyNode(visit);
            if (histNode) {
                currNode = histNode;
            } else {
                setCurrNode();
                payload.windows[visit.windowId].visits.push(newNode.id);
                payload.visits[newNode.id] = newNode;
                setChildren(newNode);
            }
            window.localStorage.session = JSON.stringify(payload);
            console.log(payload);
        }
    };

    console.log(message.sender);
    if (message.sender === "start") {

        chrome.windows.getAll({ populate: true, windowTypes: ["normal"] }, function (windows) {
            windows.forEach(window => {
                let windowObject = { id: window.id, visits: [] };
                window.tabs.forEach(visit => {
                    let newNode = createNode(visit);
                    windowObject.visits.push(newNode.id);
                    payload.visits[newNode.id] = newNode;
                    payload.windows[visit.windowId] = windowObject;
                });

            });
            setCurrNode();
            window.localStorage.setItem(`session`, JSON.stringify(payload));

            chrome.tabs.onActivated.addListener(activatedListener);
            chrome.tabs.onUpdated.addListener(updatedListener);

        });
    }
    
    if (message.sender === "stop") {
        chrome.tabs.onUpdated.removeListener(activatedListener);
        chrome.tabs.onActivated.removeListener(updatedListener);
        chrome.runtime.reload();
    }
});






