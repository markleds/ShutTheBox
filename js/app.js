// "use strict";

$(document).ready(function() {
  // Dice background image classes array
  var diceImageClasses = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5",
    "dice-6"
  ];
  var $rollDiceButton = $("#roll-dice");
  var $dice1 = $("#dice-1");
  var $dice2 = $("#dice-2");
  // 2 variables to hold the index number for the dye backgroud image class
  var dice1Index;
  var dice2Index;

  // variable to hold the sum of the dice for comparison to players selections on number line - updated on every roll of the dice.
  var diceSum = 0;

  // function to give you a number between and including 0 & 5 for index number of dice background image classs name
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

  // function to black out numbers that have already been played successfully
  var playedNumbers = function() {
    $(".selected").addClass("played");
    $(".selected").text("");
    $numDiv.removeClass("selected");
  };


  var rollTheDice = function() {
    // remove ".selected" from all numbers


    playedNumbers();
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

  var $numDiv = $(".col-1");
  // var $selectedNumbers = $(".selected");
  var $selectedNumbers = document.querySelector(".selected");
  // var selectedNumbersArray = document.querySelector(".selected");


  $numDiv.on("click", function() {
    $(this).toggleClass("selected");
  });

  // var numberPlayed = function() {
  //   if ($numDiv.hasClass("selected")) {
  //     $selectedNumbers.addClass("played");
  //   }
  // };
  // Event listener on Roll Dice button
  $rollDiceButton.on("click", function() {
    console.log("Button Clicked");
    // compare sum of dice is equal to sum of selected numbers
    var sumSelectedNumbers = 0;
    var selectedNumbersArray = document.querySelectorAll(
      ".selected");
    for (let i = 0; i < selectedNumbersArray.length; i++) {
      sumSelectedNumbers += parseInt(selectedNumbersArray[i].innerHTML);
    }
    console.log(sumSelectedNumbers);
    console.log(diceSum);
    if (sumSelectedNumbers !== diceSum) {
      alert(
        "Your selections do not add up to the numbers on the dice. Please select again."
      );
    } else {
      rollTheDice();
    }


    // numberPlayed();
    // Add class "played" to numbers that have the class "selected"

    // // remove dice background class
    // $dice1.removeClass(dice1Bkgnd);
    // $dice2.removeClass(dice2Bkgnd);
    //
    // // update dice1Bkgnd & dice2Bkgnd
    // getDice1Bkgnd();
    // getDice2Bkgnd();
    //
    // // update variable diceSum with new sum of rolled dice
    // diceSum = (dice1Index + 1) + (dice2Index + 2);
    // console.log(
    //   diceSum);
    // // console.log(diceSum);
    // // add new dice background class to update dice background image
    // $dice1.addClass(dice1Bkgnd);
    // $dice2.addClass(dice2Bkgnd);

    // $selectedNumbers.addClass("played");
    // $numDiv.removeClass("selected");
  });
  // };

  // Roll Dice
  // $rollDiceButton.on("click", function() {
  //
  // });
  var firstRoll = function() {
    // remove ".selected" from all numbers


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

  };
  firstRoll();


});
