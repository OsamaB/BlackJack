'use strict';

var computerCards = [];
var computerPoints = 0;
var cardsAmount = 51;

function drawCard(deck) {
	var randomCard = Math.floor(Math.random() * cardsAmount);
	deck.push(cards[randomCard]);
	cards.splice(randomCard, 1);
	cardsAmount = cardsAmount - 1; //cardsAmount--;
}

drawCard(computerCards);
drawCard(computerCards);

computerPoints = computerCards[0].value + computerCards[1].value;

//Deal two cards to the player

var playerPoints = 0;
var playerCards = [];

drawCard(playerCards);
drawCard(playerCards);

var i = 0;
var j = 0;