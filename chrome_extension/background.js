'use strict';
// import createVisit from '../frontend/src/util/visit_util2.js';

let xhr = new XMLHttpRequest()
console.log(xhr)

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
            // xhr.open("PATCH", `localhost:5000/api/visits/${par.id}`, true);
            // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // xhr.send(`${visit}`);
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
            timeCreated: new Date(),
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
                console.log(currNode);
                payload.windows[visit.windowId].visits.push(newNode.id);
                payload.visits[newNode.id] = newNode;
                setChildren(newNode);
                xhr.open("POST", "http://localhost:5000/api/visits/", true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(`${newNode}`);
            }
            // let date = Math.floor(Date.now() / 216000000);
            let date = getYMDDate();

            window.localStorage[`session${date}`] = payload;
            console.log(payload);
        }
    };

    console.log(message.sender);
    if (message.sender === "start") {

        const sleep = (time) => {
            let start = new Date().getTime();
            while (new Date().getTime() < start + time);
        }

        chrome.windows.getAll({ populate: true, windowTypes: ["normal"] }, function (windows) {
            windows.forEach(window => {
                let windowObject = { id: window.id, visits: [] };
                window.tabs.forEach(visit => {
                    let newNode = createNode(visit);
                    windowObject.visits.push(newNode.id);
                    
                    // console.log(`title=${newNode.title}&url=${newNode.url}&chromeTabId=${newNode.chromeTabId}&chromeWindowId=${newNode.chromeWindowId}&parent=${newNode.parent}&timeCreated=${newNode.timeCreated}`)
                    // xhr.send(`title=${newNode.title}&url=${newNode.url}&chromeTabId=${newNode.chromeTabId}&chromeWindowId=${newNode.chromeWindowId}&parent=${newNode.parent}&timeCreated=${newNode.timeCreated}`);
                    let parent = newNode.parent ? newNode.parent : -1;
                    let str = `title=${newNode.title}&url=${newNode.url}&chromeTabId=${newNode.chromeTabId}&chromeWindowId=${newNode.chromeWindowId}&parent=${parent}&children=${newNode.children}&timeCreated=${newNode.timeCreated}`;
                    // let str = `title=&hellourl=url&chromeTabId=4&chromeWindowId=5&parent=7`;
                    console.log("hello");
                    xhr.open("POST", "http://localhost:5000/api/visits/", true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.send(str);
                    sleep(250);
                    payload.visits[newNode.id] = newNode;
                    payload.windows[visit.windowId] = windowObject;
                    
                });
            });
            setCurrNode();
            let date = getYMDDate();
            window.localStorage.setItem(`session${date}`, payload);

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

function getYMDDate() {
    let date = new Date();

    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyymmdd = [yyyy,
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd].join('');
    return yyyymmdd;
}





