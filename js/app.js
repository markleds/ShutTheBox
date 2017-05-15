// "use strict";

$(document).ready(function() {
  // Useful variables
  var $numDiv = $(".col-1");
  var $numDiv1 = $(".col-1-2-player");
  var $numDiv2 = $(".col-2-2-player");
  var numbersPlayed = [];
  var $rollDiceButton = $("#roll-dice");
  var $recordDiceRolls = $(".record-dice-rolls");
  var $yellowBkgnd = $(".yellow-bkgnd");
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

  var numberOfPlayers = 0;
  var playersTurn = 0;
  var gamesWonP1 = 0;
  var gamesWonP2 = 0;
  var $playersTurn = $("#players-turn");
  var $p1NumberLine = $("#player-1-number-line");
  var $p2NumberLine = $("#player-2-number-line");
  var $1playerButton = $("#1-player-button");
  var $2playerButton = $("#2-player-button");

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
  // Useful Popup variables
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

  // Event listener to flip title
  $("h1").on("click", function() {
    $(this).toggleClass("vertical-flip");
  });

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

  // Dice Roll sound mp3 - from https://www.youtube.com/watch?v=o-1U19vao78
  var rollDicemp3 = function() {
    document.querySelector("#dice-mp3").play();
  };
  // Number select sound effect - from https://www.youtube.com/watch?v=YzgtRonmJBk
  var numberSelect = function() {
    document.querySelector("#number-select").play();
  };
  var crowdCheeringAudio = document.querySelector("#crowd-cheering");
  // Number select sound effect - from https://www.youtube.com/watch?v=barWV7RWkq0
  var crowdCheering = function() {
    crowdCheeringAudio.play();
  };
  // Stop and re-set Crowd Cheering audio
  var crowdCheeringStop = function() {
    crowdCheeringAudio.pause();
    crowdCheeringAudio.currentTime = 0.0;
  };

  // Popup window that displays if you win the game
  var winGamePopup = function() {
    $winCover.fadeIn(1000);
    $winPopup.fadeIn(1000);
    crowdCheering();
  };

  // Function that spins dice - see CSS file for source
  var spinDice = function() {
    setTimeout(function() {
      $dice.addClass("roll-dice-1");
    }, 20);
    setTimeout(function() {
      $dice.removeClass("roll-dice-1").addClass(
        "roll-dice-2");
    }, 600);
    setTimeout(function() {
      $dice.removeClass("roll-dice-2");
    }, 1200);
  };
  var setNumbers = function() {
    for (let i = 1; i <= 10; i++) {
      $(`#num-${i}`).text(i);
    }
    for (let i = 1; i <= 10; i++) {
      $(`#num-${i}-2`).text(i);
    }

    // remove dice background class
    $dice1.removeClass(dice1Bkgnd);
    $dice2.removeClass(dice2Bkgnd);

    // update dice1Bkgnd & dice2Bkgnd
    getDice1Bkgnd();
    getDice2Bkgnd();

    // update variable diceSum with new sum of rolled dice
    diceSum = (dice1Index + 1) + (dice2Index + 1);

    // add new dice background class to update dice background image
    $dice1.addClass(dice1Bkgnd);
    $dice2.addClass(dice2Bkgnd);
    diceRolls = 0;
  };

  // Event listener to us the return/enter key to roll the dice
  var returnRollDice = function() {
    $(document).on("keypress", function(event) {
      if (event.which === 13) {
        rollDiceCompleteTurn();
      }
    });
  };


  // Event listener to change button text to black on mouse enter and back to white on mouse leave
  var mouseOverButton = function() {
    $yellowBkgnd.on("mouseenter", function() {
      $(this).attr("style",
        "color:#000; box-shadow:none");
    });
    $yellowBkgnd.on("mouseleave", function() {
      $(this).removeAttr("style",
        "color:#000; box-shadow:none");
    });
    $playersTurn.off("mouseenter");
    $playersTurn.off("mouseleave");
  };
  mouseOverButton();
  var mouseEnterButton1 = function() {
    $1playerButton.on("mouseenter", function() {
      $(this).attr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseEnterButton1();

  var mouseLeaveButton1 = function() {
    $1playerButton.on("mouseleave", function() {
      $(this).removeAttr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseLeaveButton1();

  var mouseEnterButton2 = function() {
    $2playerButton.on("mouseenter", function() {
      $(this).attr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseEnterButton2();

  var mouseLeaveButton2 = function() {
    $2playerButton.on("mouseleave", function() {
      $(this).removeAttr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseLeaveButton2();

  // Event listener on 1 Player button
  $1playerButton.on("click", function() {
    $(this).off("mouseleave");
    $2playerButton.removeAttr("style",
      "color:#000; box-shadow:none");
    mouseEnterButton2();
    mouseLeaveButton2();
    $(".col-1").removeClass("col-1-2-player");
    $p2NumberLine.hide();
    $("#player-2-id, #player-1-id").addClass("hidden");
    numberOfPlayers = 1;
  });

  // Event listener on 2 Player button
  $2playerButton.on("click", function() {
    $(this).off("mouseleave");
    $1playerButton.removeAttr("style",
      "color:#000; box-shadow:none");
    mouseEnterButton1();
    mouseLeaveButton1();
    $(".col-1").addClass("col-1-2-player");
    $p2NumberLine.show();
    $("#player-2-id, #player-1-id").removeClass("hidden");
    numberOfPlayers = 2;
  });
  // function to set event listener on Start Game button to run once number of players has been selected
  $("#start-game").on("click", function() {
    if (numberOfPlayers === 0) {
      alert("Please select the number of players.");
    } else if (numberOfPlayers === 1) {
      onePlayerGame();
      $("#welcome-scoreboard").hide();
      $("#1-player-scoreboard").fadeIn();
      $("#roll-dice").text("Roll Again");
      $("#number-of-players").hide();
      $("#dice-row").fadeIn();
      $("#start-button-row").hide();
      $("#roll-dice-row").fadeIn();

    } else if (numberOfPlayers === 2) {
      playersTurn = 1;
      twoPlayerGame();
      $("#welcome-scoreboard").hide();
      $("#2-player-scoreboard").fadeIn();
      $("#roll-dice").text("Play Selected Numbers");
      $("#number-of-players").hide();
      $("#dice-row").fadeIn();
      $("#start-button-row").hide();
      $("#roll-dice-row").fadeIn();
    }
  });

  // Begin 1 player Game funcitonality
  var onePlayerGame = function() {
    // Event listener to change button text to black on mouse enter and back to white on mouse leave
    mouseOverButton();

    // Function that checks to see if you have won the game
    var winGame = function() {
      if (numbersPlayed.length === 10) {
        winGamePopup();
        gamesWon += 1;
        $gamesWon.text(gamesWon);
        gamesPlayed += 1;
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
      for (let i = 0; i < $(".selected").length; i++) {
        numbersPlayed.push($(".selected")[i]);
      }
      $(".selected").addClass("played");
      $(".selected").text("");
      $numDiv.removeClass("selected");
    };


    // update the current number of dice rolls
    var diceRollCount = function() {
      diceRolls++;
      $(".current-dice-rolls").text(diceRolls);
    };
    var rollTheDice = function() {
      // check to see if user has won game
      winGame();

      // play roll dice sound
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
      // add new dice background class to update dice background image
      $dice1.addClass(dice1Bkgnd);
      $dice2.addClass(dice2Bkgnd);

      // update the dice roll count variable
      diceRollCount();
    };

    // Function that toggles the class "selected" on the numbers when clicked on
    $numDiv.on("click", function() {
      $(this).toggleClass("selected");
      numberSelect();
    });

    // Event listener on number keys to be used to selec numbers in number line
    $(document).on("keypress", function(event) {
      if (event.which === 49) {
        $num1.toggleClass("selected");
        numberSelect();
      } else if (event.which === 50) {
        $num2.toggleClass("selected");
        numberSelect();
      } else if (event.which === 51) {
        $num3.toggleClass("selected");
        numberSelect();
      } else if (event.which === 52) {
        $num4.toggleClass("selected");
        numberSelect();
      } else if (event.which === 53) {
        $num5.toggleClass("selected");
        numberSelect();
      } else if (event.which === 54) {
        $num6.toggleClass("selected");
        numberSelect();
      } else if (event.which === 55) {
        $num7.toggleClass("selected");
        numberSelect();
      } else if (event.which === 56) {
        $num8.toggleClass("selected");
        numberSelect();
      } else if (event.which === 57) {
        $num9.toggleClass("selected");
        numberSelect();
      } else if (event.which === 48) {
        $num10.toggleClass("selected");
        numberSelect();
      }
    });
    // Event Listener on "return/enter" key to roll the dice and check selected numbers
    var returnRollDice = function() {
      $(document).on("keypress", function(event) {
        if (event.which === 13) {
          rollDiceCompleteTurn();
        }
      });
    };

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
      } else {
        playedNumbers();
        rollTheDice();
      }
    };
    // Event listener on Roll Dice button and individual Dye to roll the dice and check selected numbers
    var rollDiceEventListener = function() {
      $("#roll-dice, .dice").on("click", function() {
        rollDiceCompleteTurn();
      });
    };

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

    // Timer - Thank You Bobby King - referenced from our in-class Stopwatch project http://bobbydigital.website/
    // Global variables
    var intervalId = null;

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

    // compare the record time to current game's time and update record time
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

    // Event Listener to close win popup window and re-set game
    $("#close-win-popup, #play-again, .win-cover").on("click", function() {
      $winCover.fadeOut(1000);
      $winPopup.fadeOut(1000);
      setNumbers();
      resetTimer();
      startTimer();
      diceRolls = 0;
      diceRollCount();
      numbersPlayed = [];
      sumSelectedNumbers = 0;
      crowdCheeringStop();
    });

    setNumbers();
    rollDicemp3();
    spinDice();
    startTimer();
    returnRollDice();
    rollDiceEventListener();
    mouseOverButton();
    rollTheDice();
  }; // End 1 player game functionality

  // Begin 2 player Game funcitonality
  var twoPlayerGame = function() {
    // Prompts to customize Player's names on board
    var player1Name = prompt("Please Enter Player 1's Name");
    // Print player 1's name to nuber line and Scoreboard if it is not ""
    var printPlayer1Name = function() {
      if (player1Name.trim() === "") {
        player1Name = "Player 1";
      } else {
        $("#player-1-id").text(player1Name.trim());
        $("#player-1-record h3").text(player1Name);
        $playersTurn.text(`${player1Name}'s Turn`);
      }
    };
    printPlayer1Name();
    var player2Name = prompt("Please Enter Player 2's Name");
    var printPlayer2Name = function() {
      if (player2Name.trim() === "") {
        player2Name = "Player 2";
      } else {
        $("#player-2-id").text(player2Name.trim());
        $("#player-2-record h3").text(player2Name);
      }
    };
    printPlayer2Name();

    var eventListenersP1 = function() {
      // Turn off event listeners for Player 2
      $(".col-2-2-player").off("click");
      $(document).off("keypress");

      // Function that toggles the class "selected" on the numbers when clicked on for player 1
      $(".col-1-2-player").on("click", function() {
        $(this).toggleClass("selected");
        numberSelect();
      });

      // Event listener on number keys to be used to selec numbers in payer 1's number line
      $(document).on("keypress", function(event) {
        if (event.which === 49) {
          $("#num-1").toggleClass("selected");
          numberSelect();
        } else if (event.which === 50) {
          $("#num-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 51) {
          $("#num-3").toggleClass("selected");
          numberSelect();
        } else if (event.which === 52) {
          $("#num-4").toggleClass("selected");
          numberSelect();
        } else if (event.which === 53) {
          $("#num-5").toggleClass("selected");
          numberSelect();
        } else if (event.which === 54) {
          $("#num-6").toggleClass("selected");
          numberSelect();
        } else if (event.which === 55) {
          $("#num-7").toggleClass("selected");
          numberSelect();
        } else if (event.which === 56) {
          $("#num-8").toggleClass("selected");
          numberSelect();
        } else if (event.which === 57) {
          $("#num-9").toggleClass("selected");
          numberSelect();
        } else if (event.which === 48) {
          $("#num-10").toggleClass("selected");
          numberSelect();
        }
      });
      // Event Listener on "return/enter" key to roll the dice and check selected numbers
      var returnRollDice2p = function() {
        $(document).on("keypress", function(event) {
          if (event.which === 13) {
            rollDiceCompleteTurn();
          }
        });
      };
      returnRollDice2p();

    };
    var eventListenersP2 = function() {
      // Turn off event listeners for Player 1
      $(".col-1-2-player").off("click");
      $(document).off("keypress");

      // Function that toggles the class "selected" on the numbers when clicked on for player 2
      $(".col-2-2-player").on("click", function() {
        $(this).toggleClass("selected");
        numberSelect();
      });

      // Event listener on number keys to be used to selec numbers in player 2's number line
      $(document).on("keypress", function(event) {
        if (event.which === 49) {
          $("#num-1-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 50) {
          $("#num-2-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 51) {
          $("#num-3-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 52) {
          $("#num-4-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 53) {
          $("#num-5-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 54) {
          $("#num-6-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 55) {
          $("#num-7-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 56) {
          $("#num-8-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 57) {
          $("#num-9-2").toggleClass("selected");
          numberSelect();
        } else if (event.which === 48) {
          $("#num-10-2").toggleClass("selected");
          numberSelect();
        }
      });
      // Event Listener on "return/enter" key to roll the dice and check selected numbers
      var returnRollDice2p = function() {
        $(document).on("keypress", function(event) {
          if (event.which === 13) {
            rollDiceCompleteTurn();
          }
        });
      };
      returnRollDice2p();
    };

    // Function to COMPARE sum of dice to sum of selected numbers; if sum of selected numbers = 0 then roll the dice; if sum of selected numbers != sum of dice then alert; if sum of selected numbers = sume of dice then roll the dice and clear the selected numbers from Number Line - add class "played"
    var rollDiceCompleteTurn = function() {
      sumSelectedNumbers = 0;
      var selectedNumbersArray = document.querySelectorAll(
        ".selected");
      for (let i = 0; i < selectedNumbersArray.length; i++) {
        sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
      }
      if (sumSelectedNumbers === 0) {
        playedNumbers();
        rollTheDice();
      } else if (sumSelectedNumbers !== diceSum) {
        incorrectPopup();
        $(".col-1-2-player, .col-2-2-player").removeClass("selected");
      } else {
        playedNumbers();
        rollTheDice();
      }
    };

    // function to black out numbers that have already been played successfully
    var playedNumbers = function() {
      for (let i = 0; i < $(".selected").length; i++) {
        numbersPlayed.push($(".selected")[i]);
      }
      $(".selected").addClass("played");
      $(".selected").text("");
      $(".col-1-2-player, .col-2-2-player").removeClass("selected");
      if (playersTurn === 1) {
        $playersTurn.text(`${player2Name}'s Turn`);
        playersTurn = 2;
        $p1NumberLine.addClass("not-players-turn");
        $p2NumberLine.removeClass("not-players-turn");
        eventListenersP2();
      } else if (playersTurn === 2) {
        $playersTurn.text(`${player1Name}'s Turn`);
        playersTurn = 1;
        $p2NumberLine.addClass("not-players-turn");
        $p1NumberLine.removeClass("not-players-turn");
        eventListenersP1();
      }
    };

    // Event Listener on "return/enter" key to roll the dice and check selected numbers
    var returnRollDice2p = function() {
      $(document).on("keypress", function(event) {
        if (event.which === 13) {
          rollDiceCompleteTurn();
        }
      });
    };
    returnRollDice2p();

    // Event listener on Roll Dice button and individual Dye to roll the dice and check selected numbers
    var rollDiceEventListener = function() {
      $("#roll-dice, .dice").on("click", function() {
        rollDiceCompleteTurn();
      });
    };
    // function that "rolls" the dice - updating their background image
    var rollTheDice = function() {
      // check to see if user has won game
      winGame2p();

      // play roll dice sound
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
      console.log(diceSum);
      // add new dice background class to update dice background image
      $dice1.addClass(dice1Bkgnd);
      $dice2.addClass(dice2Bkgnd);
    };

    // Function that checks to see if a player has won the game
    var winGame2p = function() {
      if ($("#player-1-number-line .played").length === 10) {
        $("#win-popup").html(
          `<h2>CONGRATULATIONS ${player1Name}!</h2><h2>YOU WIN!!!</h2><button id="play-again" class="popup-button yellow-bkgnd" type="button" name="button">Play Again</button>`
        );
        winGamePopup();
        gamesWonP1 += 1;
        $(".total-games-won-1").text(gamesWonP1);
        $(".col-1-2-player, .col-2-2-player").removeClass(
          "selected played");
      } else if ($("#player-2-number-line .played").length === 10) {
        $("#win-popup").html(
          `<h2>CONGRATULATIONS ${player2Name}!</h2><h2>YOU WIN!!!</h2><button id="play-again" class="popup-button yellow-bkgnd" type="button" name="button">Play Again</button>`
        );
        winGamePopup();
        gamesWonP2 += 1;
        $(".total-games-won-2").text(gamesWonP2);
        $(".col-1-2-player, .col-2-2-player").removeClass(
          "selected played");
      } else {
        return;
      }
    };

    // Event Listener to close win popup window and re-set game
    $("#close-win-popup, #play-again, .win-cover").on("click", function() {
      $winCover.fadeOut(1000);
      $winPopup.fadeOut(1000);
      setNumbers();
      numbersPlayed = [];
      sumSelectedNumbers = 0;
      crowdCheeringStop();
    });

    rollTheDice();
    setNumbers();
    rollDicemp3();
    spinDice();
    returnRollDice2p();
    rollDiceEventListener();
    eventListenersP1();
    mouseOverButton();
    sumSelectedNumbers = 0;
  }; //End 2 player Game
  setNumbers();
});
