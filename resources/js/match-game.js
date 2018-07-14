var MatchGame = {};
var cardNumbers = [];
var flippedCards = [];
var matchedCards = [];
var winCondition = false;

// Extra Functions for MatchUp game
function myFunction() {
    cardNumbers.sort(function(a, b){return 0.5 - Math.random()});
}

function cardData(value, color, isFlipped)
{
  this.value = value;
  this.color = color;
  this.isFlipped = isFlipped;
}

function playAudio(option)
{
  if(option === 'btn')
  {
    var snd = new Audio("resources/audio/Click2.wav");
    snd.volume = 0.1;
  }
  else if (option === 'win') {
    var snd = new Audio("resources/audio/Short_win_sound.wav");
    snd.volume = 0.05;
  }

  snd.play();
}

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
  MatchGame.createButton();
});


/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {

  cardNumbers = [];

  for(var i = 1; i <= 8; i++)
  {
    cardNumbers.push(i);
    cardNumbers.push(i);
  }

  /*console.log("####### Sequential Array #######");

  for(var i =0; i < cardNumbers.length; i++)
  {
      console.log(cardNumbers[i]);
  }

  /*cardNumbers.sort(){return 0.5 - Math.random()});*/

  myFunction();

  /*console.log("########## Random Array #########");
  for(var i =0; i < cardNumbers.length; i++)
  {
      console.log(cardNumbers[i]);
  }*/

  return cardNumbers;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data(flippedCards);

  console.log("######### card Values #######");
  for (var i = 0; i < cardValues.length; i++)
  {
    var cardVal = cardValues[i];
    var color = colors[cardVal -1];
    var flipped = false;

    var newCardData = new cardData(cardVal, color, flipped);

    console.log(newCardData);

    console.log(cardValues[i]);

    var $card = $('<div class="card col-xs-3 col-sm-3 col-md-3 col-lg-"></div>');
    $card.data(newCardData);

    $game.append($card);
  }

    $('.card').click(function() {
      if(winCondition === false)
      {
        console.log("In the flipcard call to function");
        playAudio('btn');
        MatchGame.flipCard($(this), $('#game'));
      }
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  console.log($card);

  if($card.data('isFlipped') === true)
  {
    return;
  }

  $card.css('background-color', $card.data('color'))
    .text($card.data('value'))
    .data('isFlipped', true);

  flippedCards.push($card);

  console.log("Flipped Cards include:")
  for (var i = 0; i < flippedCards.length; i++)
  {
    console.log(flippedCards[i]);
  }

  if(flippedCards.length === 2)
  {
    if(flippedCards[0].data('value') === flippedCards[1].data('value'))
    {
      console.log("Card Values Match");

      for (var i = 0; i < flippedCards.length; i++)
      {
        var card = flippedCards[i];
        card.css('background-color', 'rgb(153, 153, 153)',
                        'color', 'rgb(204, 204, 204)');

        matchedCards.push(card);
      }
    }
    else
    {
      console.log("Card Values DO NOT Match");
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function()
      {
        card1.css('background-color', 'rgb(32, 64, 86)')
          .text('')
          .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
          .text('')
          .data('isFlipped', false);
      }, 300);
    }

    flippedCards = [];
    MatchGame.checkWin();
  }

};

MatchGame.checkWin = function()
{
  if(cardNumbers.length === matchedCards.length)
  {
    console.log("Game Over");
    for(var i = 0; i < matchedCards.length; i++)
    {
      console.log("Value is :", matchedCards[i].data('value'));
    }
    winCondition = true;
    playAudio('win');
  }
  else {
    {
      console.log("Game NOT Over");
    }
  }
};

MatchGame.createButton = function()
{
  // Button Creation
  var btn = document.createElement("BUTTON");
  var buttonText = document.createTextNode("Restart Game");
  btn.appendChild(buttonText);
  document.body.appendChild(btn);

  // Position the BUTTON
  var body = document.getElementsByTagName("rules")[0];
  rules.appendChild(btn);

  btn.addEventListener ("click", function()
  {
    window.setTimeout(function()
    {
      window.location.reload(true);
    }, 300);
    playAudio('btn');

    //MatchGame.restartGame();
  });
};
