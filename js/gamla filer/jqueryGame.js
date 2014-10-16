'use strict';
$(function () {
	var body = $('body'),
		h1 = $('<h1>'),
		playInfo = $('<div>'),
		playCards = $('<p>'),
		playPoints = $('<p>'),
		compInfo = $('<div>'),
		compCards = $('<p>'),
		compPoints = $('<p>'),
		result = $('<p>'),
		pLines = $('<p>');

	h1.text('*** ----- Black Jack ♡♢♠♣ ----- ***');
	body.append(h1);

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

	body.append(compInfo);

	compCards.text('Computer has:  ' + computerCards[0].name + ' and one unknown card\n');
	compInfo.append(compCards);

	pLines.text('***************************************\n***************************************');
	body.append(pLines);

	//Deal two cards to the player

	var playerPoints = 0;
	var playerCards = [];

	drawCard(playerCards);
	drawCard(playerCards);

	body.append(playInfo);

	playCards.text('You got these cards:  ' + playerCards[0].name + ', ' + playerCards[1].name);
	playInfo.append(playCards);
	playerPoints = playerCards[0].value + playerCards[1].value;
	playPoints.text('You have  ' + playerPoints + ' points');
	playInfo.append(playPoints);

	if (playerPoints === 22) {
		playerPoints = 12;
	}

	// BLACK JACK at start!?
	if (playerPoints === 21) {
		result.text(' !!! ***** BLACK JACK ***** !!!');
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

				playCards.text('Your cards are: \n');
				while (j < playerCards.length) {
					playCards.text(playCards.innerText + playerCards[j].name + ',  ');
					j++;
				}
				playPoints.text('You have  ' + playerPoints + ' points.');

				// BLACK JACK!
				if (playerPoints === 21) {
					result.text(' !!! ***** BLACK JACK ***** !!! ');
					break;
				}

				// 21 + Loser!
				if (playerPoints > 21) {
					result.text('  LOL. You lost. You have more than 21 points. LOOSER!  ');
					break;
				}
				j = 0;
			} else {

				// Computer card and points.
				compCards.text('Computer cards:  ' + computerCards[0].name + ',  ' + computerCards[1].name);
				compPoints.text('Computer has ' + computerPoints + ' points.');

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
					compCards.text('Computer drew some more cards and now has ' + computerCards.length + ' cards!');
					compCards.text(compCards.innerText + '\nComputer cards are: \n');
					for (i = 0; i < computerCards.length; i = i + 1) {
						compCards.text(compCards.innerText + computerCards[i].name + ',  ');
					}
				}

				//
				//Compare player's and computer's points.
				//
				if (computerPoints > playerPoints) {
					if (computerPoints === 21) {
						result.text('Computer has ***** BLACK JACK *****');
					} else {
						result.text(' Computer has won. Computer has ' + computerPoints + ' points. \n LOOSER.');
					}
				} else if (computerPoints < playerPoints) {
					result.text('  You have won. You have  ' + playerPoints + ' points. $$$$$ ');
				} else {
					if (computerPoints === 21 && playerPoints === 21) {
						result.text(' ***** OMG!!! We BOTH got BLACK JACK! But I am a computer, so I won! ^_^ ***** ');
					} else {
						result.text('  Draw. I bet I win the next time!');
					}
				}
				break;
			}
		}
	}
	body.append(result);
});