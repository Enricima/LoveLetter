import { socketId, connectIO } from "./socket.js";
const socket = connectIO().socket;
console.log(socket);
console.log(localStorage.getItem("socket_id"));
socket.on("notif", (msg) => {
  alert(msg);
});

function showCreateGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("createGame").style.display = "block";
}

function showJoinGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("joinGame").style.display = "block";
}

function showMenu() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("createGame").style.display = "none";
  document.getElementById("joinGame").style.display = "none";
  document.getElementById("rules").style.display = "none";
}

function showRules() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("rules").style.display = "block";
}

function createGame() {
  const name = document.getElementById("createNameInput").value;
  const numPlayers = document.getElementById("numPlayers").value;
  const pin = document.getElementById("gamePin").value;

  console.log("Nom du joueur:", name);
  console.log("Nombre de joueurs:", numPlayers);
  console.log("Code PIN de la partie:", pin);

  // Stockage des données dans localStorage pour les utiliser plus tard dans tableau.html
  localStorage.setItem("numPlayers", numPlayers);
  localStorage.setItem("playerName", name);

  // Émission de l'événement createGame au serveur via socket
  socket.emit("createGame", {
    sessionId: localStorage.getItem("socket_id"),
    name,
    numPlayers,
    pin,
  });
}

socket.on("error", (data) => {
  alert(data.message);
});

socket.on("gameCreated", (data) => {
  alert("La partie va se lancer quand tous les joueurs auront rejoint.");
});

socket.on("playerJoined", (data) => {
  if (data.allPlayersJoined) {

    window.location = "tableau.html";
  }
});

function joinGame() {
  const pin = document.getElementById("joinPin").value;
  const name = document.getElementById("joinNameInput").value;

  // Stockage des données dans localStorage pour les utiliser dans tableau.html
  localStorage.setItem("pin", pin);
  localStorage.setItem("playerName", name);

  // Émission de l'évenement JoinGame au serveur via socket
  socket.emit("joinGame", {
    sessionId: localStorage.getItem("socket_id"),
    pin,
    name,
  });
  // window.location = "tableau.html";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#create").addEventListener("click", showCreateGame);
  document
    .querySelector("#buttonCreateGame")
    .addEventListener("click", createGame);
  document.querySelector("#showMenu").addEventListener("click", showMenu);
  document.querySelector("#showMenu2").addEventListener("click", showMenu);
  document.querySelector("#showMenu3").addEventListener("click", showMenu);
  document
    .querySelector("#showJoinGame")
    .addEventListener("click", showJoinGame);
  document.querySelector("#showRules").addEventListener("click", showRules);
  document.querySelector("#joinGame2").addEventListener("click", joinGame);
});

