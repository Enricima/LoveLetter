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
    play(game, player, targetPlayer) {
      throw new Error("Method 'power()' must be implemented.");
    }
}

///////////////////////////
// CLASSES PERSONNAGES   //
//////////////////////////

// Princesse
class Princesse extends Card {

  constructor(){
    super(9, "Princesse", "Si vous jouez ou défaussez la Princesse, vous quittez la manche.", "../assets/img/princesse.jpeg");
  }

  play(game, player) {
    game.eliminate(player);
  }
}

// Comtesse
class Comtesse extends Card {

  constructor(){
    super(8, "Comtesse", "Si votre main contient un Roi ou un Prince, vous devez jouer la Comtesse.", "../assets/img/comtesse.jpeg");
  }

  play(player){
    if(player.hand.number === 7 || player.hand.number === 7){
      player.discardCard();
    }
  }
}

// Roi
class Roi extends Card {

  constructor(){
    super(7, "Roi", "Choisissez un autre joueur et échangez vos mains.", "../assets/img/roi.jpeg");
  }

  play(player, targetPlayer){
    const playerCard = player.discardCard();
    const targetPlayerCard = targetPlayerCard.discardCard();
    
    player.drawCard(targetPlayerCard);
    targetPlayer.drawCard(playerCard);
  }
}

// Chancelier
class Chancelier extends Card {

  constructor(){
    super(7, "Chancelier", "Piochez 2 cartes. Conservez 1 carte et placez les 2 autres dans l'ordre de votre choix sous de la paquet", "../assets/img/chancelier.jpeg");
  }

  play(player){
    player.drawTwoFromDeck();
    player.discardCard();
  }
}

// Prince
class Prince extends Card {

  constructor(){
    super(7, "Prince", "Choisissez n'importe quel joueur, y compris vous-même. Le joueur choisi défausse sa main et en pioche une nouvelle.", "../assets/img/prince.jpeg");
  }

  play(game, player, targetPlayer){
    player.discardCard();
    player.drawCard()
  }
}