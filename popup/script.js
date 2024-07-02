let currentCardType = '';
const title = document.getElementById('popup-title');
const message = document.getElementById('popup-message');
const closeButton = document.getElementById('close-btn');

// Affiche un popup différent en fonction de la carte action choisi
function showPopup(cardType) {
  
  currentCardType = cardType;
  
  switch (cardType) {
    case 'Garde':
      title.textContent = "Vous utilisez la carte du Garde";
      message.textContent = "Choisissez de quel joueur vous désirez deviner la carte :";
      closeButton.style.display = 'none';
      break;
    case 'Pretre':
      title.textContent = "Vous utilisez la carte du Prêtre";
      message.textContent = "Choisissez de quel joueur vous désirez voir une carte :";
      closeButton.style.display = 'none';
      break;
    case 'Baron':
      title.textContent = "Vous utilisez la carte du Baron";
      message.textContent = "Choisissez avec quel joueur vous désirez être en duel :";
      closeButton.style.display = 'none';
      break;
    case 'Prince':
      title.textContent = "Vous utilisez la carte du Prince";
      message.textContent = "Choisissez de quel joueur vous désirez défausser une carte :";
      closeButton.style.display = 'none';
      break;
    case 'Roi':
      title.textContent = "Vous utilisez la carte du Roi";
      message.textContent = "Choisissez avec quel joueur vous désirez échanger une carte :";
      closeButton.style.display = 'none';
      break;
  }

  document.getElementById('popup').classList.add('open');
}

// Popup d'affichage de l'élimination d'un joueur
function showEliminationPopup() {
  
  title.textContent = "Élimination d'un joueur";
  message.textContent = "Le joueur ... a été éliminé pour cette manche.";
  document.querySelector('.popup ul').style.display = 'none'; 
  closeButton.style.display = 'block';
  
  document.getElementById('popup').classList.add('open');
}

// Popup d'affichage de la fin de la manche
function showFinManchePopup() {
  title.textContent = "Fin de la manche";
  message.textContent = "La manche est terminée.";
  document.querySelector('.popup ul').style.display = 'none'; 
  closeButton.style.display = 'block';
  
  document.getElementById('popup').classList.add('open');
}

// Popup d'affichage de la partie
function showFinPartiePopup() {
  title.textContent = "Fin de la partie";
  message.textContent = "La partie est terminée.";
  document.querySelector('.popup ul').style.display = 'none'; 
  closeButton.style.display = 'block';
  
  document.getElementById('popup').classList.add('open');
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
  document.querySelector('.popup ul').style.display = '';
}

// Fonction se déclanchant en cliquant sur un des joueurs lors de l'utilisation d'une carte action
function selectPlayer(player) {

  document.querySelector('.popup ul').style.display = 'none'; 

  switch (currentCardType) {
    case 'Garde':
        title.textContent = "Carte Garde utilisée";
        message.innerHTML += `
        <ul>
            <li><button onclick="compareCard(0)">Espionne </button></li>
            <li><button onclick="compareCard(2)">Prêtre</button></li>
            <li><button onclick="compareCard(3)">Baron</button></li>
            <li><button onclick="compareCard(4)">Servante</button></li>
            <li><button onclick="compareCard(5)">Prince</button></li>
            <li><button onclick="compareCard(6)">Chancelier</button></li>
            <li><button onclick="compareCard(7)">Roi</button></li>
            <li><button onclick="compareCard(8)">Comtesse</button></li>
            <li><button onclick="compareCard(9)">Princesse</button></li>
        </ul>
        `;
        break;
    case 'Pretre':
        title.textContent = "Carte Prêtre utilisée";
        message.textContent = `Vous avez choisi de voir la carte de ${player}`;
      break;
    case 'Baron':
        title.textContent = "Carte Baron utilisée";
        message.textContent = `Comparaison de votre carte et de la carte de ${player}`;
        break;
    case 'Prince':
        title.textContent = "Carte Prince utilisée";
        message.textContent = `Vous avez choisi de défausser la carte de ${player}`;
      break;
    case 'Roi':
        title.textContent = "Carte Roi utilisée";
        message.textContent = `Vous avez choisi d'échanger votre carte avec celle de ${player}`;
      break;
  }

  if(currentCardType != 'Garde'){
    closeButton.style.display = 'block'; 
  }
}

// Comparaison de l'utilisation de la carte Carte
function compareCard(number){
    if(number == 7){
        message.textContent = ` Vous avez bien deviné, le joueur est éliminé.`;
    }else{
        message.textContent = `Dommage ce n'était pas cette carte.`;
    }
    closeButton.style.display = 'block';
}
