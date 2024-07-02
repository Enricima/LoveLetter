class Game {

    constructor(players){
        this.players = players;
        this.deck = this.createDeck();
        this.discardPile = [];
        this.scoreToEnd = setScoreToEnd(this.players.length);
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
            new Espionne(), new Espionne(),
            new Garde(), new Garde(), new Garde(), new Garde(), new Garde(), new Garde(),
            new Prêtre(), new Prêtre(),
            new Baron(), new Baron(),
            new Servante(), new Servante(),
            new Prince(), new Prince(),
            new Chancelier(), new Chancelier(),
            new Roi(),
            new Comtesse(),
            new Princesse()
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
        this.players.forEach(player => {
          player.drawCard(this.deck.pop());
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
        drawedCard = player.drawCard(this.deck.pop());
        return drawedCard;
    }

    async playTurn(hand, drawed, player, targetPlayer = null, guessedCard = null){
        await player.playCard(hand, drawed, this, targetPlayer, guessedCard);
    }


    endGame(){

    }
}