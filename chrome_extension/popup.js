
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

document.addEventListener('DOMContentLoaded', function () {
    let stop = document.getElementById('login');
    stop.addEventListener('click', function () {
        window.open("rabbit-hole-rescue.herokuapp.com/signin", "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  let stop = document.getElementById("signup");
  stop.addEventListener("click", function() {
      window.open("rabbit-hole-rescue.herokuapp.com/signup", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  let stop = document.getElementById("visualization");
  stop.addEventListener("click", function() {
      window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
  });
});
