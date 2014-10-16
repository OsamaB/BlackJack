'use strict';

console.log('***-------Black Jack ♡♢♠♣-------***');

//Gives two first cards to the computer.

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

console.log('Computer got these cards:  ' + computerCards[0].name + ' + one unknown card');

console.log('***************************************');

//Deal two cards to the player

var playerPoints = 0;
var playerCards = [];

drawCard(playerCards);
drawCard(playerCards);

console.log('You got these cards:  ' + playerCards[0].name + ', ' + playerCards[1].name);
playerPoints = playerCards[0].value + playerCards[1].value;
console.log('You have  ' + playerPoints + ' points');
if (playerPoints === 21) {
	console.log('!!!*****BLACK JACK****!!!');
}
console.log('***************************************');
console.log('***************************************');

var i = 0;
var j = 0;
//
//   Ask about more cards if it is necessary
//
while (playerPoints < 21) {
	var moreCards = prompt('Would you like to take more cards? \n Yes or No?');
	moreCards = moreCards.trim();
	moreCards = moreCards.toLowerCase();

	if (moreCards === 'yes') {
		drawCard(playerCards);
		playerPoints = playerPoints + playerCards[playerCards.length - 1].value;
		console.log('Your cards are:');
		while (j < playerCards.length) {
			console.log(playerCards[j].name);
			j++;
		}
		console.log('You have  ' + playerPoints + ' points.');
		if (playerPoints === 21) {
			console.log('!!!*****BLACK JACK****!!!');
		}
		console.log('***************************************');
		console.log('***************************************');
		if (playerPoints > 21) {
			console.log('  Lol. You lost. You have more than 21 points. LOOSER!  ');
			break;
		}
		j = 0;
	} else {

		// Computer card and points.
		console.log('Computer cards:  ' + computerCards[0].name + ', ' + computerCards[1].name);
		console.log('Computer has ' + computerPoints + ' points.');

		if (computerPoints < 21) {
			while (computerPoints < 21) {
				drawCard(computerCards);

				computerPoints = computerPoints + computerCards[computerCards.length - 1].value;
				if (computerPoints > 21) {
					computerPoints = computerPoints - computerCards[computerCards.length - 1].value;
					computerCards.pop();
					break;
				}
			}
		}
		i = 0;
		while (i < computerCards.length) {
			console.log('Computer cards are: ' + computerCards[i].name);
			i++;
		}
		//
		//Compare player's and computer's points.
		//
		if (computerPoints > playerPoints) {
			console.log(' Computer has won. Computer has ' + computerPoints + ' points. \n LOOSER.');
		} else if (computerPoints < playerPoints) {
			console.log('  You have won. You have  ' + playerPoints + ' points. $$$$$ ');
		} else {
			console.log('  Draw. I bet I win the next time!');
		}
		break;
	}
}
console.log('***************************************');
console.log('***************************************');