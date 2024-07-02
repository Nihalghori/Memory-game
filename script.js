const cards = document.querySelectorAll('.memory-card');
const modal = document.getElementById('win-modal');
const closeButton = document.querySelector('.close-button');
const restartButton = document.getElementById('restartButton');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matches++;

    if (matches === cards.length / 2) {
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function closeModal() {
    modal.style.display = 'none';
    startGame();
}

function startGame() {
    matches = 0;
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

closeButton.addEventListener('click', closeModal);
restartButton.addEventListener('click', closeModal);
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

