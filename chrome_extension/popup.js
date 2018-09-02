// Signup button opens Web application's signup page in new tab

let loggedIn = false; 
let recording = false;

let navlogo = document.getElementById("nav-logo");
let signup = document.getElementById("signup");
let login = document.getElementById('login');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let visualization = document.getElementById("visualization");

document.addEventListener("DOMContentLoaded", function() {
    navlogo.addEventListener("click", function() {
        window.open("rabbit-hole-rescue.herokuapp.com");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  let xhr = new XMLHttpRequest();

  signup.addEventListener("click", function() {
    window.open("rabbit-hole-rescue.herokuapp.com/signup", "_blank");
  });
});

// Login button sends username to background.js on success 

document.addEventListener('DOMContentLoaded', function () {
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
            start.classList.remove('disabled');
            visualization.classList.remove('disabled');
            loggedIn = true;
        }
    });
});

// Start button sends message to background.js to start recording session 

document.addEventListener('DOMContentLoaded', function () {

    start.addEventListener('click', function() {
        if (loggedIn && !recording) {
            chrome.runtime.sendMessage({sender: "start", username: name});
            stop.classList.remove('disabled');
            start.classList.add('disabled');
            recording = true;
        }
    });
});

// Stop button reloads extension, stopping recording and clearing username 

document.addEventListener('DOMContentLoaded', function () {
    stop.addEventListener('click', function () {
      if (loggedIn && recording) {
        chrome.runtime.sendMessage({sender: "stop"});
      }
    });
});

// Visualization button opens visualization page in new tab 

document.addEventListener("DOMContentLoaded", function() {
  visualization.addEventListener("click", function() {
    if (loggedIn) {
        window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
    }
  });
});



