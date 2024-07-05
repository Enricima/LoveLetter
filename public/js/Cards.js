///////////////////////////
// CLASSE ABSTRAITE CARD //
//////////////////////////
class Card {
    constructor(number, name, description, image) {
      if (this.constructor === Card) {
        throw new Error("Abstract classes can't be instantiated.");
      }
      this.number = number;
      this.name = name;
      this.description = description;
      this.image = image;
    }
  
    // Méthode abstraite
    play(drawed, hand, game, player, targetPlayer, guessedCard) {
      throw new Error("Method 'power()' must be implemented.");
    }

    sortCards(player, drawed, hand){
      if(drawed){ // Si la carte jouée est la carte piochée
        const card = player.drawed[0];
        player.played.push(card);
        player.drawed = [];
    } else if(hand){ // Si la carte jouée est la carte de sa main
        const card = player.hand;
        player.played.push(card);
        player.hand = player.drawed[0];
        player.drawed = [];
    }
    }
}


///////////////////////////
// CLASSES PERSONNAGES   //
//////////////////////////

// Princesse
export class Princesse extends Card {

  constructor(){
    super(9, "Princesse", "Si vous jouez ou défaussez la Princesse, vous quittez la manche.", "assets/img/cartes/princesse.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard) {
    this.sortCards(player, drawed, hand);
    console.log(player);
    game.eliminatePlayer(game, player);
    //console.log("Princesse jouée " + player.isEliminated + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name);
    console.log(player);
  }
}

// Comtesse
export class Comtesse extends Card {

  constructor(){
    super(8, "Comtesse", "Si votre main contient un Roi ou un Prince, vous devez jouer la Comtesse.", "assets/img/cartes/comtesse.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    this.sortCards(player, drawed, hand);
    console.log("Comtesse jouée " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name);
  }
}

// Roi
export class Roi extends Card {

  constructor(){
    super(7, "Roi", "Choisissez un autre joueur et échangez vos mains.", "assets/img/cartes/roi.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    if(drawed){
      let temp = player.hand;
      player.hand = targetPlayer.hand;
      targetPlayer.hand = temp;
      this.sortCards(player, drawed, hand);
    }else if(hand){
      this.sortCards(player, drawed, hand);
      let temp = player.hand;
      player.hand = targetPlayer.hand;
      targetPlayer.hand = temp;
    }
    console.log("Roi jouée " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name, ", Main joueur adverse : " + targetPlayer.hand.name);
  }
}

// Chancelier à refaire
export class Chancelier extends Card {

  constructor(){
    super(6, "Chancelier", "Piochez 2 cartes. Conservez 1 carte et placez les 2 autres dans l'ordre de votre choix sous de la paquet", "assets/img/cartes/chancelier.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    console.log(player);
    console.log("Chancelier fait ");
  }
}

// Prince
export class Prince extends Card {

  constructor(){
    super(5, "Prince", "Choisissez n'importe quel joueur, y compris vous-même. Le joueur choisi défausse sa main et en pioche une nouvelle.", "assets/img/cartes/prince.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    if(targetPlayer === player && hand){
      this.sortCards(player, drawed, hand);
      player.discardCard(game);
      let newCard = targetPlayer.drawCard(game.deck.pop());
      targetPlayer.hand = newCard;
      targetPlayer.drawed = [];
    } else if(targetPlayer === player && drawed){
      this.sortCards(player, drawed, hand);
      player.discardCard(game);
      let newCard = targetPlayer.drawCard(game.deck.pop());
      targetPlayer.hand = newCard;
      targetPlayer.drawed = [];

    } else {
      targetPlayer.discardCard(game);
      let newCard = targetPlayer.drawCard(game.deck.pop());
      targetPlayer.hand = newCard;
      targetPlayer.drawed = [];
      this.sortCards(player, drawed, hand);
    }
      

    console.log(player);
    console.log(targetPlayer);
    //console.log("Prince joué " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name + ", Main joueur adverse : " + targetPlayer.hand.name);
  }
}

// Servante
export class Servante extends Card {

  constructor(){
    super(4, "Servante", "Jusqu'à votre prochain tour, les effets de cartes des autres joueurs ne peuvent pas vous cibler", "assets/img/cartes/servante.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    player.isProtected = true;
    this.sortCards(player, drawed, hand);
    console.log("Servante jouée " + player.isProtected + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name);
  }
}

// Baron
export class Baron extends Card {

  constructor(){
    super(3, "Baron", "Choisissez un autre joueur et comparez discrètement vos mains. Celui dont la carte a la plus faible valeur quitte la manche.", "assets/img/cartes/baron.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    this.sortCards(player, drawed, hand);
    if(player.hand.number > targetPlayer.hand.number){
      game.eliminatePlayer(game, targetPlayer);
    } else if(player.hand.number < targetPlayer.hand.number){
      game.eliminatePlayer(game, player);
    }
    console.log("Baron joué " + player.isEliminated + " " + targetPlayer.isEliminated);
    console.log(game.players);
  }
}

// Pretre à voir comment faire passer le résultat
export class Pretre extends Card {

  constructor(){
    super(2, "Prêtre", "Choisissez un autre joueur et regardez sa main.", "assets/img/cartes/pretre.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    console.log(targetPlayer.hand);
    this.sortCards(player, drawed, hand);
    console.log("Pretre joué " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name + ", Main adverse : " + targetPlayer.hand.name);
  }
}

// Garde
export class Garde extends Card {

  constructor(){
    super(1, "Garde", "Choisissez un autre joueur et nommez un personnage autre que le Garde. Si le joueur choisi a cette carte en main, il quitte la manche.", "assets/img/cartes/garde.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    if(targetPlayer.hand.name === guessedCard){
      game.eliminatePlayer(game, targetPlayer);
    }
    console.log(player);
    this.sortCards(player, drawed, hand);
    // console.log("Garde joué " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name + ", Main adverse : " + targetPlayer.hand.name + " " + targetPlayer.isEliminated);
  }
}

// Espionne
export class Espionne extends Card {

  constructor(){
    super(0, "Espionne", "A la fin de la manche, si vous êtes le seul joueur encore en lice qui a joué ou défaussé une Espionne, vous gagnez un pion faveur", "assets/img/cartes/espionne.png");
  }

  play(drawed, hand, game, player, targetPlayer, guessedCard){
    this.sortCards(player, drawed, hand);
    console.log("Espionne jouée " + ", Main : " + player.hand.name + ", Jouée : " + player.played[0].name);

  }
}