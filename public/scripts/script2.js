//validate login form

const logInForm = document.getElementById("login-form");

let email2Error = document.getElementById("email2Error");
let password2Error = document.getElementById("password2Error");

email2Error.innerHTML = "";
password2Error.innerHTML = "";
email2Error.style.color = "red";
password2Error.style.color = "red";

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const email2 = document.getElementById("email2").value;
  if (email2 === null || email2 === "") {
    email2Error.innerHTML = "Error! Please input email";
    valid = false;
  }

  const password2 = document.getElementById("password2").value;
  if (password2 === null || password2 === "") {
    password2Error.innerHTML = "Error! Please input password";
    valid = false;
  } else if (password2.length < 6) {
    password2Error.innerHTML =
      "Error! Password cannot be less than 6 characters";
    valid = false;
  }

  if (valid === false) {
    return valid;
  }

  window.location.href = "official.html";
});
