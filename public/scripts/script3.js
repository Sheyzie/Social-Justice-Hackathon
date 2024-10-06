// Validating SignUp Form

let chkOracle = 'admin1'

const signUpForm = document.getElementById("signup-form");

let name3Error = document.getElementById("name3Error");
let email3Error = document.getElementById("email3Error");
let oracleError = document.getElementById("oracleError");
let password3Error = document.getElementById("password3Error");
let conPassword3Error = document.getElementById(
  "conPassword3Error"
);

name3Error.innerHTML = ''
email3Error.innerHTML = ''
oracleError.innerHTML = ''
password3Error.innerHTML = ''
password3Error.innerHTML = ''

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let valid = true;

  const fullName = document.getElementById("name").value;
  if (fullName === null || fullName === '') {
    name3Error.innerHTML = 'Error please input full name'
    valid = false
  }

  const email = document.getElementById("email").value;
  if (email === null || email === '') {
    email3Error.innerHTML = 'Error please input email'
    valid = false
  }

  const oracleId = document.getElementById("oracle-id").value;
  if (oracleId === null || oracleId === '') {
    oracleError.innerHTML = 'Error please input oracle Id'
    valid = false
  }else if (oracleId != chkOracle) {
    oracleError.innerHTML = 'Error incorrect oracle Id'
    valid = false
  }

  const password = document.getElementById("password").value;
  if (password === null || password === '') {
    password3Error.innerHTML = 'Error please input password'
    valid = false
  }else if (password.length < 6) {
    password3Error.innerHTML = 'Error password cannot be less than 6 characters'
    valid = false
  }

  const confirmPassword = document.getElementById("confirmPassword").value;
  if (confirmPassword != password) {
    conPassword3Error.innerHTML = 'Error password did not match'
    valid = false
  }

  return valid
})
