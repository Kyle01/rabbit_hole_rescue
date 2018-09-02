// Signup button opens Web application's signup page in new tab

document.addEventListener("DOMContentLoaded", function() {
  let signup = document.getElementById("signup");
  let xhr = new XMLHttpRequest();

  signup.addEventListener("click", function() {
    window.open("rabbit-hole-rescue.herokuapp.com/signup", "_blank");
  });
});

// Login button sends username to background.js on success 

document.addEventListener('DOMContentLoaded', function () {
    let login = document.getElementById('login');
    let xhr = new XMLHttpRequest();
    login.addEventListener('click', function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        xhr.open("POST", "http://localhost:5000/api/users/login/", false);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        let str = `username=${username}&password=${password}`;
        
        xhr.send(str);
            
        if (xhr.status === 200) {
            chrome.runtime.sendMessage({sender: "login", username: username});
        }
    });
});

// Start button sends message to background.js to start recording session 

document.addEventListener('DOMContentLoaded', function () {
    let start = document.getElementById('start');
    start.addEventListener('click', function() {
        chrome.runtime.sendMessage({sender: "start"});
    });
});

// Stop button reloads extension, stopping recording and clearing username 

document.addEventListener('DOMContentLoaded', function () {
    let stop = document.getElementById('stop');
    stop.addEventListener('click', function () {
        chrome.runtime.sendMessage({sender: "stop"});
    });
});

// Visualization button opens visualization page in new tab 

document.addEventListener("DOMContentLoaded", function() {
  let visualization = document.getElementById("visualization");
  visualization.addEventListener("click", function() {
    window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
  });
});



