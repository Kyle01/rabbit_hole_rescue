// export const treeOrganizer = function(historyObj){
//     let result = {};
//     let myReg = new RegExp('([0-9]{4})([0-9]{2})([0-9]{2})');
//     let dateArray = myReg.exec(Object.keys(sampleData)[0]).slice(1,4);
//     let date = new Date(dateArray);
//     let dateNode = {"webname": date.toDateString(), "url": "", "description": "Browse Windows Sessions", "children": [] };
    
//     let windows = Object.values(sampleData)[0]["windows"];
//     let visits = Object.values(sampleData)[0]["visits"];
//     Object.keys(windows).forEach(windowId => {
//         let windowNode = {};
//         windowNode["webname"] = `Window${windowId}`;
//         windowNode["url"] = "";
//         windowNode["description"] = `Window${windowId}'s visits below:`;
//         windowNode["children"] = [];
//         dateNode.children.push(windowNode);
//         console.log(dateNode);
//     });


// }

getVisits = function(childrenArray, visits){
    if (childrenArray.length === 0){
        return [];
    }
    childrenArray.forEach(visitId => {
        
    });
}

let sampleState = {
    "windows":{
        1: {
            title: "Window1",
            url: "",
            visits: [1,2,3]
        },
        2: {
            title: "Window2",
            url: "",
            visits: [4]
        }
    },
    "visits": {
        1: {
            title: "Google Search | Why do I do?",
            url: "www.google.com",
            children: [5]
        },
        2: {
            title: "Google Search | How to eat?",
            url: "https://www.google.com/search?q=how+do+i+eat&oq=how+do+i+eat",
            children: []
        },
        3: {
            title: "Google Search | Me too",
            url: "https://www.google.com/search?q=me+too",
            children: []
        },
        4: {
            title: "StackOverflow | BFS in JS",
            url: "https://stackoverflow.com/questions/50986414/bfs-in-javascript-using-recursion",
            children: []
        },
        5: {
            title: "WikiHow | How to Eat Properly",
            url: "https://www.wikihow.com/Eat-Properly",
            children: []
        }
    },
    "date": {
        "18/06/2018":[1,2]
    }

}

export const createTree = function({windows, visits, date}, dateId){
    let windowIds = date[dateId];
    let tree = {};
    tree["webname"] = dateId;
    tree["url"] = "";
    tree["description"] = "Browse Windows Sessions";
    tree["children"] = [];
    windowIds.forEach( winId => {
        tree["children"].push(windows[winId]);
    });
    return tree;
};