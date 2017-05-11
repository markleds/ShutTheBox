// "use strict";

$(document).ready(function() {
  // Useful variables
  var $numDiv = $(".col-1");
  var numbersPlayed = [];
  var $rollDiceButton = $("#roll-dice");
  var $recordDiceRolls = $(".record-dice-rolls");
  var $num1 = $("#num-1");
  var $num2 = $("#num-2");
  var $num3 = $("#num-3");
  var $num4 = $("#num-4");
  var $num5 = $("#num-5");
  var $num6 = $("#num-6");
  var $num7 = $("#num-7");
  var $num8 = $("#num-8");
  var $num9 = $("#num-9");
  var $num10 = $("#num-10");

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
  var $gamesPlayed = $(".games-played");
  var $gamesWon = $(".games-won");

  // functions to give you a number between and including 0 & 5 for the index of dice background image classs in the array diceImageClasses
  var dice1Bkgnd;
  var dice2Bkgnd;
  var getDice1Bkgnd = function() {
    dice1Index = Math.floor(Math.random() * 5);
    dice1Bkgnd = diceImageClasses[dice1Index];
    // console.log(dice1Bkgnd);
  };
  var getDice2Bkgnd = function() {
    dice2Index = Math.floor(Math.random() * 5);
    dice2Bkgnd = diceImageClasses[dice2Index];
    // console.log(dice2Bkgnd);
  };

  // Popup Event listeners & functionality
  var $letsPlay = $("#lets-play");
  var $closePopup = $(".close-popup");
  var $closeWinPopup = $(".close-win-popup");
  var $howToPlay = $("#instructions");
  var $incorrectPlay = $("#incorrect-play");
  var $howToWindow = $("#how-to-popup");
  var $popupCover = $(".popup-cover");
  var $winCover = $(".win-cover");
  var $winPopup = $("#win-popup");
  var $backToGame = $("#back-to-game");
  var $playAgain = $("#play-again");
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
  // function to display a popup when the incorrect numbers are selected
  var incorrectPopup = function() {
    $popupCover.fadeIn(1000);
    $incorrectPlay.fadeIn(1000);
  };
  $backToGame.on("click", function() {
    $popupCover.fadeOut(1000);
    $incorrectPlay.fadeOut(1000);
  });
  // Popup window that displays if you win the game
  var winGamePopup = function() {
    $winCover.fadeIn(1000);
    $winPopup.fadeIn(1000);
  };
  // function to close win popup window and re-set game
  var closeWinPopup = function() {
    $winCover.fadeOut(1000);
    $winPopup.fadeOut(1000);
    setNumbers();
    numbersPlayed = [];
    sumSelectedNumbers = 0;
  };
  $closeWinPopup.on("click", function() {
    closeWinPopup();
  });
  $playAgain.on("click", function() {
    closeWinPopup();
  });

  // Function that checks to see if you have won the game
  var winGame = function() {
    if (numbersPlayed.length === 10) {
      winGamePopup();
      gamesWon++;
      $gamesWon.text(gamesWon);
      gamesPlayed++;
      $gamesPlayed.text(gamesPlayed);
      $numDiv.removeClass("selected played");
    } else {
      return;
    }
  };
  // console.log($tenPlayed.length);

  // function to black out numbers that have already been played successfully
  var playedNumbers = function() {
    for (let i = 0; i < $(".selected").length; i++) {
      numbersPlayed.push($(".selected")[i]);
    }
    $(".selected").addClass("played");
    $(".selected").text("");
    $numDiv.removeClass("selected");
    console.log(numbersPlayed);
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
    // console.log(diceSum);
    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);

    winGame();
    diceRollCount();

  };

  // Function that toggles the class "selected" on the numbers when clicked on
  $numDiv.on("click", function() {
    $(this).toggleClass("selected");
  });

  $(document).on("keypress", function(event) {
    if (event.which === 49) {
      $num1.toggleClass("selected");
    } else if (event.which === 50) {
      $num2.toggleClass("selected");
    } else if (event.which === 51) {
      $num3.toggleClass("selected");
    } else if (event.which === 52) {
      $num4.toggleClass("selected");
    } else if (event.which === 53) {
      $num5.toggleClass("selected");
    } else if (event.which === 54) {
      $num6.toggleClass("selected");
    } else if (event.which === 55) {
      $num7.toggleClass("selected");
    } else if (event.which === 56) {
      $num8.toggleClass("selected");
    } else if (event.which === 57) {
      $num9.toggleClass("selected");
    } else if (event.which === 48) {
      $num10.toggleClass("selected");
    }
  });
  $(document).on("keypress", function(event) {
    if (event.which === 13) {
      sumSelectedNumbers = 0;
      var selectedNumbersArray = document.querySelectorAll(
        ".selected");
      for (let i = 0; i < selectedNumbersArray.length; i++) {
        sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
      }
      // console.log(sumSelectedNumbers);
      // console.log(diceSum);
      if (sumSelectedNumbers === 0) {
        rollTheDice();
      } else if (sumSelectedNumbers !== diceSum) {
        incorrectPopup();
        $numDiv.removeClass("selected");
      } else {
        playedNumbers();
        // winGame();
        rollTheDice();
      }
    }
  });


  // Event listener on Roll Dice button
  $rollDiceButton.on("click", function() {
    // COMPARE sum of dice to sum of selected numbers; if sum of selected numbers = 0 then roll the dice; if sum of selected numbers != sum of dice then alert; if sum of selected numbers = sume of dice then roll the dice and clear the selected numbers from Number Line - add class "played"
    sumSelectedNumbers = 0;
    var selectedNumbersArray = document.querySelectorAll(
      ".selected");
    for (let i = 0; i < selectedNumbersArray.length; i++) {
      sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
    }
    // console.log(sumSelectedNumbers);
    // console.log(diceSum);
    if (sumSelectedNumbers === 0) {
      rollTheDice();
    } else if (sumSelectedNumbers !== diceSum) {
      incorrectPopup();
      $numDiv.removeClass("selected");
    } else {
      playedNumbers();
      // winGame();
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
    $gamesPlayed.text(gamesPlayed);
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
    console.log(diceSum);
    // console.log(diceSum);
    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);
    diceRolls = 0;
    diceRollCount();
  };
  setNumbers();


});
