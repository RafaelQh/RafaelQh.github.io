let player = {
    name: "Per",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }

}



function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame();
    showImage();
}

function renderGame() {
    cardsEl.textContent = "Cartas: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Suma: " + sum
    if (sum <= 20) {
        message = "Quieres una nueva carta?"
    } else if (sum === 21) {
        message = "Tienes Blackjack!"
        hasBlackJack = true
    } else {
        message = "Perdiste el juego!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function showImage(){
    var images = ["images/2_of_clubs.png"];
    const newDiv = document.createElement("div");
    const img=  document.createElement("img");
    newDiv.appendChild(img);
    img.src= images[0];
}





 