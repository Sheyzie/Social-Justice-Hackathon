//render video on the screen

let localStream;
let remoteStream;
let peerConnection;

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
  createOffer();
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
};

init();

/*
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
//mute myVideo since we don't want to hear ourselfs
myVideo.muted = true;

//connect myVideo to the pages requires object
//requires .then() which requires a callback function with stream parameter

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);
  });

//this function allows myVideo to use stream parameter

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play(); //play video once its loaded on page
  });
  videoGrid.append(video);
}
  */

//this function sends message on the live chat
function sendMessage() {
  const newMessage = document.getElementById("type-messages").value;
  document.getElementById("type-messages").value = "";

  socket.emit("messageToServerOfficial", newMessage);
}

function acceptCall() {
  document.getElementById("call-notification").style.display = "none";
}

function rejectCall() {
  document.getElementById("call-notification").style.display = "none";
}

function createOfferElements(offers) {
  const answerElements = document.querySelector("#answers");
  offers.forEach((o) => {
    const newOfferElement = document.createElement("div");
    newOfferElement.innerHTML = `<button class="answer-btn"> Answer </button>`;
    newOfferElement.addEventListener("click", () => answerOffer(o));
    answerElement.appendChild(newOfferEl);
  });
}

const answerOffer = async (offerObj) => {
  await fetchUserMedia();
  await createPeerConnection(offerObj);
  const answer = await peerConnection.createAnswer({});
  await peerConnection.setLocalDescription(answer);
  console.log(offerObj);
  console.log(answer);

  offerObj.answer = answer;

  const offerIcecandidates = await socket.emitWithAck("newAnswer", offerObj);
  offerIcecandidates.forEach((c) => {
    peerConnection.addIceCandidates(c);
    console.log("========Added Ice Candidates=========");
  });

  console.log(offerIcecandidates);
};

const call = async (e) => {
  await fetchUserMedia();
  await createPeerConnection();
};
const addAnswer = async (offerObj) => {
  await peerConnection.setRemoteDescription(offerObj.answer);
};

const socket = io("http://localhost:3300");

socket.on("messageToSocketsCitizen", (newMessage) => {
  document.getElementById(
    "messages"
  ).innerHTML += `<li> ${newMessage}</li><br>`;
});

socket.on("callRequest", (callRequest) => {
  document.getElementById(
    "call-request"
  ).innerHTML = ` call request from Guest: <span id="caller-id"> ${callRequest} </span>`;
  document.getElementById("call-notification").style.display = "flex";
});

socket.on("newOfferAwaiting", (offers) => {
  createOfferElements(offers);
});
socket.on("answerResponse", (offerObj) => {
  console.log(offerObj);
  addAnswer(offerObj);
});
