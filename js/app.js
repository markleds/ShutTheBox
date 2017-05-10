// "use strict";

$(document).ready(function() {
  // Dice variables and image array
  var diceImages = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5",
    "dice-6"
  ];
  // function to give you a number between and including 0 & 5 for index number of dice background image classs name
  var dice1Bkgnd;
  var dice2Bkgnd;
  var getDice1Bkgnd = function() {
    var numBetween1and6 = Math.floor(Math.random() * 5);
    dice1Bkgnd = diceImages[numBetween1and6];
    console.log(dice1Bkgnd);
  };
  var getDice2Bkgnd = function() {
    var numBetween1and6 = Math.floor(Math.random() * 5);
    dice2Bkgnd = diceImages[numBetween1and6];
    console.log(dice2Bkgnd);
  };
  getDice1Bkgnd();
  getDice2Bkgnd();
  // var dice1Bkgnd = diceImages[numBetween1and6];
  // var dice2Bkgnd = diceImages[numBetween1and6];

  var $rollDiceButton = $("#roll-dice");

  var $numDiv = $(".col-1");
  var $selectedNumbers = $(".selected");
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
    // numberPlayed();
    // Add class "played" to numbers that have the class "selected"
    $selectedNumbers.addClass("played");
    // $numDiv.removeClass("selected");
  });
  // };

  // Roll Dice
  $rollDiceButton.on("click", function() {

  });


});
