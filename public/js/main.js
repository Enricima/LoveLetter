"use strict";

document.addEventListener('DOMContentLoaded', () =>{
    game = new Game(4);
    game.startGame();
    while (game.areAtLeastTwoPlayersInGame() && game.deck.length > 0) {
        for (const player of game.players) {
            const cardToPlay = null;
            if (!player.isEliminated && game.deck > 0) {
                let nextAction = {drawed: false, hand: false, targetPlayer: null, guessedCard: null};
                drawedCard = game.startTurn(player);
                document.querySelectorAll('#hand').forEach(hand => {
                    hand.addEventListener('click', () => {
                        nextAction.drawed = false;
                        nextAction.hand = true;
                        const typeCard = hand.dataset.typeCard;
                        cardToPlay = createCard(typeCard);
                    });
                });
                document.querySelectorAll('#drawedCard').forEach(drawedCard => {
                    drawedCard.addEventListener('click', () => {
                        nextAction.drawed = true;
                        nextAction.hand = false;
                        const typeCard = drawedCard.dataset.typeCard;
                        cardToPlay = createCard(typeCard);
                    });
                })
                document.querySelectorAll('.target').forEach(target => {
                    target.addEventListener('click', () => {
                        const targetName = target.dataset.targetName;
                        const targetPlayer = null;
                        for(const player of game.players){
                            if(player.name === targetName && player.isEliminated != true && player.isProtected != true){
                                targetPlayer = player;
                            }
                        }
                        nextAction.targetPlayer = target
                    });
                });
                document.querySelectorAll('.guessedCard').forEach(guessedCard => {
                    guessedCard.addEventListener('click', () => {
                        nextAction.guessedCard = guessedCard.dataset.number
                    });
                });
                game.playTurn(nextAction.hand, nextAction.drawed, nextAction.player, nextAction.guessedCard);
            }
        }
    }
});

function createCard(typeCard){
    switch (typeCard) {
        case 9:
            return new Princesse();
        case 8:
            return new Comtesse();
        case 7:
            return new Roi();
        case 6:
            return new Chancelier();
        case 5:
            return new Prince();
        case 4:
            return new Servante();
        case 3:
            return new Baron();
        case 2:
            return new Pretre();
        case 1:
            return new Garde();
        case 0:
            return new Espionne();
        default:
            break;
    }
}

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
    window.location = "tableau.html";
    socket.emit("createGame", { name, numPlayers, pin });
  }
  
  function joinGame() {
    const name = document.getElementById("joinNameInput").value;
    const pin = document.getElementById("joinPin").value;
    socket.emit("joinGame", { name, pin });
  }
  

