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
    discardCard(){
        const card = this.hand;
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
    playCard(drawed, hand, game, targetPlayer, guessedCard){
        return new Promise((resolve, reject)=> {
            card.play(game, this, targetPlayer, guessedCard);
            if(drawed){ // Si la carte jouée est la carte piochée
                const card = this.drawed[0];
                this.played.push(card);
                this.drawed = [];
            } else if(hand){ // Si la carte jouée est la carte de sa main
                const card = this.hand;
                this.played.push(card);
                this.hand = this.drawed[0];
                this.drawed = [];
            }
            resolve(true); //true => valeur récupérée lors du then ou await
        })
        
    }
}
export default Player;