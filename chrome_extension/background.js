"use strict";
// import axios
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [new chrome.declarativeContent.PageStateMatcher({})],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});

let username;
// let currNode = { "_id": null };
// console.log(`${currNode} global`)

chrome.runtime.onMessage.addListener(function(message) {
  console.log(message)
  let currNode = { _id: null };

  if (message.sender === "login") {
    username = message.username;
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
    let str = `id=${windowId}&username=${username}`;
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
      // parent: currNode._id,
      children: [],
      username: username
    };
    // console.log(currNode);
    // console.log(currNode);
    // newNode.parent = currNode._id;
    if (currNode && currNode.chromeTabId === newNode.chromeTabId) {
      console.log("Setting parent");
      newNode.parent = currNode._id;
    } else {
      newNode.parent = null;
    }
    return newNode;
  };

  const createVisit = visit => {
    
    // if (visit.parent) {setChildren(visit)};
    let parent = (visit.parent ? visit.parent : -1);
    // let url = toASCII(visit.url);
    // let title = toASCII(visit.title);
    let str = `title=${visit.title}&url=${
      visit.url
      }&chromeTabId=${visit.chromeTabId}&chromeWindowId=${
      visit.chromeWindowId
      }&children=${visit.children}&parent=${parent}&username=${username}`;
    // console.log(str);
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      // console.log(str);
      xhr.open("POST", "http://localhost:5000/api/visits/", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response = JSON.parse(xhr.response);
          console.log(response);
          if (response.success) {
            // console.log(response);
            resolve(response);
            // addVisits(response.visit);
          } else {
            console.log("reject1");
            reject({ status: xhr.status });

            // currNode = response.visit;
          }
        }

        xhr.onerror = function() {
          console.log("reject2");
          reject({ status: xhr.status });
        };

        xhr.send(str);
      };
    });
  };

  // const setCurrNode = () => {
  //   // GET request
  //   chrome.tabs.query(
  //     { active: true, windowId: currNode.chromeWindowId },
  //     function(tab) {
  //       let currTab = tab[0];
  //       // console.log(currTab);
  //       // console.log(getVisit(currTab).then(visit => (currNode = visit)));
  //       return getVisit(currTab).then(visit => currNode = visit || currNode).catch(err => console.log(err));
  //       // console.log(node); just track, backend handle rest?
  //     }
  //   );
  // };

  const activatedListener = () => {
    // console.log("Current Node is...");
    // setCurrNode();
    // console.log(currNode);
  };

  const updatedListener = (visitId, changeInfo, visit) => {
    // getWindow(visit.windowId).catch(err => {createWindow(visit.windowId)})
    // // console.log(res);
    // if (!res) {
    //   createWindow(visit.windowId);
    // }

    if (changeInfo.url !== undefined && changeInfo.url !== "chrome://newtab/") {
      // let histNode = historyNode(visit);
      let newNode = createNode(visit);
      createWindow(visit.windowId).then(window => {
          console.log("Window Created");
          return createVisit(newNode);
        })
        .then(res => {
          console.log("Visit Created");
          currNode = res.visit;
          return res;
        })
        .then(res => {
          console.log("CurrNode set to:");
          if (res.success) {
            addVisits(res.visit);
          }
          console.log(currNode);
          return res;
        }).then(res => {
          console.log("added to window visits");
          return setChildren(res.visit);
        }).then(() => {
          console.log('set to parent');
        })
        .catch(err => console.log(err));
          // getVisit(visit)
          //   .then(visit => {
          //     if(visit) {
          //       currNode = visit;
          //     } else {
          //       createVisit(newNode)
          //       .then(visit => {
          //         console.log(visit);
          //         addVisits(visit)
          //       })
          //       .then(() => setCurrNode())
          //     }
          //   })

          // createVisit(newNode).then(visit => {
          //   addVisits(visit).then(res => {
          //     setCurrNode()})})}
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
      for(let i = 0; i < windows.length; i++){
        let window = windows[i];
        createWindow(window.id).then(res => res);
        let tabs = window.tabs;
        for (let j = 0; j < tabs.length; j++) {
          let visit = tabs[j];
          console.log("You got to tabs");
          let newNode = createNode(visit);
          let res = createVisit(newNode);
          // console.log(res);
          res.then(result => {
            console.log("Here is result:");
            console.log(result);
            if (result.success) {
              addVisits(result.visit);
            }
            currNode = result.visit;
            return currNode;
          });
          sleep(250);
        };
      };
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

// const toASCII = str => {
//   let result = [];
//   for (let i = 0; i < str.length; i++) {
//     let asc = str.charCodeAt(i);
//     result.push(asc)
//   }
//   return result.join("-");
// };

// const getWindow = windowId => {
//   return new Promise(function (resolve, reject) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", `http://localhost:5000/api/windows/${username}/${windowId}`, true);
//     xhr.onload = function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         let response = JSON.parse(xhr.response);
//         // console.log(response);
//         resolve(response);
//       } else {
//         // console.log(xhr.status);
//         reject({
//           status: xhr.status
//         });
//       }
//     };

//     xhr.onerror = function () {
//       reject({
//         status: xhr.status
//       })
//     }
//     xhr.send();
//   });
// }

// const getVisit = tab => {
//   console.log(tab);
//   return new Promise(function (resolve, reject) {
//     let xhr = new XMLHttpRequest();
//     let url = toASCII(tab.url);
//     xhr.open("GET", `http://localhost:5000/api/visits/${username}/${tab.windowId}/${tab.id}/${url}`, true)
//     xhr.onload = function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         let response = JSON.parse(xhr.response);
//         // console.log(response);
//         resolve(response);
//       } else {
//         // console.log(xhr.status);
//         reject({
//           status: xhr.status
//         });
//       }
//     };

//     xhr.onerror = function () {
//       reject({
//         status: xhr.status
//       })
//     }
//     xhr.send();
//   });
// }