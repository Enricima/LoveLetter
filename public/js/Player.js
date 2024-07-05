class Player {
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.hand = null;
        this.drawed = [];
        this.played = [];
        this.isProtected = false;
        this.isEliminated = false;
        this.score = 0;
    }

    // Tirer une carte
    drawCard(card){
        this.drawed.push(card);
        return card;
    }

    // Défausser une carte
    discardCard(game){
        const card = this.hand;
        console.log(this)
        if(card.number === 9){
            game.eliminatePlayer(game, this);
        }
        this.hand = null;
        this.played.push(card);
    }

    // Défausser 2 cartes (Chancelier)
    discardTwoCard(card1, card2){
        // Si les 2 cartes à remettre dans la pioche sont celles piochées
        if(card1 || card2 === this.drawed[0] && card1 || card2 === this.drawed[1]){
            this.drawed = []
        } else if(card1 || card2 === drawed[0] && card1 || card2 === this.hand){ // Si une carte est la première piochée et l'autre est la main
            this.hand = drawed[1];
            this.drawed = [];
        }else if(card1 || card2 === drawed[1] && card1 || card2 === this.hand){ // Si une carte est la deuxième piochée et l'autre est la main
            this.hand = drawed[0];
            this.drawed = [];
        }
    }

    // Jouer une carte
    playCard(card, drawed, hand, game, player, targetPlayer, guessedCard){
        return new Promise((resolve, reject)=> {
            card.play(drawed, hand, game, player, targetPlayer, guessedCard);
            resolve(true); //true => valeur récupérée lors du then ou await
        });
        
    }
}
export default Player;