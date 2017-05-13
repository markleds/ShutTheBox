# Flip the Box at Grandma's House
### WDI Palmarius
#### Mark Ledbetter
____
#### Object of the game
To cover all of the numbers on the board with the fewest rolls of the dice

____
#### Clickable Items

** Roll Dice button **  
ON CLICK:
* compare sum of dice with the sum of selected numbers  
 * if equal:  
   * set class of selected number divs to 'played' and remove number text from divs  
   * generate a random number between 1 and 6 to represent the face of each die.  
   * add 1 to variable representing the Number of Dice Rolls for that particular game  
 * else alert user that it is not a valid play
____
** Numbers **  
ON CLICK:
* add class of "selected" to div identifying it as clicked.  
* add 1 to variable representing the Number of Dice Rolls for that particular game  
____
** Play Again **  
ON CLICK:
* generate a random number between 1 and 6 to represent the face of each die.  
* re-set variable representing the Number of Dice Rolls to 1  
* re-set classes on number divs to original state
* add 1 to variable containing the Number of Games Played
____
** Win Game **  
* If all numbers are covered run Win Game function that alerts user that they have won    
* add 1 to variable representing the number of games won
* compare Number of Dice Rolls to Lowest Number of Dice Rolls to Win; if lower, update number

____
.animate to cover numbers?


Used Stack Overflow for help with animation of dice:  
http://stackoverflow.com/questions/14859322/css3-spin-animation  


1. Overview of the project and the goals of your game.
2. Your approach - what problems did you need to solve to make your app work and how did you work through them?
3. Challenges - What challenges did you face?
Responsive design - getting everything styled to look right on both large and small screens using media queries
Getting all of the event listeners to fire at the right times. turning them on and off depending on the which popup was displayed
Figuring out how to correctly iterate through the number line adding and removing classes and when and how to check to see if you have won.
4. Victories - Which aspects do you feel that you did well in the project?
design & style
functionality

5. 3 Lines of Code - Do you have any interesting implementations you want to share?
