# Shut the Box
https://markleds.github.io/ShutTheBox/

### General Assembly: WDI Palmarius
#### Mark Ledbetter

____
### Object of the game
**Single Player:** To cover all of the numbers on the board with the fewest rolls of the dice

**Two Players:** To cover all of your numbers on the board before your opponent covers theirs.
____
### Technologies Used
This game was created as a single page web app using HTML, CSS, JavaScript and jQuery. Linked files include:
 * jQuery library
 * google fonts
____
### Approach taken
I initially created the game for a single player. I started with a very good idea of how I wanted the game to look. Having played the game as a child at my grandparent's house I had vivid memories of how the game was played and how to win. The next step was to think through the game step by step using Pseudocode to logically approach each functional step of the game.

After completing the single player game I felt compelled to push myself to adapt it so that there was an option to have two players. So I took the single player game and refactored it from top to bottom to create a version for 2 players. This was not an easy step and unfortunately I tried to just dive into my single player version without taking the time to Pseudocode and write out all of the logic and changes I would have to make to accommodate both types of games. HUGE MISTAKE. After working for nearly an entire evening on a version of the 2 player game it occurred to me that I was going about adapting the single player version incorrectly. So I stopped my work and spent the next 18 hours thinking through my approach and writing out notes and ideas on how to create this new 2 player option. Not surprisingly, things went much smoother when I sat down and began the implementation of the 2 player version the following night.

I am very proud of the work I have done on this game. I had some large challenges and hurdles throughout the process and there are definitely some things that I plan on cleaning up and adjusting once I have had some time to step away from the game and come back. The first challenge I had was converting my `for` loops to jQuery `.each` loops. I spent at least 2 hours trying to make these changes but was unable to get the JS to run correctly so I abandoned the `.each` and stuck with the `for` loops.

I also had trouble with some of the "useful" variables that I created at the top of my JS file. Several times while creating the game and adding the 2 player option I kept running into problems that I couldn't debug. I eventually tried writing out the long had jQuery code to select specific elements on the page and nearly every time my problem was solved. I look forward to getting to the root of this problem and understanding why it wasn't working.

I also had a couple instances where I used vanilla JavaScript to select an element for a reason similar to the one mentioned in the previous paragraph. I hope to switch that code out with its jQuery equivalent at some point.

I did my best to make comments in my JavaScript file as much as possible and found this to be incredibly helpful when I began the process of adapting the game to include a 2 player option. I think I could add more comments to the HTML and CSS files to better outline and label sections and classes for future reference. I hope to do that in the future.

One of the large challenges I had with the 2 player version was getting all of the event listeners to turn on and off. The users can use either their mouse or the number keys and enter key to select and play the numbers during their turn. The challenge was turning the event listeners on and off depending on whose turn it was. I finally got it working after quite a few hours of trying different solutions.

I look forward to getting some feedback from my peers on the game. I think there is a better way to style the Player's names in the 2 player version to accommodate names of different lengths but I didn't get around to researching that.

I also plan on creating custom prompt boxes for the players to enter their names on the 2 player version that match all of the other popup windows in the game.

I would also like to sit down and look through my code to see if I can simplify things. I did my best to pull functions and variables that are used by both the single and two players versions of the game into the global scope, but I think I could do some more of that with a little help and another set of eyes.
____
### How To Play The game
**The object of the game is to clear all of the numbers 1 - 10 from the red number line.**  

**Single Player Game**  
1. Start the game by rolling the dice.  
2. Select a number or multiple numbers from the red number line that add up to the sum of the dots on the displayed dice.  
3. Roll again and repeat until the number line is clear.
4. If you are unable to match the remaining numbers in the red number line to the dice, continue rolling until you have a playable match.

**Two Player Game**
1. The dice are rolled to start the game and the top player on the board goes first.
2. In turn, each player selects a number or multiple numbers from their red number line that add up to the sum of the dots on the displayed dice.
3. To complete the turn, click the "Play Selected Numbers" button.
4. If a player is unable to match any of the remaining numbers in their red number line to the sum of the dots on the displayed dice, that player ends their turn by clicking the "Play Selected Numbers" button.
5. The game ends when one player has cleared all of the numbers from their number line.
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
