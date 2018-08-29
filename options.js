let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
    for (let item of kButtonColors) {
        let button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function () {
            chrome.storage.sync.set({ color: item }, function () {
                console.log('color is ' + item);
            })
        });
        page.appendChild(button);
    }
}
constructOptions(kButtonColors);

// chrome.history.search(null, function(results) {
//     console.log(results);
// });

// chrome.tabs.getCurrent(function(tab) {console.log(tab);});

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
    var tabLink = tabs[0].url;
    console.log(tabs[0]);
});