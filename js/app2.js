// "use strict";

$(document).ready(function() {
  // Useful variables
  var $numDiv = $(".col-1");
  var $numDiv1 = $(".col-2");
  var $numDiv2 = $(".col-2");
  var numbersPlayed = [];
  var $rollDiceButton = $("#roll-dice");
  var $recordDiceRolls = $(".record-dice-rolls");
  var $yellowBkgnd = $(".yellow-bkgnd");

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

  // Variables for 1 or 2 player games
  var numberOfPlayers = 0;
  var playersTurn = 2;
  var gamesWonP1 = 0;
  var gamesWonP2 = 0;

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

  // Event listener to flip title (see css for source help)
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

  // Popup window that displays if you win the game
  var winGamePopup = function() {
    $winCover.fadeIn(1000);
    $winPopup.fadeIn(1000);
    crowdCheering();
  };
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
  };
  var mouseEnterButton1 = function() {
    $("#1-player-button").on("mouseenter", function() {
      $(this).attr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseEnterButton1();

  var mouseLeaveButton1 = function() {
    $("#1-player-button").on("mouseleave", function() {
      $(this).removeAttr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseLeaveButton1();

  var mouseEnterButton2 = function() {
    $("#2-player-button").on("mouseenter", function() {
      $(this).attr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseEnterButton2();

  var mouseLeaveButton2 = function() {
    $("#2-player-button").on("mouseleave", function() {
      $(this).removeAttr("style",
        "color:#000; box-shadow:none");
    });
  };
  mouseLeaveButton2();

  var player1Selected = function() {
    $("#1-player-button").on("click", function() {
      $(this).off("mouseleave");
      $("#2-player-button").removeAttr("style",
        "color:#000; box-shadow:none");
      mouseEnterButton2();
      mouseLeaveButton2();
      $(".col-1").removeClass("col-1-2-player");
      $(".number-line-2").attr("style", "display:none");
      // onePlayerGame();
      numberOfPlayers = 1;
      // player1sTurn();
    });
  };
  player1Selected();
  var player2Selected = function() {
    $("#2-player-button").on("click", function() {
      $(this).off("mouseleave");
      $("#1-player-button").removeAttr("style",
        "color:#000; box-shadow:none");
      mouseEnterButton1();
      mouseLeaveButton1();
      $(".col-1").addClass("col-1-2-player");
      $(".number-line-2").removeAttr("style", "display:none");
      $("#player-2-id, #player-1-id").removeClass("hidden");
      // start2PlayerGame();
      numberOfPlayers = 2;
      // player1sTurn();
    });
  };
  player2Selected();

  $("start-game").on("click", function() {
    if (numberOfPlayers === 1) {
      onePlayerGame();
    }
  });


  // setNumbers();

  // var twoPlayerGame = function() {
  //   $("#welcome-scoreboard").attr("style", "display:none");
  //   $("#1-player-scoreboard").fadeIn();
  //   $("#roll-dice").text("Roll Dice");
  //   startTimer();
  //   diceRollCount();
  //   var player1sTurn = function() {
  //
  //     $(document).off('keypress');
  //
  //
  //     // Function that toggles the class "selected" on the numbers when clicked on
  //     $numDiv.on("click", function() {
  //       $(this).toggleClass("selected");
  //       numberSelect();
  //     });
  //     $numDiv2.on("click", function() {
  //       $(this).toggleClass("selected");
  //       numberSelect();
  //     });
  //
  //     // Event listener on number keys to be used to selec numbers in number line
  //     $(document).on("keypress", function(event) {
  //       if (event.which === 49) {
  //         $("#num-1").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 50) {
  //         $("#num-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 51) {
  //         $("#num-3").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 52) {
  //         $("#num-4").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 53) {
  //         $("#num-5").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 54) {
  //         $("#num-6").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 55) {
  //         $("#num-7").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 56) {
  //         $("#num-8").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 57) {
  //         $("#num-9").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 48) {
  //         $("#num-10").toggleClass("selected");
  //         numberSelect();
  //       }
  //     });
  //     rollDiceEventListener();
  //     // returnRollDice();
  //
  //   };
  //   var player2sTurn = function() {
  //
  //     $(document).off('keypress');
  //
  //     rollDiceEventListener();
  //     // returnRollDice();
  //
  //     // Function that toggles the class "selected" on the numbers when clicked on
  //     // $numDiv.on("click", function() {
  //     //   $(this).toggleClass("selected");
  //     //   numberSelect();
  //     // });
  //     $numDiv2.on("click", function() {
  //       $(this).toggleClass("selected");
  //       numberSelect();
  //     });
  //
  //     // Event listener on number keys to be used to selec numbers in number line
  //     $(document).on("keypress", function(event) {
  //       if (event.which === 49) {
  //         $("#num-1-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 50) {
  //         $("#num-2-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 51) {
  //         $("#num-3-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 52) {
  //         $("#num-4-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 53) {
  //         $("#num-5-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 54) {
  //         $("#num-6-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 55) {
  //         $("#num-7-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 56) {
  //         $("#num-8-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 57) {
  //         $("#num-9-2").toggleClass("selected");
  //         numberSelect();
  //       } else if (event.which === 48) {
  //         $("#num-10-2").toggleClass("selected");
  //         numberSelect();
  //       }
  //     });
  //   };
  // var rollTheDice2Player = function() {
  //   if (playersTurn % 2 === 0) {
  //     playersTurn += 1;
  //     player2sTurn();
  //     $("#players-turn").text("Player 2's Turn");
  //     $(".number-line-1").addClass("not-players-turn");
  //     $(".number-line-2").removeClass("not-players-turn");
  //     // playersTurn++;
  //     // player2sTurn();
  //   } else {
  //     playersTurn += 1;
  //     player1sTurn();
  //     $("#players-turn").text("Player 1's Turn");
  //     $(".number-line-1").removeClass("not-players-turn");
  //     $(".number-line-2").addClass("not-players-turn");
  //     // playersTurn++;
  //     // player1sTurn();
  //   }
  //   // play roll dice sound
  //   rollDicemp3();
  //
  //   // Dice animation
  //   spinDice();
  //
  //   // remove dice background class
  //   $dice1.removeClass(dice1Bkgnd);
  //   $dice2.removeClass(dice2Bkgnd);
  //
  //   // update dice1Bkgnd & dice2Bkgnd
  //   getDice1Bkgnd();
  //   getDice2Bkgnd();
  //
  //   // update variable diceSum with new sum of rolled dice
  //   diceSum = (dice1Index + 1) + (dice2Index + 1);
  //   // add new dice background class to update dice background image
  //   $dice1.addClass(dice1Bkgnd);
  //   $dice2.addClass(dice2Bkgnd);
  //   console.log(playersTurn);
  // };

  //   var start2PlayerGame = function() {
  //     $("#start-game").on("click", function() {
  //       $numDiv.removeClass("selected");
  //       rollDicemp3();
  //       spinDice();
  //       $("#start-button-row").attr("style", "display:none");
  //       $("#number-of-players").attr("style", "display:none");
  //       $("#dice-row").fadeIn();
  //       $("#roll-dice-row").fadeIn();
  //       returnRollDice();
  //       rollDiceEventListener();
  //       diceBoardSetup();
  //     });
  //   };
  //
  //
  //   mouseOverButton();
  // };

  var onePlayerGame = function() {
    $("#welcome-scoreboard").attr("style", "display:none");
    $("#1-player-scoreboard").fadeIn();
    $("#roll-dice").text("Play Selected Numbers");
    // player1sTurn();
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
    var rollTheDice = function() {
      if (numberOfPlayers === 1) {
        // check to see if user has won game
        // player1sTurn();
        winGame();
      } else if (numberOfPlayers === 2) {
        if (playersTurn === 1) {
          $("#players-turn").text("Player 2's Turn");
          $(".number-line-1").addClass("not-players-turn");
          $(".number-line-2").removeClass("not-players-turn");
          playersTurn = 2;
          player2sTurn();
        } else if (playersTurn === 2) {
          $("#players-turn").text("Player 1's Turn");
          $(".number-line-1").removeClass("not-players-turn");
          $(".number-line-2").addClass("not-players-turn");
          playersTurn = 1;
          // player1sTurn();
        }
      }
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

    // Function that spins dice - see CSS file for source
    var spinDice = function() {
      setTimeout(function() {
        $(".dice").addClass("roll-dice-1");
      }, 20);
      setTimeout(function() {
        $(".dice").removeClass("roll-dice-1").addClass(
          "roll-dice-2");
      }, 600);
      setTimeout(function() {
        $(".dice").removeClass("roll-dice-2");
      }, 1200);
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
        $numDiv2.removeClass("selected");
      } else {
        playedNumbers();
        rollTheDice();
      }
    };
    // update the current number of dice rolls
    var diceRollCount = function() {
      diceRolls++;
      $(".current-dice-rolls").text(diceRolls);
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

    // Timer - Thank You Bobby King - referenced from our in-class Stopwatch project
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

    // Play again
    // var $playAgainButton = $("#play-again");
    // $playAgainButton.on("click",
    //   function() {
    //     $numDiv.removeClass("selected played");
    //     setNumbers();
    //     diceRolls = 0;
    //     diceRollCount();
    //     gamesPlayed++;
    //     $gamesPlayed.text(gamesPlayed);
    //     stopTimer();
    //     resetTimer();
    //     startTimer();
    //   });

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
      // console.log(diceSum);

      // add new dice background class to update dice background image
      $dice1.addClass(dice1Bkgnd);
      $dice2.addClass(dice2Bkgnd);
      diceRolls = 0;
    };

    var start1PlayerGame = function() {
      $("#start-game").on("click", function() {
        $numDiv.removeClass("selected");
        rollDicemp3();
        spinDice();
        $("#start-button-row").attr("style", "display:none");
        $("#number-of-players").attr("style", "display:none");
        $("#dice-row").fadeIn();
        $("#roll-dice-row").fadeIn();
        returnRollDice();
        rollDiceEventListener();
        diceBoardSetup();
      });
    };
    start1PlayerGame();
    setNumbers();
    mouseOverButton();
  };


  var diceBoardSetup = function() {
    if (numberOfPlayers === 2) {
      $("#welcome-scoreboard").attr("style", "display:none");
      $("#2-player-scoreboard").fadeIn();
      $("#roll-dice").text("Play Selected Numbers");
      $("#players-turn").off();
      // player1sTurn();
    } else if (numberOfPlayers === 1) {
      // player1sTurn();
    }
    mouseOverButton();
  };
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
    $numDiv2.removeClass("selected");
    // console.log(numbersPlayed);
  };


  var rollTheDice1Player = function() {
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

  // var rollTheDice = function() {
  //   if (numberOfPlayers === 1) {
  //     rollTheDice1Player();
  //   } else {
  //     rollTheDice2Player();
  //   }
  // };

  // var rollTheDice = function() {
  //   if (numberOfPlayers === 1) {
  //     // check to see if user has won game
  //     player1sTurn();
  //     winGame();
  //   } else if (numberOfPlayers === 2) {
  //     if (playersTurn === 1) {
  //       $("#players-turn").text("Player 2's Turn");
  //       $(".number-line-1").addClass("not-players-turn");
  //       $(".number-line-2").removeClass("not-players-turn");
  //       playersTurn = 2;
  //       player2sTurn();
  //     } else if (playersTurn === 2) {
  //       $("#players-turn").text("Player 1's Turn");
  //       $(".number-line-1").removeClass("not-players-turn");
  //       $(".number-line-2").addClass("not-players-turn");
  //       playersTurn = 1;
  //       player1sTurn();
  //     }
  //   }
  //   // play roll dice sound
  //   rollDicemp3();
  //
  //   // Dice animation
  //   spinDice();
  //
  //   // remove dice background class
  //   $dice1.removeClass(dice1Bkgnd);
  //   $dice2.removeClass(dice2Bkgnd);
  //
  //   // update dice1Bkgnd & dice2Bkgnd
  //   getDice1Bkgnd();
  //   getDice2Bkgnd();
  //
  //   // update variable diceSum with new sum of rolled dice
  //   diceSum = (dice1Index + 1) + (dice2Index + 1);
  //   // add new dice background class to update dice background image
  //   $dice1.addClass(dice1Bkgnd);
  //   $dice2.addClass(dice2Bkgnd);
  //
  //   // update the dice roll count variable
  //   diceRollCount();
  // };

  // var whosTurnIsIt = function() {
  //   if (playersTurn === 1)
  // }
  var setNumbers = function() {
    for (let i = 1; i <= 10; i++) {
      $(`#num-${i}`).text(i);
    }
    for (let i = 1; i <= 10; i++) {
      $(`#num-${i}-2`).text(i);
    }
  };
  setNumbers();
});
