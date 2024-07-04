"use strict";
import Game from "./Game.js";
import Player from "./Player.js";
import * as Cards from "./Cards.js";
console.log("ok");
/****** SOCKET *******/
import { connectIO } from "./socket.js";
const socket = connectIO().socket;
let user;
console.log(socket);
console.log(localStorage.getItem("socket_id"));
socket.on("getUser", (userObj) => {
  console.log(userObj);
  user = userObj;
});

/****** VARIABLES *******/
const numPlayers = localStorage.getItem("numPlayers") || 2; // Récupérer le nombre de joueurs depuis le localStorage, par défaut 2
const userName = localStorage.getItem("playerName") || "Utilisateur"; // Récupérer le nom de l'utilisateur depuis le localStorage, par défaut "Utilisateur"

const players = createPlayers(numPlayers, userName); // Créer dynamiquement les joueurs en fonction du nombre de joueurs
const userPlayer = players[0]; // Le premier joueur est l'utilisateur

// Affichage général + initialisation de la partie
const game = new Game(players);
game.startGame();

updatePlayersCards();
updateUserCards();

/****** CODE PRINCIPAL *******/
document.addEventListener("DOMContentLoaded", () => {
  // Bouton pour piocher une carte
  document.querySelector("#draw-from-deck").addEventListener("click", () => {
    let drawedCard = game.startTurn(userPlayer);
    console.log(drawedCard);

    updateUserCards();
  });

  // Bouton pour jouer la carte en main
  document.querySelector("#user-hand").addEventListener("click", () => {
    nextAction.drawed = false;
    nextAction.hand = true;
    const typeCard = hand.dataset.typeCard;
    const cardToPlay = createCard(typeCard);
    userPlaysCard(cardToPlay);
  });

  // Bouton pour jouer la carte piochée
  document.querySelectorAll("#user-drawed-card").forEach((drawedCard) => {
    drawedCard.addEventListener("click", () => {
      nextAction.drawed = true;
      nextAction.hand = false;
      const typeCard = drawedCard.dataset.typeCard;
      const cardToPlay = createCard(typeCard);
      userPlaysCard(cardToPlay);
    });
  });
});

/****** FONCTIONS *******/

function createPlayers(numPlayers, userName) {
  const playerList = [];
  for (let i = 1; i <= numPlayers; i++) {
    const name = i === 1 ? userName : `Joueur ${i}`;
    playerList.push(new Player(i, name));
  }
  return playerList;
}

function createCard(typeCard) {
  switch (typeCard) {
    case 9:
      return new Cards.Princesse();
    case 8:
      return new Cards.Comtesse();
    case 7:
      return new Cards.Roi();
    case 6:
      return new Cards.Chancelier();
    case 5:
      return new Cards.Prince();
    case 4:
      return new Cards.Servante();
    case 3:
      return new Cards.Baron();
    case 2:
      return new Cards.Pretre();
    case 1:
      return new Cards.Garde();
    case 0:
      return new Cards.Espionne();
    default:
      break;
  }
}

function userPlaysCard(card) {
  const typeCard = card.number; // Récupérer le type de carte
  if (typeCard === 1 || typeCard === 2 || typeCard === 3 || typeCard === 7) {
    //Choix du joueur cible
    if (typeCard === 1) {
      //Choix de la carte à deviner
    }
  } else if (typeCard === 5) {
    //Choix du joueur cible y compris soi-même
  } else {
  }
}

function updateUserCards() {
  // Joueur utilisateur
  const divUser = document.querySelector(".div2");
  let playedImagesHTML = "";

  userPlayer.played.forEach((card) => {
    playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${userPlayer.hand.number}"/>`;
  });
  let drawedImagesHTML = "";
  console.log(userPlayer.drawed);
  userPlayer.drawed.forEach((card) => {
    drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${userPlayer.hand.number}"/>`;
  });

  divUser.innerHTML = `
        <div class="player" id="player${userPlayer.id}">
            <h4 class="player-name">${userPlayer.name}</h4>
            <div class="cards">
                <div class="player-cards">
                    Banc
                    ${playedImagesHTML}
                </div>
                <div class="player-cards">
                    Main :
                    <img id="user-hand" class="overlapping-image" src="${userPlayer.hand.image}" data-typeCard="${userPlayer.hand.number}"/>
                </div>
                <div id="user-drawed-card" class="player-cards">
                    New
                    ${drawedImagesHTML}
                </div>
            </div>
        </div>
    `;
}

function updatePlayersCards() {
  // Joueurs adverses
  const divPlayers = document.querySelector(".div1");
  players.forEach((player) => {
    if (player.name !== userPlayer.name) {
      // Ignorer l'utilisateur lui-même
      let playedImagesHTML = "";
      player.played.forEach((card) => {
        playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${player.hand.number}"/>`;
      });
      let drawedImagesHTML = "";
      player.drawed.forEach((card) => {
        drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${player.hand.number}"/>`;
      });

      divPlayers.innerHTML += `
                <div class="player" id="player${player.id}">
                    <h4 class="player-name">${player.name}</h4>
                    <div class="cards">
                        <div class="player-cards">
                            Banc
                            ${playedImagesHTML}
                        </div>
                        <div class="player-cards">
                            Main :
                            <img class="overlapping-image" src="${player.hand.image}" data-typeCard="${player.hand.number}"/>
                        </div>
                        <div class="player-cards">
                            New
                            ${drawedImagesHTML}
                        </div>
                    </div>
                </div>
            `;
    }
  });
}
