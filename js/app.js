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

  // Number Line classes
  var $selected = $(".selected");
  var $played = $(".played");

  // Start of game constant for the sum of selected numbers on Number Line
  var sumSelectedNumbers = 0;

  var $dice1 = $("#dice-1");
  var $dice2 = $("#dice-2");
  var $dice = $(".dice");

  // Dice background image classes array
  var diceImageClasses = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5",
    "dice-6"
  ];

  // 2 variables to hold the index number for the dye backgroud image class
  var dice1Index;
  var dice2Index;

  // variable to hold the sum of the dice for comparison to players selections on Nmber Line - updated on every roll of the dice.
  var diceSum = 0;

  // Constant to keep track of the number of times the user rolls the dice in each game
  var diceRolls = 0;

  // Constant for the fewest rolls of the dice to win the game
  var recordDiceRolls = 0;

  // Number of games played & won
  var gamesPlayed = 0;
  var gamesWon = 0;
  var $gamesPlayed = $(".games-played");
  var $gamesWon = $(".games-won");

  var time = 0;
  var recordTime = 0;
  var $timer = $(".timer");
  var $recordTime = $(".record-time");

  // functions to give you a number between and including 0 & 5 for the index of dice background image classs in the array diceImageClasses
  var dice1Bkgnd;
  var dice2Bkgnd;
  var getDice1Bkgnd = function() {
    dice1Index = Math.floor(Math.random() * 6);
    dice1Bkgnd = diceImageClasses[dice1Index];
  };
  var getDice2Bkgnd = function() {
    dice2Index = Math.floor(Math.random() * 6);
    dice2Bkgnd = diceImageClasses[dice2Index];
  };

  // Popup Event listeners & functionality
  var $letsPlay = $("#lets-play");
  var $closePopup = $("#close-popup");
  var $closeWinPopup = $(".close-win-popup");
  var $howToPlay = $("#instructions");
  var $incorrectPlay = $("#incorrect-play");
  var $howToWindow = $("#how-to-popup");
  var $popupCover = $(".popup-cover");
  var $winCover = $(".win-cover");
  var $winPopup = $("#win-popup");
  var $backToGame = $("#back-to-game");
  var $playAgain = $("#play-again");
  // Event Listener to display Instructions Popup
  $howToPlay.on("click", function() {
    $popupCover.fadeIn(1000);
    $howToWindow.fadeIn(1000);
  });
  // Event Listener to hide Instructions popup
  $("#lets-play, #close-popup, .popup-cover").on("click", function() {
    $popupCover.fadeOut(1000);
    $howToWindow.fadeOut(1000);
  });
  // function to display a popup when the incorrect numbers are selected
  var incorrectPopup = function() {
    $popupCover.fadeIn(1000);
    $incorrectPlay.fadeIn(1000);
  };
  // return to game from incorrect numbers selected popup
  $("#back-to-game, #close-popup, .popup-cover").on("click", function() {
    $popupCover.fadeOut(1000);
    $incorrectPlay.fadeOut(1000);
  });

  // Popup window that displays if you win the game
  var winGamePopup = function() {
    $winCover.fadeIn(1000);
    $winPopup.fadeIn(1000);
  };
  // Event Listener to close win popup window and re-set game
  $("#close-win-popup, #play-again, .win-cover").on("click", function() {
    $winCover.fadeOut(1000);
    $winPopup.fadeOut(1000);
    setNumbers();
    resetTimer();
    startTimer();
    numbersPlayed = [];
    sumSelectedNumbers = 0;
  });

  // Function that checks to see if you have won the game
  var winGame = function() {
    if (numbersPlayed.length === 10) {
      winGamePopup();
      gamesWon++;
      $gamesWon.text(gamesWon);
      gamesPlayed++;
      $gamesPlayed.text(gamesPlayed);
      stopTimer();
      compareRecordTime();
      $numDiv.removeClass("selected played");
      compareDiceRolls();
    } else {
      return;
    }
  };

  // function to black out numbers that have already been played successfully
  var playedNumbers = function() {
    // $selected.each(function(index) {
    //   numbersPlayed.push($selected[index]);
    // });
    for (let i = 0; i < $(".selected").length; i++) {
      numbersPlayed.push($(".selected")[i]);
    }
    $(".selected").addClass("played");
    $(".selected").text("");
    $numDiv.removeClass("selected");
    console.log(numbersPlayed);
  };

  // Dice Roll sound mp3
  var rollDicemp3 = function() {
    document.querySelector("#dice-mp3").play();
  };

  // update the current number of dice rolls
  var diceRollCount = function() {
    diceRolls++;
    $(".current-dice-rolls").text(diceRolls);
  };
  var rollTheDice = function() {
    // check to see if user has won game
    winGame();

    rollDicemp3();

    // Dice animation
    spinDice();

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

    // update the dice roll count variable
    diceRollCount();
  };
  var spinDice = function() {
    setTimeout(function() {
      $(".dice").addClass("roll-dice-1");
    }, 20);
    setTimeout(function() {
      $(".dice").removeClass("roll-dice-1").addClass("roll-dice-2");
    }, 600);
    setTimeout(function() {
      $(".dice").removeClass("roll-dice-2");
    }, 1200);
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
  // Event Listener on "return/enter" key to roll the dice and check selected numbers
  $(document).on("keypress", function(event) {
    if (event.which === 13) {
      rollDiceCompleteTurn();
    }
  });

  // Function to COMPARE sum of dice to sum of selected numbers; if sum of selected numbers = 0 then roll the dice; if sum of selected numbers != sum of dice then alert; if sum of selected numbers = sume of dice then roll the dice and clear the selected numbers from Number Line - add class "played"
  var rollDiceCompleteTurn = function() {
    sumSelectedNumbers = 0;
    var selectedNumbersArray = document.querySelectorAll(
      ".selected");
    for (let i = 0; i < selectedNumbersArray.length; i++) {
      sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
    }
    if (sumSelectedNumbers === 0) {
      rollTheDice();
    } else if (sumSelectedNumbers !== diceSum) {
      incorrectPopup();
      $numDiv.removeClass("selected");
      // return;
    } else {
      playedNumbers();
      rollTheDice();
    }
  };
  // Event listener on Roll Dice button and individual Dye to roll the dice and check selected numbers
  $("#roll-dice, .dice").on("click", function() {
    rollDiceCompleteTurn();
  });

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

  // Timer - Thank You Bobby King - referenced from our in-class Stopwatch project
  // Global variables
  var intervalId = null; // variable to store the interval ID to stop interval

  // This one is for free...
  // Function to pad single digit numbers as strings with leading 0's
  var leftPad = function(time) {
    return time < 10 ? ("0" + time) : ("" + time);
  };

  var timeToStr = function(timeVal) {
    var tempTime = timeVal;

    var min = Math.floor(tempTime / 600);
    tempTime = tempTime - (min * 600);

    var sec = Math.floor(tempTime / 10);
    tempTime = tempTime - (sec * 10);

    return `${leftPad(min)}:${leftPad(sec)}`;
  };

  // Start Timer function
  var startTimer = function() {
    if (!intervalId) {
      // setInterval to increase our stopwatch's time
      intervalId = window.setInterval(function() {
        // increase time
        time += 1;
        // Set time value
        $timer.text(timeToStr(time));
      }, 100);
    }
  }; // End start timer

  // Stop Timer function
  var stopTimer = function() {
    // Check stopwatch state to determine if it is running or not
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }; // End stop timer function

  // reset timer
  var resetTimer = function() {
    // Checks state of stopwatch to determine if it's running or not
    if (!intervalId) {
      // Resetting "global" state values
      time = 0;
      $timer.text("00:00");
    }
  }; //End reset timer

  var compareRecordTime = function() {
    if (recordTime === 0) {
      recordTime = time;
      $recordTime.text(timeToStr(recordTime));
    } else if (time < recordTime) {
      recordTime = time;
      $recordTime.text(timeToStr(recordTime));
    } else {
      return;
    }
  };
  // End Timer


  // Play again
  var $playAgainButton = $("#play-again");
  $playAgainButton.on("click",
    function() {
      $numDiv.removeClass("selected played");
      setNumbers();
      diceRolls = 0;
      diceRollCount();
      gamesPlayed++;
      $gamesPlayed.text(gamesPlayed);
      stopTimer();
      resetTimer();
      startTimer();
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

    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);
    diceRolls = 0;
    diceRollCount();

  };
  var $startGameButton = $("#start-game");
  $startGameButton.on("click", function() {
    rollDicemp3()
    spinDice();
    startTimer();
    $("#start-button-row").attr("style", "display:none");
    $("#roll-dice-row").fadeIn();
  });
  setNumbers();
});
