'use strict';
window.addEventListener('DOMContentLoaded', function () {
	var body = document.querySelector('body'),
		h1 = document.createElement('h1'),
		playInfo = document.createElement('div'),
		playCards = document.createElement('p'),
		playPoints = document.createElement('p'),
		compInfo = document.createElement('div'),
		compCards = document.createElement('p'),
		compPoints = document.createElement('p'),
		result = document.createElement('p'),
		pLines = document.createElement('p');

	h1.innerText = '*** ----- Black Jack ♡♢♠♣ ----- ***';
	body.appendChild(h1);

	//Gives two first cards to the computer.

	var computerCards = [];
	var computerPoints = 0;
	var cardsAmount = 51;

	function drawCard(deck) {
		var randomCard = Math.floor(Math.random() * cardsAmount);
		deck.push(cards[randomCard]);
		cards.splice(randomCard, 1);
		cardsAmount = cardsAmount - 1;
	}

	drawCard(computerCards);
	drawCard(computerCards);

	computerPoints = computerCards[0].value + computerCards[1].value;

	body.appendChild(compInfo);

	compCards.innerText = 'Computer has:  ' + computerCards[0].name + ' and one unknown card\n';
	compInfo.appendChild(compCards);

	pLines.innerText = '***************************************\n***************************************';
	body.appendChild(pLines);

	//Deal two cards to the player

	var playerPoints = 0;
	var playerCards = [];

	drawCard(playerCards);
	drawCard(playerCards);

	body.appendChild(playInfo);

	playCards.innerText = 'You got these cards:  ' + playerCards[0].name + ', ' + playerCards[1].name;
	playInfo.appendChild(playCards);
	playerPoints = playerCards[0].value + playerCards[1].value;
	playPoints.innerText = 'You have  ' + playerPoints + ' points';
	playInfo.appendChild(playPoints);

	if (playerPoints === 22) {
		playerPoints = 12;
	}

	// BLACK JACK at start!?
	if (playerPoints === 21) {
		result.innerText = ' !!! ***** BLACK JACK ***** !!!';
	} else {

		var i = 0;
		var j = 0;
		//
		//   Ask about more cards if it is necessary
		//
		while (playerPoints < 22) {
			var moreCards = prompt('Would you like to take more cards? \n Yes or No?');
			moreCards = moreCards.trim();
			moreCards = moreCards.toLowerCase();

			if (moreCards === 'yes') {
				drawCard(playerCards);
				playerPoints = playerPoints + playerCards[playerCards.length - 1].value;
				if (playerPoints > 21) {
					if (playerCards[playerCards.length - 1].value > 10) {
						playerCards[playerCards.length - 1].value = 1;
						playerPoints = playerPoints - 10;
					}
				}

				playCards.innerText = 'Your cards are: \n';
				while (j < playerCards.length) {
					playCards.innerText = playCards.innerText + playerCards[j].name + ',  ';
					j++;
				}
				playPoints.innerText = 'You have  ' + playerPoints + ' points.';

				// BLACK JACK!
				if (playerPoints === 21) {
					result.innerText = ' !!! ***** BLACK JACK ***** !!! ';
					break;
				}

				// 21 + Loser!
				if (playerPoints > 21) {
					result.innerText = '  LOL. You lost. You have more than 21 points. LOOSER!  ';
					break;
				}
				j = 0;
			} else {

				// Computer card and points.
				compCards.innerText = 'Computer cards:  ' + computerCards[0].name + ',  ' + computerCards[1].name;
				compPoints.innerText = 'Computer has ' + computerPoints + ' points.';

				// Check computers points and keep or pop card!
				do {
					drawCard(computerCards);
					computerPoints = computerPoints + computerCards[computerCards.length - 1].value;
					if (computerPoints > 21) {
						if (computerCards[computerCards.length - 1].value > 10) {
							computerCards[computerCards.length - 1].value = 1;
							computerPoints = computerPoints - 10;
						}
					}
				} while (computerPoints < 22);

				if (computerPoints > 21) {
					computerPoints = computerPoints - computerCards[computerCards.length - 1].value;
					computerCards.pop();
				}

				if (computerCards.length > 2) {
					compCards.innerText = 'Computer drew some more cards and now has ' + computerCards.length + ' cards!';
					compCards.innerText = compCards.innerText + '\nComputer cards are: \n';
					for (i = 0; i < computerCards.length; i = i + 1) {
						compCards.innerText = compCards.innerText + computerCards[i].name + ',  ';
					}
				}

				//
				//Compare player's and computer's points.
				//
				if (computerPoints > playerPoints) {
					if (computerPoints === 21) {
						result.innerText = 'Computer has ***** BLACK JACK *****';
					} else {
						result.innerText = ' Computer has won. Computer has ' + computerPoints + ' points. \n LOOSER.';
					}
				} else if (computerPoints < playerPoints) {
					result.innerText = '  You have won. You have  ' + playerPoints + ' points. $$$$$ ';
				} else {
					if (computerPoints === 21 && playerPoints === 21) {
						result.innerText = ' ***** OMG!!! We BOTH got BLACK JACK! But I am a computer, so I won! ^_^ ***** ';
					} else {
						result.innerText = '  Draw. I bet I win the next time!';
					}
				}
				break;
			}
		}
	}
	body.appendChild(result);
});