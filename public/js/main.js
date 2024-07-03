"use strict";
import Game from './Game.js';
import Player from './Player.js';
import * as Cards from './Cards.js';
/****** VARIABLES *******/
const players = [
    new Player(1, 'Joueur 1'),
    new Player(2, 'Joueur 2'),
    new Player(3, 'Joueur 3'),
    new Player(4, 'Joueur 4'),
    new Player(5, 'Joueur 5'),
    new Player(6, 'Joueur 6'),
];

const userName = localStorage.getItem('name');
const userPlayer = players.filter(player => player.name === userName)[0];
// Affichage général + initialisation de la partie
const numPlayers = localStorage.getItem('numPlayers');
const game = new Game(players);
game.startGame();

updatePlayersCards(userName, players);
updateUserCards(userName, players);

/****** CODE PRINCIPAL *******/

document.addEventListener('DOMContentLoaded', () =>{

    // Bouton pour piocher une carte
    document.querySelector('#draw-from-deck').addEventListener('click', () => {
        let drawedCard = game.startTurn(userPlayer);

        updateUserCards();
    });

    // Bouton pour jouer la carte en main
    document.querySelector('#user-hand').addEventListener('click', () => {
        nextAction.drawed = false;
        nextAction.hand = true;
        const typeCard = hand.dataset.typeCard;
        cardToPlay = createCard(typeCard);
        userPlaysCard(cardToPlay);
    });

    // Bouton pour jouer la carte piochée
    document.querySelectorAll('#user-drawed-card').forEach(drawedCard => {
        drawedCard.addEventListener('click', () => {
            nextAction.drawed = true;
            nextAction.hand = false;
            const typeCard = drawedCard.dataset.typeCard;
            cardToPlay = createCard(typeCard);
            userPlaysCard(cardToPlay);
        });
    });

    //Début de la partie
    // while (game.areAtLeastTwoPlayersInGame() && game.deck.length > 0) {
    //     for (const player of game.players) {
    //         const cardToPlay = null;
    //         if (!player.isEliminated && game.deck.length > 0) {
    //             let nextAction = {drawed: false, hand: false, targetPlayer: null, guessedCard: null};
                // document.querySelectorAll('.target').forEach(target => {
                //     target.addEventListener('click', () => {
                //         const targetName = target.dataset.targetName;
                //         const targetPlayer = null;
                //         for(const player of game.players){
                //             if(player.name === targetName && player.isEliminated != true && player.isProtected != true){
                //                 targetPlayer = player;
                //             }
                //         }
                //         nextAction.targetPlayer = target
                //     });
                // });
                // document.querySelectorAll('.guessedCard').forEach(guessedCard => {
                //     guessedCard.addEventListener('click', () => {
                //         nextAction.guessedCard = guessedCard.dataset.number
                //     });
                // });
                //game.playTurn(nextAction.hand, nextAction.drawed, nextAction.player, nextAction.guessedCard);
            //}
        //}
    //}
});

/****** FONCTIONS *******/


function createCard(typeCard){
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

function userPlaysCard(card){
    const typeCard = card.number;
    if(typeCard === 1 || typeCard === 2 || typeCard === 3 || typeCard ===7){
        //Choix du joueur cible
        if(typeCard === 1){
            //Choix de la carte à deviner
        }
    } else if(typeCard === 5){
        //Choix du joueur cible y compris soi-même
    } else {

    }

}

function updateUserCards(){
    // Joueur utilisateur
    const divUser = document.querySelector('.me');
        let playedImagesHTML = '';
        
        userPlayer.played.forEach(card => {
            playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${userPlayer.hand.number}"/>`;
        });
        let drawedImagesHTML = '';
        userPlayer.drawed.forEach(card => {
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

function updatePlayersCards(){
    // Joueurs adverses
    const divPlayers = document.querySelector('.div1');
    players.forEach(player => {
        let playedImagesHTML = '';
        player.played.forEach(card => {
            playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${player.hand.number}"/>`;
        });
        let drawedImagesHTML = '';
        player.drawed.forEach(card => {
            drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${player.hand.number}"/>`;
        });
        if(player.name != userName){
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
  

