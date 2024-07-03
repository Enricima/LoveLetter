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
export class Princesse extends Card {

  constructor(){
    super(9, "Princesse", "Si vous jouez ou défaussez la Princesse, vous quittez la manche.", "assets/img/cartes/princesse.png");
  }

  play(game, player) {
    game.eliminate(player);
  }
}

// Comtesse
export class Comtesse extends Card {

  constructor(){
    super(8, "Comtesse", "Si votre main contient un Roi ou un Prince, vous devez jouer la Comtesse.", "assets/img/cartes/comtesse.png");
  }

  play(player){
    if(player.hand.number === 7 || player.hand.number === 7){
      player.discardCard();
    }
  }
}

// Roi
export class Roi extends Card {

  constructor(){
    super(7, "Roi", "Choisissez un autre joueur et échangez vos mains.", "assets/img/cartes/roi.png");
  }

  play(player, targetPlayer){
    const playerCard = player.discardCard();
    const targetPlayerCard = targetPlayerCard.discardCard();
    
    player.drawCard(targetPlayerCard);
    targetPlayer.drawCard(playerCard);
  }
}

// Chancelier
export class Chancelier extends Card {

  constructor(){
    super(6, "Chancelier", "Piochez 2 cartes. Conservez 1 carte et placez les 2 autres dans l'ordre de votre choix sous de la paquet", "assets/img/cartes/chancelier.png");
  }

  play(player){
    player.drawTwoFromDeck();
    player.discardCard();
  }
}

// Prince
export class Prince extends Card {

  constructor(){
    super(5, "Prince", "Choisissez n'importe quel joueur, y compris vous-même. Le joueur choisi défausse sa main et en pioche une nouvelle.", "assets/img/cartes/prince.png");
  }

  play(game, player, targetPlayer){
    player.discardCard();
    player.drawCard()
  }
}

// Servante
export class Servante extends Card {

  constructor(){
    super(4, "Servante", "Jusqu'à votre prochain tour, les effets de cartes des autres joueurs ne peuvent pas vous cibler", "assets/img/cartes/servante.png");
  }

  play(){
    
  }
}

// Baron
export class Baron extends Card {

  constructor(){
    super(3, "Baron", "Choisissez un autre joueur et comparez discrètement vos mains. Celui dont la carte a la plus faible valeur quitte la manche.", "assets/img/cartes/baron.png");
  }

  play(){
    
  }
}

// Pretre
export class Pretre extends Card {

  constructor(){
    super(2, "Prêtre", "Choisissez un autre joueur et regardez sa main.", "assets/img/cartes/pretre.png");
  }

  play(){
    
  }
}

// Garde
export class Garde extends Card {

  constructor(){
    super(1, "Garde", "Choisissez un autre joueur et nommez un personnage autre que le Garde. Si le joueur choisi a cette carte en main, il quitte la manche.", "assets/img/cartes/garde.png");
  }

  play(){
    
  }
}

// Garde
export class Espionne extends Card {

  constructor(){
    super(0, "Espionne", "A la fin de la manche, si vous êtes le seul joueur encore en lice qui a joué ou défaussé une Espionne, vous gagnez un pion faveur", "assets/img/cartes/espionne.png");
  }

  play(){
    
  }
}