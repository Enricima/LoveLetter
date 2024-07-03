"use strict";
import Game from "./Game.js";
import Player from "./Player.js";
import * as Cards from "./Cards.js";

document.addEventListener("DOMContentLoaded", () => {
  const testPlayers = [
    new Player(1, "Joueur 1"),
    new Player(2, "Joueur 2"),
    new Player(3, "Joueur 3"),
    new Player(4, "Joueur 4"),
    new Player(5, "Joueur 5"),
    new Player(6, "Joueur 6"),
  ];
  // Affichage général + initialisation de la partie
  const numPlayers = localStorage.getItem("numPlayers");
  const game = new Game(testPlayers);
  game.startGame();

  // Joueurs adverses
  const divPlayers = document.querySelector(".div1");
  testPlayers.forEach((player) => {
    let playedImagesHTML = "";
    player.played.forEach((card) => {
      playedImagesHTML += `<img class="overlapping-image" src="${card.image}" alt="Card"/>`;
    });
    let drawedImagesHTML = "";
    player.drawed.forEach((card) => {
      drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" alt="Card"/>`;
    });
    if (player.name != "Joueur 1") {
      divPlayers.innerHTML += `
            <div class="player" id="player${player.id}">
                <h4 class="player-name">${player.name}</h4>
                <div class="cards">
                    <div class="player-cards">
                        Banc
                        ${playedImagesHTML}
                        <img class="overlapping-image" src="${player.hand.image}" alt="Card"/>
                        <img class="overlapping-image" src="${player.hand.image}" alt="Card"/>
                    </div>
                    <div class="player-cards">
                        Main :
                        <img class="overlapping-image" src="${player.hand.image}" alt="Card"/>
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

  // Joueur utilisateur
  const divUser = document.querySelector(".div2");
  testPlayers.forEach((player) => {
    let playedImagesHTML = "";
    player.played.forEach((card) => {
      playedImagesHTML += `<img class="overlapping-image" src="${card.image}" alt="Card"/>`;
    });
    let drawedImagesHTML = "";
    player.drawed.forEach((card) => {
      drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" alt="Card"/>`;
    });
    if (player.name === "Joueur 1") {
      divUser.innerHTML += `
           <div class="player" id="player${player.id}">
                <h4 class="player-name">${player.name}</h4>
                <div class="cards">
                    <div class="player-cards">
                        Banc
                        ${playedImagesHTML}
                    </div>
                    <div class="player-cards">
                        Main :
                        <img class="overlapping-image" src="${player.hand.image}" alt="Card"/>
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

  //Début de la partie
  // while (game.areAtLeastTwoPlayersInGame() && game.deck.length > 0) {
  //     for (const player of game.players) {
  //         const cardToPlay = null;
  //         if (!player.isEliminated && game.deck > 0) {
  //             let nextAction = {drawed: false, hand: false, targetPlayer: null, guessedCard: null};
  //             drawedCard = game.startTurn(player);
  //             document.querySelectorAll('#hand').forEach(hand => {
  //                 hand.addEventListener('click', () => {
  //                     nextAction.drawed = false;
  //                     nextAction.hand = true;
  //                     const typeCard = hand.dataset.typeCard;
  //                     cardToPlay = createCard(typeCard);
  //                 });
  //             });
  //             document.querySelectorAll('#drawedCard').forEach(drawedCard => {
  //                 drawedCard.addEventListener('click', () => {
  //                     nextAction.drawed = true;
  //                     nextAction.hand = false;
  //                     const typeCard = drawedCard.dataset.typeCard;
  //                     cardToPlay = createCard(typeCard);
  //                 });
  //             })
  //             document.querySelectorAll('.target').forEach(target => {
  //                 target.addEventListener('click', () => {
  //                     const targetName = target.dataset.targetName;
  //                     const targetPlayer = null;
  //                     for(const player of game.players){
  //                         if(player.name === targetName && player.isEliminated != true && player.isProtected != true){
  //                             targetPlayer = player;
  //                         }
  //                     }
  //                     nextAction.targetPlayer = target
  //                 });
  //             });
  //             document.querySelectorAll('.guessedCard').forEach(guessedCard => {
  //                 guessedCard.addEventListener('click', () => {
  //                     nextAction.guessedCard = guessedCard.dataset.number
  //                 });
  //             });
  //             game.playTurn(nextAction.hand, nextAction.drawed, nextAction.player, nextAction.guessedCard);
  //         }
  //     }
  // }
});

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
