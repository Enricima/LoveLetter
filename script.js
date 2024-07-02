document.addEventListener("DOMContentLoaded", () => {
    const drawPile = document.getElementById('draw-pile');
    const discardPile = document.getElementById('discard-pile');

    drawPile.addEventListener('click', () => {
        // Logique pour piocher une carte
        alert('Vous avez pioché une carte !');
    });

    discardPile.addEventListener('click', () => {
        // Logique pour défausser une carte
        alert('Vous avez défaussé une carte !');
    });
});
