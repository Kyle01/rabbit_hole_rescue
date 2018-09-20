"use strict";
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});

let username;

chrome.runtime.onMessage.addListener(function(message) {
  let currNode = { _id: null };

  if (message.sender === "login") {
    username = message.username;
  }

  const setChildren = visit => {
    return new Promise (function(resolve, reject) {
      let par = visit.parent;
      let str = `_id=${par}&username=${username}&children=${visit._id}`;
      if (par) {
        let xhr = new XMLHttpRequest();
        xhr.open("PATCH", `http://localhost:5000/api/visits/update`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            let response = JSON.parse(xhr.response);
            resolve(response);
          }
        }

        xhr.onerror = function () {
          reject({
            status: xhr.status
          })
        }

        xhr.send(str);
      };
    });
  };

  const createWindow = windowId => {
    let str = `id=${windowId}&username=${username}`;
    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:5000/api/windows/`, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          resolve(response);
        } else {
          reject({
            status: xhr.status
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: xhr.status
        })
      };
      
      xhr.send(str);
    });
  };

  const addVisits = visit => {
    let str = `id=${visit.chromeWindowId}&visits=${visit._id}&username=${username}`;
    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("PATCH", `http://localhost:5000/api/windows/update`, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          resolve(response);
        }
      };

      xhr.onerror = function () {
        reject({
          status: xhr.status
        })
      };

      xhr.send(str);
    });
  };

  const createNode = tab => {
    let newNode = {
      url: tab.url,
      title: tab.title,
      chromeTabId: tab.id,
      chromeWindowId: tab.windowId,
      children: [],
      username: username
    };
    if (currNode && currNode.chromeTabId === newNode.chromeTabId) {
      newNode.parent = currNode._id;
    } else {
      newNode.parent = null;
    }
    return newNode;
  };

  const createVisit = visit => {
    let parent = (visit.parent ? visit.parent : -1);
    let str = `title=${visit.title}&url=${
      visit.url
      }&chromeTabId=${visit.chromeTabId}&chromeWindowId=${
      visit.chromeWindowId
      }&parent=${parent}&username=${username}`;
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/visits/", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          resolve(response);
          }
        }

        xhr.onerror = function() {
          reject({ status: xhr.status });
        };
      xhr.send(str);
    });
  };

  const activatedListener = () => {
  };

  const updatedListener = async function(visitId, changeInfo, visit) {
  
    if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
      let newNode = createNode(visit);
      await createWindow(visit.windowId)
      let res = await createVisit(newNode);
      currNode = res.visit;
      if (res.success) {
        await addVisits(res.visit);
      }
      await setChildren(res.visit);
    }
  };

  if (message.sender === "start") {
 
    const sleep = time => {
      let start = new Date().getTime();
      while (new Date().getTime() < start + time);
    };

    chrome.windows.getAll({ populate: true, windowTypes: ["normal"] }, async function (
      windows
    ) {
      for (let i = 0; i < windows.length; i++) {
        let window = windows[i];
        let res = await createWindow(window.id)
        
        let tabs = window.tabs;
        for (let j = 0; j < tabs.length; j++) {
          let visit = tabs[j];
          let newNode = createNode(visit);
          let res = await createVisit(newNode);

          if (res.success) {
            await addVisits(res.visit);
          }
          currNode = res.visit;
          sleep(250);
        };
      };

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