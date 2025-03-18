const gameBoard = document.getElementById("gameBoard");
const movesCounter = document.getElementById("moves");

const countries = [
    { name: "México", flag: "imagenes/mx.png" },
    { name: "Francia", flag: "imagenes/fr.png" },
    { name: "Alemania", flag: "imagenes/de.png" },
    { name: "Japón", flag: "imagenes/jp.png" },
    { name: "Brasil", flag: "imagenes/br.png" },
    { name: "Italia", flag: "imagenes/it.png" },
    { name: "Argentina", flag: "imagenes/ar.png" },
    { name: "Chile", flag: "imagenes/cl.png" },
    { name: "Colombia", flag: "imagenes/co.png" },
    { name: "Venezuela", flag: "imagenes/ve.png" },
    { name: "Estados Unidos", flag: "imagenes/us.png" },
    { name: "China", flag: "imagenes/cn.png" },
    { name: "Canadá", flag: "imagenes/ca.png" },
    { name: "Rusia", flag: "imagenes/ru.png" },
    { name: "España", flag: "imagenes/es.png" },
    { name: "Australia", flag: "imagenes/au.png" },


];

let cards = [];
let flippedCards = [];
let moves = 0;

function startGame() {
    gameBoard.innerHTML = "";
    moves = 0;
    movesCounter.textContent = moves;
    flippedCards = [];
    generateCards();
    shuffleCards();
    renderCards();
}

function generateCards() {
    cards = countries.flatMap(country => [
        { type: "flag", content: country.flag, pair: country.name },
        { type: "name", content: country.name, pair: country.flag }
    ]);
}

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function renderCards() {
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.index = index;

        if (card.type === "flag") {
            const img = document.createElement("img");
            img.src = card.content;
            img.classList.add("card-content");
            cardElement.appendChild(img);
        } else {
            const text = document.createElement("span");
            text.textContent = card.content;
            text.classList.add("card-content");
            cardElement.appendChild(text);
        }

        cardElement.addEventListener("click", () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(cardElement) {
    const cardIndex = cardElement.dataset.index;
    const card = cards[cardIndex];

    if (flippedCards.length < 2 && !cardElement.classList.contains("flipped")) {
        cardElement.classList.add("flipped");
        flippedCards.push({ element: cardElement, card });

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moves++;
    movesCounter.textContent = moves;

    const [firstCard, secondCard] = flippedCards;

    if (firstCard.card.pair === secondCard.card.content || 
        firstCard.card.content === secondCard.card.pair) {
        setTimeout(() => {
            firstCard.element.classList.add("hidden");
            secondCard.element.classList.add("hidden");
            flippedCards = [];
            checkWin();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.element.classList.remove("flipped");
            secondCard.element.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
    const remainingCards = document.querySelectorAll(".card:not(.hidden)");
    if (remainingCards.length === 0) {
        setTimeout(() => {
            alert(`¡Felicidades! Terminaste en ${moves} movimientos.`);
            startGame(); 
        }, 200);
    }
}


function exitGame() {
    window.location.href = "index.html";  
}

startGame();
