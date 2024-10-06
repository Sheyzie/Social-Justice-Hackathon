let localStream;
let remoteStream;
let peerConnection;

let uid = String(Math.floor(Math.random() * 10000));

//setting up stun server
//paste a copied google stun server

let server = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

let init = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  document.getElementById("user1").srcObject = localStream;
};

let createOffer = async () => {
  peerConnection = new RTCPeerConnection(server);

  remoteStream = new MediaStream();
  document.getElementById("user2").srcObject = remoteStream;

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack();
    });
  };

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      console.log("New ICE Candidate:", event.candidate);
      socket.emit("iceCandidate", event.candidate);
    }
  };

  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("offer:", offer);
  socket.emit("offer", offer);

  requestCall();
};

init();

/*
const videoGrid = document.getElementById("video-grid");
const videoGrid2 = document.getElementById("video-grid2");
const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);
    socket.on("hostStream", (stream) => {
      connectToHost(stream);
    });
  });

function requestCall() {
  const hostVideo = document.createElement("video");
  socket.on("hostStream", (stream) => {
    addVideoStream(video, stream);
  });
  socket.on("endCall", (endCall) => {
    video.remove();
  });
}


function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play(); //play video once its loaded on page
  });
  videoGrid.append(video);
}
*/

function sendMessage() {
  const newMessage = document.getElementById("type-messages").value;
  document.getElementById("type-messages").value = "";

  socket.emit("messageToServerCitizen", newMessage);
}

function requestCall() {
  callRequest = `${socket.id}`;
  socket.emit("callRequest", callRequest);
  document.getElementById("request-notification").style.display = "flex";
}

function closeNotification() {
  document.getElementById("request-notification").style.display = "none";
}

const socket = io("http://localhost:3300");

socket.on("messageToSocketsCitizen", (newMessage) => {
  document.getElementById(
    "messages"
  ).innerHTML += `<li> ${newMessage}</li><br>`;
});

socket.on("broadcast", (stream) => {
  addVideoStream(hostVideo, stream);
});
