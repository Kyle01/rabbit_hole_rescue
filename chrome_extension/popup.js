
document.addEventListener('DOMContentLoaded', function () {
    let start = document.getElementById('start');
    start.addEventListener('click', function() {
        chrome.runtime.sendMessage({sender: "start"});
    });
});


document.addEventListener('DOMContentLoaded', function () {
    let stop = document.getElementById('stop');
    stop.addEventListener('click', function () {
        chrome.runtime.sendMessage({sender: "stop"});
    });
});
