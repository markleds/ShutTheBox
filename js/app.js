// "use strict";

$(document).ready(function() {
  // Useful variables
  var $numDiv = $(".col-1");
  var $rollDiceButton = $("#roll-dice");
  var $recordDiceRolls = $(".record-dice-rolls");

  // Start of game constant for the sum of selected numbers on Number Line
  var sumSelectedNumbers = 0;

  // Dice background image classes array
  var diceImageClasses = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5",
    "dice-6"
  ];
  var $dice1 = $("#dice-1");
  var $dice2 = $("#dice-2");
  // 2 variables to hold the index number for the dye backgroud image class
  var dice1Index;
  var dice2Index;

  // variable to hold the sum of the dice for comparison to players selections on Nmber Line - updated on every roll of the dice.
  var diceSum = 0;
  // variable to keep track of the number of times the user rolls the dice in each game
  var diceRolls = 0;
  // Variable for the fewest rolls of the dice to win the game
  var recordDiceRolls = 0;
  // Number of games played
  var gamesPlayed = 0;
  var gamesWon = 0;

  // functions to give you a number between and including 0 & 5 for the index of dice background image classs in the array diceImageClasses
  var dice1Bkgnd;
  var dice2Bkgnd;
  var getDice1Bkgnd = function() {
    dice1Index = Math.floor(Math.random() * 5);
    dice1Bkgnd = diceImageClasses[dice1Index];
    console.log(dice1Bkgnd);
  };
  var getDice2Bkgnd = function() {
    dice2Index = Math.floor(Math.random() * 5);
    dice2Bkgnd = diceImageClasses[dice2Index];
    console.log(dice2Bkgnd);
  };

  // Popup Event listeners & functionality
  var $letsPlay = $("#lets-play");
  var $closePopup = $(".close-popup");
  var $howToPlay = $("#instructions");
  var $incorrectPlay = $("#incorrect-play");
  var $howToWindow = $("#how-to-popup");
  var $popupCover = $(".popup-cover");
  var $backToGame = $("#back-to-game");
  // Event Listener to display Popup
  $howToPlay.on("click", function() {
    $popupCover.fadeIn(1000);
    $howToWindow.fadeIn(1000);
  });
  // Event Listener to hide popup
  $letsPlay.on("click", function() {
    $popupCover.fadeOut(1000);
    $howToWindow.fadeOut(1000);
  });
  $closePopup.on("click", function() {
    $popupCover.fadeOut(1000);
    $howToWindow.fadeOut(1000);
    $incorrectPlay.fadeOut(1000);
  });

  var incorrectPopup = function() {
    $popupCover.fadeIn(1000);
    $incorrectPlay.fadeIn(1000);
  };
  $backToGame.on("click", function() {
    $popupCover.fadeOut(1000);
    $incorrectPlay.fadeOut(1000);
  });

  // function to black out numbers that have already been played successfully
  var playedNumbers = function() {
    $(".selected").addClass("played");
    $(".selected").text("");
    $numDiv.removeClass("selected");
  };

  var diceRollCount = function() {
    diceRolls++;
    $(".current-dice-rolls").text(diceRolls);
  };
  var rollTheDice = function() {

    // remove dice background class
    $dice1.removeClass(dice1Bkgnd);
    $dice2.removeClass(dice2Bkgnd);

    // update dice1Bkgnd & dice2Bkgnd
    getDice1Bkgnd();
    getDice2Bkgnd();

    // update variable diceSum with new sum of rolled dice
    diceSum = (dice1Index + 1) + (dice2Index + 1);
    console.log(diceSum);
    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);

    diceRollCount();
  };

  // Function that toggles the class "selected" on the numbers when clicked on
  $numDiv.on("click", function() {
    $(this).toggleClass("selected");
  });


  // Event listener on Roll Dice button
  $rollDiceButton.on("click", function() {
    // COMPARE sum of dice to sum of selected numbers; if sum of selected numbers = 0 then roll the dice; if sum of selected numbers != sum of dice then alert; if sum of selected numbers = sume of dice then roll the dice and clear the selected numbers from Number Line - add class "played"
    var selectedNumbersArray = document.querySelectorAll(
      ".selected");
    for (let i = 0; i < selectedNumbersArray.length; i++) {
      sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
    }
    console.log(sumSelectedNumbers);
    console.log(diceSum);
    if (sumSelectedNumbers === 0) {
      rollTheDice();
    } else if (sumSelectedNumbers !== diceSum) {
      incorrectPopup();
      $numDiv.removeClass("selected");
    } else {
      playedNumbers();
      rollTheDice();
    }
  });

  //

  // Update record dice rolls with current number
  var compareDiceRolls = function() {
    if (recordDiceRolls === 0) {
      recordDiceRolls = diceRolls;
      $recordDiceRolls.text(recordDiceRolls);
    } else if (recordDiceRolls < diceRolls) {
      $recordDiceRolls.text(diceRolls);
    } else {
      return;
    }
  };


  // Play again
  var $playAgainButton = $("#play-again");
  $playAgainButton.on("click", function() {
    compareDiceRolls();
    $numDiv.removeClass("selected played");
    setNumbers();
    diceRolls = 0;
    diceRollCount();
    gamesPlayed++;
    $(".games-played").text(gamesPlayed);
  });

  // function to set the numbers on the board
  var setNumbers = function() {
    for (let i = 1; i <= 10; i++) {
      $(`#num-${i}`).text(i);
    }
    // remove dice background class
    $dice1.removeClass(dice1Bkgnd);
    $dice2.removeClass(dice2Bkgnd);

    // update dice1Bkgnd & dice2Bkgnd
    getDice1Bkgnd();
    getDice2Bkgnd();

    // update variable diceSum with new sum of rolled dice
    diceSum = (dice1Index + 1) + (dice2Index + 1);
    console.log(
      diceSum);
    // console.log(diceSum);
    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);
    diceRolls = 0;
    diceRollCount();
  };
  setNumbers();


});
