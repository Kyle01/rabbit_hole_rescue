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
  console.log(message)
  let currNode = { _id: null };

  if (message.sender === "login") {
    username = message.username;
  }

  const getWindow = windowId => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:5000/api/windows/${username}/${windowId}`);
    xhr.send();
  }

  const getVisit = visit => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:5000/api/windows/${username}/${visit.windowId}/${visit.tabId}/${visit.url}`)
    xhr.send();
  }


  const setCurrNode = () => {
    // GET request
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
      let str = `_id=${par}&children=${visit._id}`;
      xhr.open("PATCH", `http://localhost:5000/api/visits/update`);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(str);
    }
  };

  const createWindow = windowId => {
    let xhr = new XMLHttpRequest();
    let str = `id=${windowId}&visits=${[]}&username=${username}`;
    xhr.open("POST", "http://localhost:5000/api/windows/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const addVisits = visit => {
    //get visit req here
    let xhr = new XMLHttpRequest();
    let str = `id=${visit.chromeWindowId}&visits=${visit._id}`;
    xhr.open("PATCH", `http://localhost:5000/api/windows/update`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const historyNode = visit => {
    // get request here
    let res = getVisit(visit);
    return res.visit;
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
    if (currNode.chromeTabId === newNode.chromeTabId) {
      newNode.parent = currNode._id;
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
    let str = `title=${visit.title}&url=${
      visit.url
    }` + `&chromeTabId=${visit.chromeTabId}&chromeWindowId=${
      visit.chromeWindowId
    }&parent=${parent}&children=${
      visit.children
    }&username=${username}`;


    xhr.open("POST", "http://localhost:5000/api/visits/");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  };

  const activatedListener = () => {
    setCurrNode();
  };

  const updatedListener = (visitId, changeInfo, visit) => {
    let res = getWindow(visit.windowId)
    if (!res.window) {
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
      }
      
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
        createWindow(window.id);
        window.tabs.forEach(visit => {
          let newNode = createNode(visit);
          createVisit(newNode);
          sleep(250);
        });
      });
      setCurrNode();

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

// function getYMDDate() {
//   let date = new Date();

//   let yyyy = date.getFullYear();
//   let mm = date.getMonth() + 1;
//   let dd = date.getDate();
//   let yyyymmdd = [
//     yyyy,
//     (mm > 9 ? "" : "0") + mm,
//     (dd > 9 ? "" : "0") + dd
//   ].join("");
//   return yyyymmdd;
// }

// xhr.onload = function () {
//   if (xhr.readyState === xhr.DONE) {
//     if (xhr.status === 200) {
//       let response = xhr.response;
//       if (response.includes("No Alert")) {
//         console.log("No alert");
//       } else {
//         console.log("Alert");
//       }
//     }
//     else {
//       console.log("Could not make a determination");
//     }
//   }
// };