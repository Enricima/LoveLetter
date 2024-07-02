// Sélection des éléments images des cartes
const espionne = document.getElementById('espionne');
const garde = document.getElementById('garde');
const pretre = document.getElementById('pretre');
const baron = document.getElementById('baron');
const servante = document.getElementById('servante');
const prince = document.getElementById('prince');
const chancelier = document.getElementById('chancelier');
const roi = document.getElementById('roi');
const comtesse = document.getElementById('comtesse');
const princesse = document.getElementById('princesse');

// Sélection des éléments du popup
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const pointCarte = document.getElementById('point-carte');
const actionCarte = document.getElementById('action-carte');
const closeButton = document.getElementById('close-btn');

// Ajout des écouteurs d'événements clic sur chaque image de carte
espionne.addEventListener('click', () => {
  showPopup('Espionne', '0 point', 'Rien ne se passe. Par contre, si vous êtes en vie à la fin de la manche et que vous êtes le seul à avoir cette carte devant vous, vous marquerez un point.');
});

garde.addEventListener('click', () => {
  showPopup('Garde', '1 points', 'Vous désignez un adversaire autour de la table et essayez de deviner sa carte. Vous pouvez citer n’importe quelle carte sauf le garde (un garde ne peut pas tuer un autre garde). Si vous la trouvez, il est mort et doit attendre la manche suivante pour rejouer. On joue ici sur la confiance, et la personne ciblée dira sans mentir si elle est morte ou non, mais celui qui a posé le garde ne verra pas la carte.');
});

pretre.addEventListener('click', () => {
  showPopup('Prêtre', '2 points', 'Vous pouvez regarder la carte d\'un autre joueur.');
});

baron.addEventListener('click', () => {
  showPopup('Baron', '3 points', 'Vous prenez la carte d’un joueur et vous la regardez. Si cette carte est plus petite que la vôtre, le joueur choisi meurt. Si elle est plus haute, c’est vous qui mourez. En cas d’égalité, rien ne se passe.');
});

servante.addEventListener('click', () => {
  showPopup('Servante', '4 points', 'Jusqu’à votre prochain tour, personne ne peut vous cibler. Vos adversaires ne pourront pas vous choisir s’ils jouent un garde, un prêtre, un baron, un prince ou un roi.');
});

prince.addEventListener('click', () => {
  showPopup('Prince', '5 points', 'Choisissez un joueur (vous compris). Il doit défausser sa carte et en poser une nouvelle. Attention ici, la carte qui doit être jetée du fait du Prince sera révélée à tout le monde, mais son effet ne s’appliquera pas. Il ne se passera rien de particulier pour celui qui jette la carte sauf si c’est la Princesse (voir ci-après). Notons aussi que si vous jouez le Prince sur le dernier tour, il n’y a plus de cartes à prendre dans la pioche ; vous prendrez alors la carte qui a été mise de côté au départ.');
});

chancelier.addEventListener('click', () => {
  showPopup('Chancelier', '6 points', 'Vous piochez deux cartes (vous en avez alors 3 en main) puis vous en gardez une, et vous mettez les deux autres à la fin de la pioche dans l’ordre de votre choix. S’il n’y a qu’une seule carte dans la pioche quand vous jouez le chancelier, alors vous pouvez faire la manipulation, mais en prenant une seule carte et en remettant celle que vous voulez parmi les deux que vous avez dans la pioche.');
});

roi.addEventListener('click', () => {
  showPopup('Roi', '7 points', 'Vous devez échanger votre carte avec celle d\'un autre joueur.');
});

comtesse.addEventListener('click', () => {
  showPopup('Comtesse', '8 points', 'Si vous avez le Prince ou le Roi avec la Comtesse, vous êtes obligé(e) de jouer la Comtesse. Ici encore, pas de triche possible. A l’image du Baron, c’est à vous d’être attentif et de jouer le jeu. Si vous avez Comtesse + Prince, alors vous ne pouvez pas jouer votre Prince. Idem avec le Roi. Notez cependant que rien ne vous empêche de jouer votre Comtesse si vous avez une autre carte. C’est un des bluffs possibles, les autres joueurs ne savent pas si vous la jouez par choix ou par obligation.');
});

princesse.addEventListener('click', () => {
  showPopup('Princesse', '9 points', 'Si vous jouez ou défaussez la princesse, vous êtes éliminé(e). Notons que si vous devez jeter la princesse parce que quelqu’un joue le Prince contre vous, alors vous êtes éliminé(e).');
});

// Fonction pour afficher le popup avec les détails de la carte sélectionnée
function showPopup(carte, points, action) {
  popupTitle.textContent = `Détails de la carte ${carte}`;
  pointCarte.textContent = `Points : ${points}`;
  actionCarte.textContent = `Action : ${action}`;
  closeButton.style.display = 'block'; // Affiche le bouton "Fermer"
  popup.classList.add('open'); // Ajoute la classe pour afficher le popup
}

// Fonction pour fermer le popup
function closePopup() {
  popup.classList.remove('open'); // Retire la classe pour cacher le popup
}
