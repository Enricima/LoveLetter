import * as Cards from'./Cards.js';

class Game {

    constructor(players){
        this.players = players;
        this.deck = this.createDeck();
        this.discardPile = [];
        this.scoreToEnd = this.setScoreToEnd(this.players.length);
    }

    setScoreToEnd(numPlayers){
        switch (numPlayers) {
            case 2:
                return 6;
            case 3:
                return 5;
            case 4:
                return 4;
            case 5:
                return 3;
            case 6:
                return 3;
            default:
                break;
        }
    }

    createDeck() {
        const deck = [
            new Cards.Espionne(), new Cards.Espionne(),
            new Cards.Garde(), new Cards.Garde(), new Cards.Garde(), new Cards.Garde(), new Cards.Garde(), new Cards.Garde(),
            new Cards.Pretre(), new Cards.Pretre(),
            new Cards.Baron(), new Cards.Baron(),
            new Cards.Servante(), new Cards.Servante(),
            new Cards.Prince(), new Cards.Prince(),
            new Cards.Chancelier(), new Cards.Chancelier(),
            new Cards.Roi(),
            new Cards.Comtesse(),
            new Cards.Princesse()
        ];
        return this.shuffle(deck);
    }

    shuffle(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    dealInitialCards() {
        this.discardPile.push(this.deck.pop());
        this.players.forEach(player => {
          player.drawCard(this.deck.pop());
          player.hand = player.drawed[0];
          player.drawed = [];
        });
    }

    eliminatePlayer(player) {
        if(player.hand){
            player.discardCard();
        }
        player.isEliminated = true;
    }

    areAtLeastTwoPlayersInGame(){
        return this.players.filter(player => !player.isEliminated).length > 1;
    }

    startGame() {
    // Reset des joueurs
        this.players.forEach(player => {
            player.isProtected = false;
            player.isEliminated = false;
        });

        // Mise en place de la manche
        this.deck = this.createDeck();
        this.dealInitialCards();
    }

    startTurn(player){
        let  drawedCard = player.drawCard(this.deck.pop());
        return drawedCard;
    }

    async playTurn(hand, drawed, player, targetPlayer = null, guessedCard = null){
        await player.playCard(hand, drawed, this, targetPlayer, guessedCard);
    }


    endGame(){

    }
}
export default Game;