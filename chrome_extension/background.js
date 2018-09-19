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
    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `http://localhost:5000/api/windows/${username}/${windowId}`, true);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          // console.log(response);
          resolve(response);
        } else {
          // console.log(xhr.status);
          reject({
            status: xhr.status
          });
        }
      };

      xhr.onerror = function() {
        reject({
          status: xhr.status
        })
      }
      xhr.send();
    });  
  }

  const getVisit = tab => {
    // console.log(visit);
    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", `http://localhost:5000/api/visits/${username}/${tab.windowId}/${tab.id}/${tab.url}`, true)
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          // console.log(response);
          resolve(response);
        } else {
          // console.log(xhr.status);
          reject({
            status: xhr.status
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: xhr.status
        })
      }
      xhr.send();
    });
  }

  const setChildren = visit => {
    return new Promise (function(resolve, reject) {
      let par = visit.parent;
      let str = `id=${par}&children=${visit._id}`;
      if (par) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", `http://localhost:5000/api/visits/update`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            let response = JSON.parse(xhr.response);
            resolve(response);
          } else {
            // console.log(xhr.status);
            reject({
              status: xhr.status
            });
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
    let str = `id=${windowId}&visits=${[]}&username=${username}`;
    return new Promise (function(resolve, reject) {
      console.log(str);
      let xhr = new XMLHttpRequest();
      xhr.open("POST", `http://localhost:5000/api/windows/`, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          // console.log(xhr.responseText);
          resolve(response);
        } else {
          // console.log(xhr.status);
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
    console.log(visit);
    let str = `id=${visit.chromeWindowId}&visits=${visit._id}`;
    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", `http://localhost:5000/api/windows/${username}/update`, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          // console.log(xhr.responseText);
          resolve(response);
        } else {
          // console.log(xhr.status);
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

  // const historyNode = visit => {
  //   // get request here
  //   getVisit(visit)
  //   // let res = getVisit(visit);
  //   // // console.log(res);
  //   // return res;
  // };

  const createNode = tab => {
    let newNode = {
      url: tab.url,
      title: tab.title,
      chromeTabId: tab.id,
      chromeWindowId: tab.windowId,
      parent: currNode._id,
      children: [],
      username: username
    };
    // console.log(currNode);
    // newNode.parent = currNode._id;
    // if (currNode.chromeTabId === newNode.chromeTabId) {
    //   console.log("Setting parent");
      
    // } else {
    //   newNode.parent = null;
    // }
    return newNode;
  };

  const createVisit = visit => {
    
    if (visit.parent) {setChildren(visit)};
    let parent = (visit.parent ? visit.parent : -1);
    let str = `title=${visit.title}&url=${
      visit.url
      }` + `&chromeTabId=${visit.chromeTabId}&chromeWindowId=${
      visit.chromeWindowId
      }&parent=${parent}&children=${
      visit.children
      }&username=${username}`;

    return new Promise (function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/visits/", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          if (response.success) {
            resolve(response.visit)
            // addVisits(response.visit);
          } else {
            // console.log(xhr.status);
            reject({
              status: xhr.status
            });

          // currNode = response.visit;
          }
        };

        xhr.onerror = function () {
          reject({
            status: xhr.status
          })
        };

        xhr.send(str);
      }
    });
  };

  const setCurrNode = () => {
    // GET request
    chrome.tabs.query(
      { active: true, windowId: currNode.chromeWindowId },
      function(tab) {
        let currTab = tab[0];
        // console.log(currTab);
        // console.log(getVisit(currTab).then(visit => (currNode = visit)));
        return getVisit(currTab).then(visit => currNode = visit || currNode).catch(err => console.log(err));
        // console.log(node); just track, backend handle rest?
      }
    );
  };

  const activatedListener = () => {
    console.log("Current Node is...");
    setCurrNode();
    console.log(currNode);
  };

  const updatedListener = (visitId, changeInfo, visit) => {
    getWindow(visit.windowId).catch(err => {createWindow(visit.windowId)})
    // // console.log(res);
    // if (!res) {
    //   createWindow(visit.windowId);
    // }

    if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
      // let histNode = historyNode(visit);
      let newNode = createNode(visit);
      getVisit(visit)
        .then(visit => {
          if(visit) {
            currNode = visit;
          } else {
            createVisit(newNode)
            .then(visit => {
              console.log(visit);
              addVisits(visit)
            })
            .then(() => setCurrNode())
          }
        })
        .catch(err => (console.log(err))
            // createVisit(newNode).then(visit => {
            //   addVisits(visit).then(res => {
            //     setCurrNode()})})}
        )
        // .then(() => createVisit(newNode))
        // .then(visit => (addVisits(visit)))
        // .then(() => setCurrNode())
        // if (visit) {
        //   currNode = visit;
        // } else {
        // }
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
          createVisit(newNode).then(visit => addVisits(visit));
          sleep(250);
        });
      });
      // setCurrNode();

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

// payload.windows[currTab.windowId].visits.forEach(visit => {
        //   let visitObj = payload.visits[visit];
        //   if (
        //     visitObj.url === currTab.url &&
        //     visitObj.chromeTabId === currTab.id
        //   ) {
        //     currNode = visitObj;
        //   }
        // });