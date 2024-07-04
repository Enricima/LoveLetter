const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000/", methods: ["GET", "POST"] },
});

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {
  console.log("=== USERS ====", users);
  console.log("Nouvelle connexion établie", socket.id);
  console.log("Session ID envoyé : ", socket.handshake.query.sessionId);
  let sessionId = socket.handshake.query.sessionId;
  if (users[sessionId]) {
    //si le user existait = on met à jour avec son nouveau soket id
    users[sessionId].id = socket.id;
  } else {
    //sinon on le crée
    users[socket.id] = {
      id: socket.id,
      name: null,
      pin: null,
      socket: null,
      owner: false, // si != false ==> numPlayer
    };
  }
  socket.emit("getID", socket.id);
  console.log("====== user créé =======");

  // Écouter l'événement de création de partie
  socket.on("createGame", ({ sessionId, name, numPlayers, pin }) => {
    console.log(
      `Joueur ${name} veut créer une partie pour ${numPlayers} joueurs avec le code PIN ${pin}`
    );
    //mise à jour du user
    users[sessionId].name = name;
    users[sessionId].pin = pin;
    users[sessionId].socket = socket;
    users[sessionId].owner = numPlayers;

    // crée la room de la partie
    // Émettre un événement pour informer le client que la partie a été créée
    socket.join(pin);
    io.to(pin).emit("gameCreated", { gamePin: pin, numPlayers });

    console.log("================ ROOM CREEE ==============", socket.rooms);
  });

  // l'événement de rejoindre une partie
  socket.on("joinGame", async ({ sessionId, pin, name }) => {
    console.log(
      `Joueur ${name} veut rejoindre la partie avec le code PIN ${pin}`
    );

    //MAJ des infos du user
    users[sessionId].name = name;
    users[sessionId].pin = pin;
    users[sessionId].socket = socket;
    //user rejoint la room SI la room a encore des places vides
    let max = 0;
    // users.forEach((user) => {
    //   if (user.pin == pin && user.owner != false) {
    //     max = user.owner;
    //   }
    // });
    for (const userId in users) {
      if (users[userId].pin == pin && users[userId].owner != false) {
        max = users[userId].owner;
      }
    }
    console.log("Utilisateurs max : " + max);
    const currents = await (await io.in(pin).fetchSockets()).length;
    console.log("Utilisateurs déjà dans la room : " + currents, max < currents);
    if (currents < max) {
      socket.join(pin);
      io.to(pin).emit("notif", `${name} a rejoint la partie`);
      console.log(name + " peut rejoindre la room");
      console.log("utilisateur dans la room :" + currents);
    } else {
      socket.emit(
        "notif",
        "Le max d'utilisateurs a été atteint pour cette partie"
      );
      console.log(name + " ne peut pas rejoindre la room");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
    // for (const [gamePin, game] of Object.entries(games)) {
    //   const playerIndex = game.players.findIndex(
    //     (player) => player.id === socket.id
    //   );
    //   if (playerIndex !== -1) {
    //     game.players.splice(playerIndex, 1);
    //     io.to(gamePin).emit("playerDisconnected", { players: game.players });
    //     if (game.players.length === 0) {
    //       delete games[gamePin];
    //     }
    //     break;
    //   }
    // }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
