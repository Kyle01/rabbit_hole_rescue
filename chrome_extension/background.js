"use strict";

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});

let i = 0;
let username;
let windowObject = { id: null, visits: [], username: username };

chrome.runtime.onMessage.addListener(function(message) {
  let payload = { windows: {}, visits: {} };
  let currNode = { id: null };

  if (message.sender === "login") {
    username = message.username;
  }

  const setCurrNode = () => {
    chrome.tabs.query(
      { active: true, windowId: currNode.chromeWindowId },
      function(tab) {
        let currTab = tab[0];
        payload.windows[currTab.windowId].visits.forEach(visit => {
          let visitObj = payload.visits[visit];
          if (
            visitObj.url === currTab.url &&
            visitObj.chromeTabId === currTab.id
          ) {
            currNode = visitObj;
          }
        });
      }
    );
  };

  const setChildren = visit => {
    let par = visit.parent;
    if (par) {
      let xhr = new XMLHttpRequest();
      payload.visits[par].children.push(visit.id);
      let str = `id=${par}&children=${visit.id}`;
      xhr.open("PATCH", `http://localhost:5000/api/visits/update`, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(str);
    }
  };

  const createWindow = windowId => {
    let xhr = new XMLHttpRequest();
    let str = `id=${windowId}&visits=${[]}&username=${username}`;
    xhr.open("POST", "http://localhost:5000/api/windows/", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const addVisits = visit => {
    let xhr = new XMLHttpRequest();
    let str = `id=${visit.chromeWindowId}&visits=${visit.id}`;
    xhr.open("PATCH", `http://localhost:5000/api/windows/update`, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const idCreator = () => {
    return i++;
  };

  const historyNode = visit => {
    let historyIds = payload.windows[visit.windowId].visits;
    for (let i = 0; i < historyIds.length; i++) {
      let historyItem = payload.visits[historyIds[i]];
      if (
        historyItem.chromeTabId === visit.id &&
        historyItem.url === visit.url
      ) {
        return historyItem;
      }
    }
    return null;
  };

  const createNode = tab => {
    let id = idCreator();
    let newNode = {
      id: id,
      url: tab.url,
      title: tab.title,
      chromeTabId: tab.id,
      chromeWindowId: tab.windowId,
      children: [],
      username: username,
      timeCreated: new Date()
    };
    if (currNode.chromeTabId === newNode.chromeTabId) {
      newNode.parent = currNode.id;
    } else {
      newNode.parent = null;
    }
    return newNode;
  };

  const createVisit = visit => {
    let xhr = new XMLHttpRequest();

    addVisits(visit);
    setChildren(visit);

    let parent = visit.parent ? visit.parent : -1;
    let str = `id=${visit.id}&title=${visit.title}&url=${
      visit.url
    }&chromeTabId=${visit.chromeTabId}&chromeWindowId=${
      visit.chromeWindowId
    }&parent=${parent}&children=${
      visit.children
    }&username=${username}&timeCreated=${visit.timeCreated}`;

    xhr.open("POST", "http://localhost:5000/api/visits/", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const activatedListener = () => {
    setCurrNode();
  };

  const updatedListener = (visitId, changeInfo, visit) => {
    if (!payload.windows[visit.windowId]) {
      console.log(payload.windows);
      createWindow(visit.windowId);
    }

    if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
      let newNode = createNode(visit);
      let histNode = historyNode(visit);

      if (histNode) {
        currNode = histNode;
      } else {
        setCurrNode();
        createVisit(newNode);
        payload.visits[newNode.id] = newNode;
        payload.windows[visit.windowId] = windowObject;
      }
      let date = getYMDDate();

      window.localStorage[`session${date}`] = payload;
    }
  };

  if (message.sender === "start") {
    const sleep = time => {
      let start = new Date().getTime();
      while (new Date().getTime() < start + time);
    };

    chrome.windows.getAll({ populate: true, windowTypes: ["normal"] }, function(
      windows
    ) {
      windows.forEach(window => {
        windowObject = { id: window.id, visits: [], username: username };
        createWindow(window.id);
        window.tabs.forEach(visit => {
          let newNode = createNode(visit);
          windowObject.visits.push(newNode.id);
          createVisit(newNode);
          payload.visits[newNode.id] = newNode;
          payload.windows[visit.windowId] = windowObject;
          sleep(250);
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
  let yyyymmdd = [
    yyyy,
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("");
  return yyyymmdd;
}
