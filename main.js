// juego1

function getRandomNumber() {
  var randomNumber = Math.random ()*100;
  var roundRandomNumber = Math.floor(randomNumber);
  return roundRandomNumber;
}
var winNumber = getRandomNumber();
var inputElement = document.getElementById('input1');
var buttonElement = document.getElementById('buttonCheck');
var feedbackElement = document.getElementById('feedback');
var attempsElement = document.getElementById ('attempts');

function showFeedback() {
  var userNumber = inputElement.value;
  feedbackElement.innerHTML = gamerFeedback();
}

if (buttonElement) {
  buttonElement.addEventListener ('click', showFeedback);
}

var attemptsPoints = 0;
var maxAttempts = 8;

function gamerFeedback() {
  var userNumber = inputElement.value;
  attemptsPoints = attemptsPoints + 1;
  var returnString = '';

 if (winNumber > userNumber) {
    returnString = 'Frío, frío...te has quedado corto. Tienes 8 intentos y llevas un número de intentos de...';
    if (attemptsPoints >= maxAttempts) {
      returnString = 'Ya no hay más intentos. Empieza de nuevo';
      disableButtonsGame1();
    }

 }else if (userNumber >= 100) {
    returnString = 'Recuerda...sólo números menores a 100. Tienes 8 intentos y llevas un número de intentos de...';
    if (attemptsPoints >= maxAttempts) {
      returnString = 'Ya no hay más intentos. Empieza de nuevo';
      disableButtonsGame1();
    }

 } else if (winNumber < userNumber) {
    returnString = 'Pero a dónde vas!! Te has pasado...tienes 8 intentos y llevas un número de intentos de...';
    if (attemptsPoints >= maxAttempts) {
      returnString = 'Ya no hay más intentos. Empieza de nuevo';
      disableButtonsGame1();
    }

 }else {
    returnString = 'Eres un campe@n!!';
    disableButtonsGame1();
  }
  attempsElement.innerHTML = attemptsPoints;
  return returnString;
}

function disableButtonsGame1() {
  document.getElementById("buttonCheck").disabled = true;

}


// juego 2


function randomPos(cards) {
  return Math.floor(Math.random()*cards.length);
}

function swapCards(cards) {
  var pos1 = randomPos(cards);
  var pos2 = randomPos(cards);
  var temp = cards[pos1];
  cards[pos1] = cards[pos2];
  cards[pos2] = temp;
}

function shuffle(cards) {
  for (var i = 0; i < 100; i++) {
      swapCards(cards);
  }
}

//Genera mazos de la forma [{palo: "t", valor: 2}, {palo: "p", valor: 12}...]
//donde los palos son: t = trevol, p = picas, d = diamantes y c = corazones
//y los valores van de 1 (as) a 13 (rey)
function generateDeck() {
  var stick = ["t", "p", "d", "c"];
  var maxValue = 13;
  var deck = [];
  for (var p = 0; p < stick.length; p++) {
    for (var v = 1; v <= maxValue; v++) {
      deck[deck.length] = {stick: stick[p], value: v};
    }
  }
  return deck;
}

function cardToString(card) {
  return card.value + card.stick;
}

function cardsToString(cards) {
  var result = "";
  for (var i = 0; i < cards.length; i++) {
    result += cardToString(cards[i]);
  }
  return result;
}

var deck = generateDeck();
shuffle(deck);
var playersCards = [];
var punctuation = 0;

var giveMeCardElement = document.getElementById("giveCardBut");
giveMeCardElement.addEventListener('click', giveCard);
var standElement = document.getElementById("standBut");
standElement.addEventListener('click', stand);
var cardsContainer = document.getElementById("cards-container");
var punctuationDisplay = document.getElementById("punctuationDisplay");
var gameOverElement = document.getElementById('gameOver')
var paragraphStandElement = document.getElementById('stand')
function cardPunctuation(cardPoints) {
  if (cardPoints.value <= 10) {
    return cardPoints.value;
  } else {
    return 11;
  }
}

function giveCard() {
  var chosenCard = deck.splice(0, 1)[0];
  displayChosenCard(chosenCard);

  punctuation = punctuation + cardPunctuation(chosenCard);
  displayPunctuation();
  if (punctuation > 21) {
    higherThan21();
  }
}

function croupierPunctuation() {
  return 11 + Math.floor(Math.random() * (24 + 1 - 11));
}

function stand() {
  var croupierPunt = croupierPunctuation();
  if (punctuation <= 21) {
      if (croupierPunt > 21) {
        playerWins(croupierPunt);
      } else if (punctuation > croupierPunt) {
        playerWins(croupierPunt);
      } else {
        croupierWins(croupierPunt);
      }
    } else { //puntuacion > 21
      if (croupierPunt > 21) {
        bothLose(croupierPunt);
      } else {
        croupierWins(croupierPunt);
      }
    }
 }
 function bothLose(croupierPunt) {
   paragraphStandElement.innerHTML = ("Ambos jugadores pierden (" + punctuation +" vs " + croupierPunt + ")");
   disableButtonsGame2();
 }
function playerWins(croupierPunt) {
  paragraphStandElement.innerHTML = ("El jugador gana (" + punctuation +" vs " + croupierPunt + ")");
  disableButtonsGame2();
}

function croupierWins(croupierPunt) {
  paragraphStandElement.innerHTML = ("El jugador pierde (" + punctuation +" vs " + croupierPunt + ")");
  disableButtonsGame2();
}

function higherThan21() {
  gameOverElement.innerHTML = ("GAME OVER.El jugador se ha pasado (puntuacion = " + punctuation + ")");
  disableButtonsGame2();
}

function displayChosenCard(chosenCard) {
  cardsContainer.innerHTML += "<img class='cardsPictures' src=\"image/"
    + cardToString(chosenCard) + ".png\"/>";
}

function displayPunctuation() {
  punctuationDisplay.innerHTML = ("La puntuación actual del jugador es " + punctuation);
}

function disableButtonsGame2() {
  document.getElementById("giveCardBut").disabled = true;
  document.getElementById("standBut").disabled = true;

}
