'use strict';
$(function () {
	var body = $('body'),
		h3 = $('<h3>'),
		playInfo = $('<div>'),
		playCards = $('<div id="player-cards"></div>'),
		playPoints = $('<p>'),
		emptySpace = $('<div id="empty-space"></div>'),
		compInfo = $('<div>'),
		compCards = $('<div id="computer-cards"></div>'),
		dealer = $('<div id="dealer"></div>'),
		status = $('<div id="status"></div>'),
		table = $('<div id="table"></div>'),
		newGame = $('<button class="button" id="newGame">New Game</button>'),
		moreCards = $('<button class="button" id="moreCards">Get Card</button>'),
		stop = $('<button class="button" id="stop">Stop</button>');


	////////////////////////////////////////
	// Gives two first cards to the computer.

	var computerCards = [];
	var computerPoints = 0;
	var cardsAmount = 52;

	function drawCard(deck) {
		var randomCard = Math.floor(Math.random() * cardsAmount);
		deck.push(cards[randomCard]);
		cards.splice(randomCard, 1);
		cardsAmount = cardsAmount - 1;
	}

	drawCard(computerCards);
	drawCard(computerCards);

	computerPoints = computerCards[0].value + computerCards[1].value;
	if (computerPoints === 22) {
		computerPoints = 12;
	}


	///////////////////////////////////////
	// Append/Create the styles of the game

	h3.text('-=:[ Welcome to the Blackest Jack ♡♢♠♣ ]:=-');

	body.append(h3);
	body.append(dealer);
	body.append(status);
	body.append(table);
	body.append(newGame);
	body.append(moreCards);
	body.append(stop);
	status.append(compInfo);
	table.append(compCards);
	table.append(emptySpace);
	status.append(playInfo);
	table.append(playCards);


	///////////////////////////////////////////////////////////
	//Deals two cards to the player and calculates their values

	var playerPoints = 0;
	var playerCards = [];

	drawCard(playerCards);
	drawCard(playerCards);

	playerPoints = playerCards[0].value + playerCards[1].value;
	if (playerPoints === 22) {
		playerPoints = 12;
	}

	playInfo.text('You have  ' + playerPoints + ' points');
	playInfo.append(playPoints);


	//////////////////////////////////////////
	// Show the cards graphically on the table

	compCards.append('<div class = "card ' + computerCards[0].name + '"></div>');
	compCards.append('<div class = "card back"></div>');


	playCards.append('<div class = "card ' + playerCards[0].name + '"></div>');
	playCards.append('<div class = "card ' + playerCards[1].name + '"></div>');


	playInfo.text('You have  ' + playerPoints + ' points. Would you like to take more cards? \n Get Card or Stop?');


	////////////////////////
	// BLACK JACK at start!?

	if (computerPoints === 21 && playerPoints === 21) {
		status.text('We BOTH got BLACK JACK! But I am a computer, so I won!  ^_^ ');
		$('.back').hide();
		compCards.append('<div class = "card ' + computerCards[1].name + '"></div>');
		moreCards.hide();
		stop.hide();
	}

	if (playerPoints === 21) {
		status.text('***** You have BLACK JACK ***** YOU WON!!! ');
		$('.back').hide();
		compCards.append('<div class = "card ' + computerCards[1].name + '"></div>');
		moreCards.hide();
		stop.hide();
	}


	//////////////////////////////////////
	// Results of clicking on "More cards"

	moreCards.click(function () {
		drawCard(playerCards);
		playerPoints = playerPoints + playerCards[playerCards.length - 1].value;
		if (playerPoints > 21) {
			if (playerCards[playerCards.length - 1].value > 10) {
				playerCards[playerCards.length - 1].value = 1;
				playerPoints = playerPoints - 10;
			}
		}

		playInfo.text('You have  ' + playerPoints + ' points. Would you like to take more cards? \n Get Card or Stop?');

		if (computerPoints === 21 && playerPoints === 21) {
			status.text('We BOTH got BLACK JACK! But I am a computer, so I won!  ^_^ ');
			moreCards.hide();
			stop.hide();
		}

		if (playerPoints === 21) {
			status.text('*** BLACK JACK *** YOU WON!!! ');
			$('.back').hide();
			compCards.append('<div class = "card ' + computerCards[1].name + '"></div>');
			moreCards.hide();
			stop.hide();
		}



		if (playerPoints > 21) {
			status.text('You LOST! You have ' + playerPoints + ' points.');
			$('.back').hide();
			compCards.append('<div class = "card ' + computerCards[1].name + '"></div>');
			moreCards.hide();
			stop.hide();
		}
		playCards.append('<div class = "card ' + playerCards[playerCards.length - 1].name + '"></div>');
	});


	//////////////////////////
	// When clicking on "Stop"

	stop.click(function () {

		$('.back').hide();
		compCards.append('<div class = "card ' + computerCards[1].name + '"></div>');

		do {
			drawCard(computerCards);
			computerPoints = computerPoints + computerCards[computerCards.length - 1].value;

			if (computerPoints > 21) {
				if (computerCards[computerCards.length - 1].value > 10) {
					computerCards[computerCards.length - 1].value = 1;
					computerPoints = computerPoints - 10;
				}
			} else {

				compCards.append('<div class = "card ' + computerCards[computerCards.length - 1].name + '"></div>');
			}
		} while (computerPoints < 22);



		if (computerPoints > 21) {
			computerPoints = computerPoints - computerCards[computerCards.length - 1].value;
			computerCards.pop();

		}


		///////////////////////////////////////////////////////////////////
		// Compare player's and computer's points, and print out the status

		if (computerPoints > playerPoints) {
			if (computerPoints === 21) {
				status.text('You LOST! I got *** BLACK JACK ***');
				moreCards.hide();
				stop.hide();

			} else {
				status.text('You LOST! I have ' + computerPoints + ' points. You have ' +
					playerPoints + ' points.');
				moreCards.hide();
				stop.hide();
			}
		}

		if (computerPoints < playerPoints) {
			status.text(' Congratulations! You have WON! ');
			moreCards.hide();
			stop.hide();
		}

		if (computerPoints === playerPoints) {
			status.text(' Draw! I bet I win the next time!');
			moreCards.hide();
			stop.hide();
		}
	});
	newGame.click(function () {
		location.reload();
	});

});