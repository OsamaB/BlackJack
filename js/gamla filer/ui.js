'use strict';

console.log('***-------Black Jack ♡♢♠♣-------***');

//Gives two first cards to the computer.

console.log('Computer got these cards:  ' + computerCards[0].name + ' + one unknown card');

console.log('***************************************');

console.log('You got these cards:  ' + playerCards[0].name + ', ' + playerCards[1].name);
playerPoints = playerCards[0].value + playerCards[1].value;
console.log('You have  ' + playerPoints + ' points');
console.log('***************************************');
console.log('***************************************');

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
			//	break;
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
					computerCards = computerCards.pop();
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