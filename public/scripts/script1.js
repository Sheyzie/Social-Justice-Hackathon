//validate userform

const userForm = document.getElementById("user-form");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
nameError.style.color = "red";
emailError.style.color = "red";

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const username = document.getElementById("username").value;
  if (username === null || username === "") {
    nameError.innerHTML = "Error! Please input username";
    valid = false;
  }

  const email = document.getElementById("email").value;
  if (email === null || email === "") {
    emailError.innerHTML = "Error! Please input email";
    valid = false;
  }

  if (valid === false) {
    return valid;
  }

  window.location.href = "index2.html";
});

// userForm.onsubmit()

//validate issue form

const issueForm = document.getElementById("raise-issue-form");

let topicError = document.getElementById("topicError");
let sectorError = document.getElementById("sectorError");
let issuesError = document.getElementById("issuesError");

topicError.style.color = "red";
sectorError.style.color = "red";
issuesError.style.color = "red";

issueForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  const topic = document.getElementById("topic").value;
  if (topic === null || topic === "") {
    topicError.innerHTML = "Error! Please input topic";
    valid = false;
  }

  const sector = document.getElementById("sector").value;
  if (sector === null || sector === "") {
    sectorError.innerHTML = "Error! Please input sector";
    valid = false;
  }

  const issue = document.getElementById("issue").value;
  if (issue === null || issue === "") {
    issuesError.innerHTML = "Error! Please input issue";
    valid = false;
  }

  if (valid === false) {
    return valid;
  }

  topicError.innerHTML = "";
  sectorError.innerHTML = "";
  issuesError.innerHTML = "";

  //grab newMessage from html
  const newTopic = document.getElementById("topic").value;
  const newSector = document.getElementById("sector").value;
  const newIssue = document.getElementById("issue").value;

  // empty the html message
  document.getElementById("topic").value = "";
  document.getElementById("sector").value = "";
  document.getElementById("issue").value = "";

  socket.emit("topicToServer", newTopic);
  socket.emit("sectorToServer", newSector);
  socket.emit("issueToServer", newIssue);
});

// issueForm.onsubmit()

// connect to socket.io server at the url

const socket = io("http://localhost:3300");

socket.on("welcome", (data) => {
  console.log(data);
});

//listen to server on incoming emit()

socket.on("topicToSockets", (newTopic) => {
  document.getElementById(
    "messages"
  ).innerHTML += `<li>Topic: ${newTopic}</li>`;
});
socket.on("sectorToSockets", (newSector) => {
  document.getElementById(
    "messages"
  ).innerHTML += `<li>Sector: ${newSector}</li>`;
});
socket.on("issueToSockets", (newIssue) => {
  document.getElementById(
    "messages"
  ).innerHTML += `<li>Issue: ${newIssue}</li><br>`;
});
