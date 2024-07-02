function showMenu() {
  document.getElementById("menu").style.display = "block";
  document.getElementById("createGame").style.display = "none";
  document.getElementById("joinGame").style.display = "none";
  document.getElementById("rules").style.display = "none";
  document.getElementById("game").style.display = "none";
}

function showCreateGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("createGame").style.display = "block";
}

function showJoinGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("joinGame").style.display = "block";
}

function showRules() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("rules").style.display = "block";
}

function createGame() {
  const name = document.getElementById("createNameInput").value;
  const numPlayers = document.getElementById("numPlayers").value;
  const pin = document.getElementById("gamePin").value;
  socket.emit("createGame", { name, numPlayers, pin });
}

function joinGame() {
  const name = document.getElementById("joinNameInput").value;
  const pin = document.getElementById("joinPin").value;
  socket.emit("joinGame", { name, pin });
}
