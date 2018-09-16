

export const createTree = function({windows, visits, date}, dateId){
    let windowIds = date[dateId];
    let tree = {};
    tree["webname"] = dateId;
    tree["url"] = "";
    tree["description"] = "Browse Windows Sessions";
    tree["children"] = [];
    if (typeof windowIds === "undefined"){
        return tree;
    }
    windowIds.forEach( winId => {
        let currWindow = windows[winId];
        currWindow["children"] = getVisits(currWindow["visits"], visits);
        tree["children"].push(currWindow);
    });
    return tree;
};

export const getVisits = function(visitIds, visit_state){
    if ( visitIds.length == 0 ) {
        return [];
    }
    let result = [];
    visitIds.forEach( vid => {
        let curr_visit = Object.assign({},visit_state[vid]);
        if (typeof curr_visit.children === 'undefined'){
            return [];
        }
        let children = curr_visit["children"].filter(onlyUnique);
        // curr_visit["description"] = curr_visit["title"];
        curr_visit["children"] = getVisits(children, visit_state);
        result.push(curr_visit);
    });
    return result;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
