var signup = document.querySelector(".signup"); 
var signin = document.querySelector(".sign-in");
var btnSignup = document.querySelector("#btnSignup");
var nameSignup = document.querySelector("#username");
var emailSignup = document.querySelector("#email");
var passSignup = document.querySelector("#pass");
var inputsSignup = document.querySelectorAll(".signup-form input");
var errorMsgEmail = document.querySelector(".email-error");

var formLogin = document.querySelector(".login");
var spanSignup = document.querySelector(".sign-up");
var btnLogin = document.querySelector("#btnLogin");
var emailLogin = document.querySelector("#loginEmail");
var passLogin = document.querySelector("#loginPass");

var pageHome = document.querySelector(".home");
var btnSignOut = document.querySelector("#btnOut");
var userNamePlace = document.querySelector("#spanName");

if (localStorage.getItem("signedUsers") != null) {
  liste = JSON.parse(localStorage.getItem("signedUsers"));
} else {
  var liste = [];
}

spanSignup.addEventListener("click", function () {
  formLogin.classList.replace("d-block", "d-none");
  signup.classList.replace("d-none", "d-block");
});
signin.addEventListener("click", function () {
  formLogin.classList.replace("d-none", "d-block");
  signup.classList.replace("d-block", "d-none");
  if(btnSignup.previousElementSibling.classList.contains("d-block")){
    btnSignup.previousElementSibling.classList.replace("d-block", "d-none")
  }
});

function Sigup() {
  var user = {
    username: nameSignup.value,
    email: emailSignup.value.toLowerCase(),
    password: passSignup.value,
  };

  liste.push(user);
  update();
  console.log(liste);
}

function update() {
  localStorage.setItem("signedUsers", JSON.stringify(liste));
}

function clear() {
  emailLogin.value = "";
  passLogin.value = "";
  emailSignup.value = "";
  nameSignup.value = "";
  passSignup.value = "";
}

for (var i = 0; i < inputsSignup.length; i++) {
  inputsSignup[i].addEventListener("blur", function () {
    validation(this);
  });
}

function validation(input) {
  var regex = {
    username: /^[A-Z][a-z]{3,8}$/gi,
    email: /^[A-Za-z0 -9-_]{3,}@(gmail|outlook|yahoo|msn|hotmail)\.(com|org)$/gi,
    pass: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()-+=])(?=\S+$).{8,20}$/,
  };

  if (input.id == "email") {
    if (liste.length > 0) {
      for (var i = 0; i < liste.length; i++) {
        if (input.value == liste[i].email) {
          input.nextElementSibling.innerHTML =
            '<i class="fa-solid fa-circle-exclamation"></i> This Email already exists';
          input.nextElementSibling.classList.replace("d-none", "d-block");
          return false;
        }
      }
    }
    if (regex[input.id].test(input.value)) {
      input.nextElementSibling.classList.replace("d-block", "d-none");
      return true;
    } else {
      input.nextElementSibling.innerHTML =
        '<i class="fa-solid fa-circle-exclamation"></i> Invalid Email (ex: name@gmail.com)';
      input.nextElementSibling.classList.replace("d-none", "d-block");
    }
  } else {
    if (regex[input.id].test(input.value)) {
      if (input.nextElementSibling.classList.contains("d-block")) {
        input.nextElementSibling.classList.replace("d-block", "d-none");
      }
      return true;
    } else {
      input.nextElementSibling.classList.replace("d-none", "d-block");
      return false;
    }
  }
}

btnSignup.addEventListener("click", function () {
  if (
    validation(nameSignup) &&
    validation(emailSignup) &&
    validation(passSignup)
  ) {
    Sigup();
    clear();
    btnSignup.previousElementSibling.classList.replace("d-none", "d-block");
  }
});

function login() {
  if (emailLogin.value == "" || passLogin.value == "") {
    emailLogin.nextElementSibling.classList.replace("d-none", "d-block");
    passLogin.nextElementSibling.classList.replace("d-none", "d-block");
  }

  for (var i = 0; i < liste.length; i++) {
    if (emailLogin.value.toLowerCase() == liste[i].email) {
        emailLogin.nextElementSibling.classList.replace("d-block", "d-none");
        var index = i;
        break;
    }
  }
  if(index >= 0){
    if (passLogin.value == liste[index].password) {
     pageHome.classList.replace("d-none", "d-block");
      formLogin.classList.replace("d-block", "d-none");
      userNamePlace.innerHTML = liste[index].username;
      passLogin.nextElementSibling.classList.replace("d-block", "d-none");
      clear();
    } else {
      passLogin.nextElementSibling.classList.replace("d-none", "d-block");
    }
  }
}

btnLogin.addEventListener("click", function () {
  login();
});

btnSignOut.addEventListener("click", function () {
 pageHome.classList.replace("d-block", "d-none");
  formLogin.classList.replace("d-none", "d-block");
});