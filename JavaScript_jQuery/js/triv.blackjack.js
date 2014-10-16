'use strict';

triv.blackjack = (function () {



	var computerCards = [];
	var computerPoints = 0;
	var cardsAmount = 51;

	function drawCard(deck) {
		var randomCard = Math.floor(Math.random() * cardsAmount);
		deck.push(triv.cards[randomCard]);
		triv.cards.splice(randomCard, 1);
		cardsAmount = cardsAmount - 1;
	}
	// Deal two cards to the computer.

	drawCard(computerCards);
	drawCard(computerCards);

	computerPoints = computerCards[0].value + computerCards[1].value;
	if (computerPoints === 22) {
		computerPoints = 12;
	}

	//Deal two cards to the player.

	var playerPoints = 0;
	var playerCards = [];

	drawCard(playerCards);
	drawCard(playerCards);

	playerPoints = playerCards[0].value + playerCards[1].value;
	if (playerPoints === 22) {
		playerPoints = 12;
	}

	$('#computer').append('<div class = "card ' + computerCards[0].name + '"></div>');
	$('#computer').append('<div class = "cardUN UN"></div>');


	$('#player').append('<div class = "card ' + playerCards[0].name + '"></div>');
	$('#player').append('<div class = "card ' + playerCards[1].name + '"></div>');


	$('#dialog').text('You have  ' + playerPoints + ' points. Would you like to take more cards? \n Get Card or Stop?');



	// BLACK JACK at start! ?

	if (computerPoints === 21 && playerPoints === 21) {
		$('#dialog').text('We BOTH got BLACK JACK! But I am a computer, so I won!  ^_^ ');
		$('.cardUN').hide();
		$('#computer').append('<div class = "card ' + computerCards[1].name + '"></div>');
		$('#moreCard').hide();
		$('#stop').hide();
	}



	if (playerPoints === 21) {
		$('#dialog').text('***** You have BLACK JACK ***** YOU WON!!! ');
		$('.cardUN').hide();
		$('#computer').append('<div class = "card ' + computerCards[1].name + '"></div>');
		$('#moreCard').hide();
		$('#stop').hide();
	}

	//Take more cards

	$('#moreCard').click(function () {
		drawCard(playerCards);
		playerPoints = playerPoints + playerCards[playerCards.length - 1].value;
		if (playerPoints > 21) {
			if (playerCards[playerCards.length - 1].value > 10) {
				playerCards[playerCards.length - 1].value = 1;
				playerPoints = playerPoints - 10;
			}
		}

		$('#dialog').text('You have  ' + playerPoints + ' points. Would you like to take more cards? \n Get Card or Stop?');

		if (computerPoints === 21 && playerPoints === 21) {
			$('#dialog').text('We BOTH got BLACK JACK! But I am a computer, so I won!  ^_^ ');
			$('#moreCard').hide();
			$('#stop').hide();
		}

		if (playerPoints === 21) {
			$('#dialog').text('***** BLACK JACK ***** YOU WON!!! ');
			$('.cardUN').hide();
			$('#computer').append('<div class = "card ' + computerCards[1].name + '"></div>');
			$('#moreCard').hide();
			$('#stop').hide();
		}



		if (playerPoints > 21) {
			$('#dialog').text('You LOST! You have: ' + playerPoints + ' points.');
			$('.cardUN').hide();
			$('#computer').append('<div class = "card ' + computerCards[1].name + '"></div>');
			$('#moreCard').hide();
			$('#stop').hide();
		}
		$('#player').append('<div class = "card ' + playerCards[playerCards.length - 1].name + '"></div>');
	});


	// If you push button 'Stop':
	$('#stop').click(function () {

		$('.cardUN').hide();
		$('#computer').append('<div class = "card ' + computerCards[1].name + '"></div>');

		do {
			drawCard(computerCards);
			computerPoints = computerPoints + computerCards[computerCards.length - 1].value;

			if (computerPoints > 21) {
				if (computerCards[computerCards.length - 1].value > 10) {
					computerCards[computerCards.length - 1].value = 1;
					computerPoints = computerPoints - 10;
				}
			} else {

				$('#computer').append('<div class = "card ' + computerCards[computerCards.length - 1].name + '"></div>');
			}
		} while (computerPoints < 22);



		if (computerPoints > 21) {
			computerPoints = computerPoints - computerCards[computerCards.length - 1].value;
			computerCards.pop();

		}
		//
		//Compare player's and computer's points.
		//
		if (computerPoints > playerPoints) {
			if (computerPoints === 21) {
				$('#dialog').text('You LOST! I have BLACK JACK!!! U-ha-hah.');
				$('#moreCard').hide();
				$('#stop').hide();

			} else {
				$('#dialog').text('You LOST! I have ' + computerPoints + ' points.You have ' +
					playerPoints + ' points. U-ha-hah. Mau! \n LOSER.');
				$('#moreCard').hide();
				$('#stop').hide();
			}
		}

		if (computerPoints < playerPoints) {
			$('#dialog').text(' Congratulations! You have WON! ');
			$('#moreCard').hide();
			$('#stop').hide();
		}

		if (computerPoints === playerPoints) {
			$('#dialog').text(' Draw! I bet I win the next time!');
			$('#moreCard').hide();
			$('#stop').hide();
		}

	});
}());