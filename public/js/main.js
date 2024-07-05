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


/****** CODE PRINCIPAL *******/

document.addEventListener('DOMContentLoaded', () =>{
    game.startGame();
    console.log(userPlayer.hand);
    updatePlayersCards(userName, players);
    updateUserCards(userName, players);
    // Bouton pour piocher une carte
    document.querySelector('#draw-from-deck').addEventListener('click', () => {
        userPlayer.isProtected = false;
        let drawedCard = game.startTurn(userPlayer);

        updateUserCards();

        // Bouton pour jouer la carte en main
        const hand = document.querySelector('#user-hand');
        hand.addEventListener('click', () => {
            const typeCard = hand.dataset.typecard;
            const cardToPlay = createCard(typeCard);
            userPlaysCard(cardToPlay, true, false);
        });

        // Bouton pour jouer la carte piochée
        document.querySelectorAll('#user-drawed-card').forEach(drawedCard => {
            drawedCard.querySelector("img").addEventListener('click', (e) => {
                const typeCard = e.currentTarget.dataset.typecard;
                console.log(typeCard);
                const cardToPlay = createCard(typeCard);
                console.log(cardToPlay);
                userPlaysCard(cardToPlay, false, true);
            });
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
    let cardToReturn = null;
    switch (typeCard) {
        case '9':
            cardToReturn = new Cards.Princesse();
            break;
        case '8':
            cardToReturn = new Cards.Comtesse();
            break;
        case '7':
            cardToReturn = new Cards.Roi();
            break;
        case '6':
            cardToReturn = new Cards.Chancelier();
            break;
        case '5':
            cardToReturn = new Cards.Prince();
            break;
        case '4':
            cardToReturn = new Cards.Servante();
            break;
        case '3':
            cardToReturn = new Cards.Baron();
            break;
        case '2':
            cardToReturn = new Cards.Pretre();
            break;
        case '1':
            cardToReturn = new Cards.Garde();
            break;
        case '0':
            cardToReturn = new Cards.Espionne();
            break;
        default:
            break;
    }
    return cardToReturn;
}

async function userPlaysCard(card, hand, drawed){
    const typeCard = card.number;
    if(typeCard === 1 || typeCard === 2 || typeCard === 3 || typeCard ===7 || typeCard === 5 || typeCard === 6){
        //Choix du joueur cible
        let returnedValues = showPopup(card, drawed, hand);
    } else {
        await userPlayer.playCard(card, drawed, hand, game, userPlayer, null, null);
        updatePlayersCards();
        updateUserCards();
    }
    

}

function updateUserCards(){
    // Joueur utilisateur
    const divUser = document.querySelector('.me');
    let playedImagesHTML = '';
    
    userPlayer.played.forEach(card => {
        playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typecard="${card.number}"/>`;
    });
    let drawedImagesHTML = '';
    userPlayer.drawed.forEach(card => {
        console.log(card.number);
        drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typecard="${card.number}"/>`;
    });

    if(!userPlayer.isEliminated){
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
    }else{
        divUser.innerHTML = `
        <div class="player" id="player${userPlayer.id}">
            <h4 class="player-name">${userPlayer.name} (Eliminé)</h4>
            <div class="cards">
                <div class="player-cards">
                    Banc
                    ${playedImagesHTML}
                </div>
            </div>
            
        </div>
        `;
    }
        
        
}

function updatePlayersCards(){
    // Joueurs adverses
    const divPlayers = document.querySelector('.div1');
    divPlayers. innerHTML = '';
    players.forEach(player => {
        let playedImagesHTML = '';
        player.played.forEach(card => {
            playedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${card.number}"/>`;
        });
        let drawedImagesHTML = '';
        player.drawed.forEach(card => {
            drawedImagesHTML += `<img class="overlapping-image" src="${card.image}" data-typeCard="${card.number}"/>`;
        });
        if(player.name != userName){
            if(!player.isEliminated){
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
            }else {
                divPlayers.innerHTML += `
                <div class="player" id="player${player.id}">
                    <h4 class="player-name">${player.name} (Eliminé)</h4>
                    <div class="cards">
                        <div class="player-cards">
                            Banc
                            ${playedImagesHTML}
                        </div>
                    </div>
                    
                </div>
                `;
            }
        }
        
    });
}

//Gestion des Popups
const title = document.getElementById('popup-title');
const message = document.getElementById('popup-message');
const closeButton = document.getElementById('close-btn');
const ulPlayers = document.querySelector('.popup-players');

// Affiche un popup différent en fonction de la carte action choisi
function showPopup(card, drawed, hand) {
    switch (card.number) {
      case 1 :
        title.textContent = "Vous utilisez la carte du Garde";
        message.textContent = "Choisissez de quel joueur vous désirez deviner la carte :";
        closeButton.style.display = 'none';
        break;
      case 2 :
        title.textContent = "Vous utilisez la carte du Prêtre";
        message.textContent = "Choisissez de quel joueur vous désirez voir une carte :";
        closeButton.style.display = 'none';
        break;
      case 3 :
        title.textContent = "Vous utilisez la carte du Baron";
        message.textContent = "Choisissez avec quel joueur vous désirez être en duel :";
        closeButton.style.display = 'none';
        break;
      case 5 :
        title.textContent = "Vous utilisez la carte du Prince";
        message.textContent = "Choisissez de quel joueur vous désirez défausser une carte :";
        closeButton.style.display = 'none';
        break;
      case 6 :
        title.textContent = "Vous utilisez la carte du Chancelier";
        message.textContent = "Vous piochez 2 cartes, choisissez la carte que vous voulez conserver :";
        closeButton.style.display = 'none';
        break
      case 7 :
        title.textContent = "Vous utilisez la carte du Roi";
        message.textContent = "Choisissez avec quel joueur vous désirez échanger une carte :";
        closeButton.style.display = 'none';
        break;
    }

    document.getElementById('popup').classList.add('open');
    createButtonPlayers(card, drawed, hand);
    
}

function createButtonPlayers(card, drawed, hand){
    ulPlayers.innerHTML = '';
    let returnValues = {targetPlayer: null, guessedCard: null};
    if(card.number === 5){
        game.players.forEach(player => {
            if(!player.isProtected && !player.isEliminated){
                ulPlayers.innerHTML += `<li data-playerName="${player.name}"><button>${player.name}</button></li>`;
            }
        });
    } else if(card.number === 6){
        if(drawed){
            userPlayer.played.push(userPlayer.drawed[0]);
            userPlayer.drawed[0] = [];
        } else if(hand){
            userPlayer.played.push(userPlayer.hand);
            userPlayer.hand = userPlayer.drawed[0];
            userPlayer.drawed = [];
        }
        userPlayer.drawCard(game.deck.pop());
        userPlayer.drawCard(game.deck.pop());
        let cards = [userPlayer.hand, userPlayer.drawed[0], userPlayer.drawed[1]];
        message.textContent = 'Choisissez la carte que vous voulez garder : ';
        for (const cardU of cards) {
            ulPlayers.innerHTML += `
            <li data-guessedcard="${cardU.name}"><button>${cardU.name}</button></li>
            `;
        }
        const lisCards = document.querySelectorAll('.popup-players li');
        lisCards.forEach(li => {
            li.addEventListener('click', async () => {
                let newCard = li.dataset.guessedcard;
                console.log(newCard);
                let cardsUnderDeck = [];
                switch (newCard) {
                    case userPlayer.hand.name:
                        console.log("Switch hand");
                        cardsUnderDeck.push(userPlayer.drawed[0]);
                        cardsUnderDeck.push(userPlayer.drawed[1]);
                        userPlayer.drawed = [];
                        break;
                    case userPlayer.drawed[0].name:
                        console.log("Switch drawed 0");
                        cardsUnderDeck.push(userPlayer.hand);
                        cardsUnderDeck.push(userPlayer.drawed[1]);
                        userPlayer.hand = userPlayer.drawed[0];
                        userPlayer.drawed = [];
                        break;
                    case userPlayer.drawed[1].name:
                        console.log("Switch drawed 1");
                        cardsUnderDeck.push(userPlayer.hand);
                        cardsUnderDeck.push(userPlayer.drawed[0]);
                        userPlayer.hand = userPlayer.drawed[1];
                        userPlayer.drawed = [];
                        break;
                }
                console.log(game.deck);
                for (const cardU of cardsUnderDeck) {
                    game.deck.unshift(cardU);
                }
                console.log(game.deck);
                closePopup();
                userPlayer.playCard(card, drawed, hand, game, userPlayer, getPlayer(returnValues.targetPlayer), returnValues.guessedCard);
                updatePlayersCards();
                updateUserCards();
            });
        });
    } else {
        game.players.forEach(player => {
            if(player.name != userName && !player.isProtected && !player.isEliminated){
                ulPlayers.innerHTML += `<li data-playername="${player.name}"><button>${player.name}</button></li>`;
            }
        });
    }
    const lisPlayers = document.querySelectorAll('.popup-players li');
    lisPlayers.forEach(li => {
        li.addEventListener('click', async () => {
            let playerName = li.dataset.playername;
            returnValues.targetPlayer = playerName;
            if(card.number === 1){
                message.textContent = 'Choisissez la carte que vous pensez que : ' + playerName + ' a en main';
                ulPlayers.innerHTML = `
                    <li data-guessedcard="Espionne"><button>Espionne</button></li>
                    <li data-guessedcard="Pretre"><button>Prêtre</button></li>
                    <li data-guessedcard="Baron"><button>Baron</button></li>
                    <li data-guessedcard="Servante"><button>Servante</button></li>
                    <li data-guessedcard="Prince"><button>Prince</button></li>
                    <li data-guessedcard="Chancelier"><button>Chancelier</button></li>
                    <li data-guessedcard="Roi"><button>Roi</button></li>
                    <li data-guessedcard="Comtesse"><button>Comtesse</button></li>
                    <li data-guessedcard="Princesse"><button>Princesse</button></li>
                    `;
                const lisCards = document.querySelectorAll('.popup-players li');
                lisCards.forEach(li => {
                    li.addEventListener('click', async () => {
                        returnValues.guessedCard = li.dataset.guessedcard;
                        returnValues.targetPlayer = playerName;
                        console.log(returnValues);
                        
                        closePopup();
                        userPlayer.playCard(card, drawed, hand, game, userPlayer, getPlayer(returnValues.targetPlayer), returnValues.guessedCard);
                        updatePlayersCards();
                        updateUserCards();
                    });
                });
            } else if(card.number === 6){
                
            }else {
                closePopup();
                let ok = await userPlayer.playCard(card, drawed, hand, game, userPlayer, getPlayer(returnValues.targetPlayer), null);
                console.log(ok);
                updatePlayersCards();
                updateUserCards();
            }
        });
    });
}


function closePopup() {
    document.getElementById('popup').classList.remove('open');
    document.querySelector('.popup ul').style.display = '';
}

function getPlayer(playerName){
    return players.filter(player => player.name === playerName)[0];
}
