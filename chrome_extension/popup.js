
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
    let login = document.getElementById('login');
    let xhr = new XMLHttpRequest();
    login.addEventListener('click', function () {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        xhr.open("POST", "http://localhost:5000/api/users/login/", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        let str = `username=${username}&password=${password}`;
        console.log(xhr["status"]);
        xhr.send(str);
        
        console.log(xhr);
        console.log(xhr.status);
        console.log(xhr.response);
        console.log(xhr.responseText);
        // window.open("rabbit-hole-rescue.herokuapp.com/signin", "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  let signup = document.getElementById("signup");
  let xhr = new XMLHttpRequest();

  signup.addEventListener("click", function() {
    //   let username = document.getElementById("username").value;
    //   let password = document.getElementById("password").value;
    //   xhr.open("POST", "http://localhost:5000/api/users/register/", true);
    //   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //   str = `username=${username}&password=${password}`;
    //   xhr.send(str);
    //   console.log(xhr);
    //   console.log(xhr.status);

    window.open("rabbit-hole-rescue.herokuapp.com/signup", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  let visualization = document.getElementById("visualization");
  visualization.addEventListener("click", function() {
    window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
  });
});



