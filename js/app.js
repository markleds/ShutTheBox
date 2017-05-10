// "use strict";

$(document).ready(function() {
  // Dice variables and image array
  var dice1;
  var dice2;
  var diceImages = [];

  var $rollDiceButton = $("#roll-dice");

  var $numDiv = $(".col-1");
  var $selectedNumbers = $(".selected");
  $numDiv.on("click", function() {
    $(this).toggleClass("selected");
  });

  var numberPlayed = function() {
    if ($numDiv.hasClass("selected")) {
      $selectedNumbers.addClass("played");
    }
  };
  // Event listener on Roll Dice button
  $rollDiceButton.on("click", function() {
    console.log("Button Clicked");
    numberPlayed();
    // Add class "played" to numbers that have the class "selected"
    // $selectedNumbers.addClass("played");
    // $numDiv.removeClass("selected");
  });
  // };

});
