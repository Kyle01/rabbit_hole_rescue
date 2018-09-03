// Signup button opens Web application's signup page in new tab

let loggedIn = window.localStorage.getItem("loggedIn"); 
let recording = window.localStorage.getItem("recording");

console.log(loggedIn);
console.log(recording);

let navlogo = document.getElementById("nav-logo");
let signup = document.getElementById("signup");
let login = document.getElementById('login');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let visualization = document.getElementById("visualization");
let logout = document.getElementById('logout');

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

if ( loggedIn === "true" && recording === "false" ) {
    if (start.classList.contains('disabled')){
        start.classList.remove('disabled');
    }
    if (visualization.classList.contains('disabled')) {
        visualization.classList.remove('disabled');
    }
    if (logout.classList.contains('disabled')) {
        logout.classList.remove('disabled');
    }
}

if ( loggedIn === "true" && recording === "true") {
    if (stop.classList.contains('disabled')) {
        stop.classList.remove('disabled');
    }
    if (logout.classList.contains('disabled')) {
        logout.classList.remove('disabled');
    }
}


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
            if (start.classList.contains('disabled')) {
                start.classList.remove('disabled');
            }
            if (visualization.classList.contains('disabled')) {
                visualization.classList.remove('disabled');
            }
            if (logout.classList.contains('disabled')) {
                logout.classList.remove('disabled');
            }
            loggedIn = "true";
            window.localStorage.setItem("loggedIn", "true");
        }
    });
});

// Start button sends message to background.js to start recording session 

document.addEventListener('DOMContentLoaded', function () {

    start.addEventListener('click', function() {
        if (loggedIn === "true" && recording === "false") {
            chrome.runtime.sendMessage({sender: "start"});
            if (stop.classList.contains('disabled')) {
                stop.classList.remove('disabled');
            }
            if ( !start.classList.contains('disabled')) {
                start.classList.add('disabled');
            }
            recording = "true";
            window.localStorage.setItem("recording", "true");
        }
    });
});

// Stop button reloads extension, stopping recording and clearing username 

document.addEventListener('DOMContentLoaded', function () {
    stop.addEventListener('click', function () {
      if (loggedIn && recording) {
        recording = false;
        loggedIn = false;
        window.localStorage.setItem("recording", "false");
        // window.localStorage.setItem("loggedIn", "false");
        chrome.runtime.sendMessage({sender: "stop"});
      }
    });
});

// Visualization button opens visualization page in new tab 

document.addEventListener("DOMContentLoaded", function() {
  visualization.addEventListener("click", function() {
    if (loggedIn === "true") {
        window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  logout.addEventListener("click", function() {
      if (loggedIn === "true") {
          window.localStorage.setItem("loggedIn", "false");
          if (recording === "true") {
            window.localStorage.setItem("recording", "false");
          }
          chrome.runtime.sendMessage({sender: "stop"});
      }
  })
})


