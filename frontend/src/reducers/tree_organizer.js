export const treeOrganizer = function(historyObj){
    let result = {};
    let myReg = new RegExp('([0-9]{4})([0-9]{2})([0-9]{2})');
    let dateArray = myReg.exec(Object.keys(sampleData)[0]).slice(1,4);
    let date = new Date(dateArray);
    let dateNode = {"webname": date.toDateString(), "url": "", "description": "Browse Windows Sessions", "children": [] };
    
    let windows = Object.values(sampleData)[0]["windows"];
    let visits = Object.values(sampleData)[0]["visits"];
    Object.keys(windows).forEach(windowId => {
        let windowNode = {};
        windowNode["webname"] = `Window${windowId}`;
        windowNode["url"] = "";
        windowNode["description"] = `Window${windowId}'s visits below:`;
        windowNode["children"] = [];
        dateNode.children.push(windowNode);
        console.log(dateNode);
    });


}