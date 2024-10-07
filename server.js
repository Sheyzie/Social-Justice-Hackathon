//setup https on terminal with
/*
npm install mkcert -g
mkcert create-ca
mkcert create-cert
*/

//declare dependencies

const fs = require("fs");
const express = require("express");
const app = express();
const https = require("https");
const dotenv = require("dotenv");
const socketio = require("socket.io");
const { join } = require("path");

dotenv.config();

// serve up html pages

app.use(express.static("public"));


const key = fs.readFileSync("cert.key");
const cert = fs.readFileSync("cert.crt");


// app.get('/:room', (req, res) => {
//   res.render('room', {roomId: req.params.room})
// })
//server listen

const expressServer = app.listen(process.env.PORT, () => {
  console.log("Server is listening on port:", process.env.PORT);
});

const offers = [
  // username:
  // offer:
  // offerIcecandidates:
  // answer: null,
  // answerIceCandidates:
];

const connectedSockets = [
  //username socket id
];
//setting up the socket.io server

const io = socketio(expressServer, {});

//Setting up event listener to listen to socket connection

io.on("connect", (socket) => {
  console.log(socket.id, "has joined the server");

  connectedSockets.push({
    socketId: socket.id,
  });

  socket.on("topicToServer", (newTopic) => {
    io.emit("topicToSockets", newTopic);
  });
  socket.on("sectorToServer", (newSector) => {
    io.emit("sectorToSockets", newSector);
  });
  socket.on("issueToServer", (newIssue) => {
    io.emit("issueToSockets", newIssue);
  });
  socket.on("messageToServerOfficial", (newMessage) => {
    newMessage = `Host: ${newMessage}`;
    io.emit("messageToSocketsCitizen", newMessage);
  });

  socket.on("messageToServerCitizen", (newMessage) => {
    newMessage = `Guest: ${newMessage}`;
    io.emit("messageToSocketsCitizen", newMessage);
  });

  socket.on("callRequest", (callRequest) => {
    io.emit("callRequest", callRequest);
  });

  socket.on("offer", (offer) => {
    offers.push({
      username: "Guest",
      offer: offer,
      offerIcecandidates: [],
      answer: null,
      answerIceCandidates: [],
    });
    socket.broadcast.emit("newOfferAwaiting", offers.slice);
  });

  socket.on("newAnswer", (offerObj, ackFunction) => {
    console.log(offerObj);

    const socketToAnswer = connectedSockets.find(
      (s) => s.username === offerObj.offererUsername
    );
    if (!socketToAnswer) {
      console.log("No matching socket");
      return;
    }
    const socketIdToAnswer = socketToAnswer.socketId;
    const offerToUpdate = offers.find(
      (o) => o.offererUsername === offerObj.offererUserName
    );
    if (!offerToUpdate) {
      console.log("No offerToUpdate");
      return;
    }

    ackFunction(offerToUpdate.offerIcecandidates);
    offerToUpdate.answer = offerObj.answer;
    offerToUpdate.answererUsername = username;
    socket.to(socketIdToAnswer).emit("answerResponse", offerToUpdate);
  });

  socket.on("guestStream", (stream) => {
    io.emit("guestStream", stream);
  });
});
