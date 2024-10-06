//connect to socket.io server

const socket = io("http://localhost:3300");

//listen on issues

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

// start discusion

function startDiscussion() {
  const topic = document.getElementById("topic").value;
  const topicError = document.getElementById("topicError");
  topicError.style.color = "red";
  topicError.innerHTML = "";

  if (topic === "" || topic === null) {
    return (topicError.innerHTML = "Please add a topic to discuss");
  }

  window.location.href = "oneonone.html";
}

