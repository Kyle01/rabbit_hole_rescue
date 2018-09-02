
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
    login.addEventListener('click', function () {
        let username = document.getElementById("username").innerHTML;
        let password = document.getElementById("password").innerHTML;
        console.log('username');
        console.log('password');
        // window.open("rabbit-hole-rescue.herokuapp.com/signin", "_blank");
    });
});

document.addEventListener("DOMContentLoaded", function() {
  let signup = document.getElementById("signup");

  signup.addEventListener("click", function() {
      let username = document.getElementById("username").innerHTML;
      let password = document.getElementById("password").innerHTML;
      console.log('running signup');
      console.log('username');
      console.log('password');
//   window.open("rabbit-hole-rescue.herokuapp.com/signup", "_blank");
  });
});

document.addEventListener("DOMContentLoaded", function() {
  let visualization = document.getElementById("visualization");
  visualization.addEventListener("click", function() {
    window.open("rabbit-hole-rescue.herokuapp.com/history", "_blank");
  });
});



