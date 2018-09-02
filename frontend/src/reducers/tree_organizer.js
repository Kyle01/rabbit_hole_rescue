

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
        let currWindow = windows[winId];
        currWindow["children"] = getVisits(currWindow["visits"], visits);
        tree["children"].push(currWindow);
    });
    return tree;
};

const getVisits = function(visitIds, visit_state){
    if ( visitIds.length == 0 ) {
        return [];
    }
    let result = [];
    visitIds.forEach( vid => {
        let curr_visit = visit_state[vid];
        curr_visit["children"] = getVisits(curr_visit["children"], visit_state);
        result.push(curr_visit);
    });
    return result;
}