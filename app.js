/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a rollDice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* GLOBAL VARIABLES */
var scores =[0,0];              //to hold the two player scores, idx0's val is p1, idx1 is p2
var roundScore = 0;             //score for that current round
var activePlayer =0;            //0 for player 1 , 1 for player 2
var nextPlayer =1;
var winner;
var diceImages =['dice-1.png','dice-2.png','dice-3.png','dice-4.png','dice-5.png','dice-6.png'];

//DOM NODES
var newGameButton = document.querySelector('.btn-new');
var rollDiceButton = document.querySelector('.btn-roll');
var holdButton = document.querySelector('.btn-hold');
var globalScoreDisplays = document.querySelectorAll(".player-score");
var roundScoresDisplays = document.querySelectorAll(".player-current-score");
var nameDisplays = document.querySelectorAll('.player-name');
var player1Panel = document.querySelector(".player-0-panel");
var player2Panel = document.querySelector(".player-1-panel");
//END OF DOM NODES

var rollDice =function(){
    return Math.floor(Math.random() * (6-1+1)) +1;
} 

function changeDiceImage(result){
    let diceNode = document.querySelector(".dice");
    diceNode.src = diceImages[result-1];
}

//BUTTON HANDLERS
function rollDiceHandler(){
    let result = rollDice();            //save result  
    changeDiceImage(result);            //change dice image
    //if the result is a 1, change player turn, reset round score to 0, move to a next function later
    if(result===1){
        roundScore=0;
        updateRoundScoreDisplay(roundScore);
        nextTurn();             
    }else{
        roundScore+=result;                 //update round score
        updateRoundScoreDisplay(roundScore);
    }
}

function holdHandler(){
    scores[getCurrentPlayer()]+=roundScore;     //add to roundscore to globalScore of current player
    roundScore=0;                               //reset round score
    updatePlayerGlobalScore();                  //update global UI of current player
    updateRoundScoreDisplay(roundScore);
    
    //check if 100 
    if(didWin()){
        winner=getCurrentPlayer() +1;
        alert('winner is player '+winner);
        displayWinner();
        
    }else{
        nextTurn();
    }
    
}

//END OF HANDLERS


/* UI render functions 
*
*
*
*/
function updateRoundScoreDisplay(result){
    let currentPlayer = getCurrentPlayer();
    roundScoresDisplays[currentPlayer].textContent=result;
}

function updatePlayerPanel(){
    let p1Classes=document.querySelector(".player-0-panel").classList;
    let p2Classes=document.querySelector(".player-1-panel").classList;
    if(p1Classes.contains("active")){
        p1Classes.remove("active");
        p2Classes.add("active");
    }
    else{
        p2Classes.remove("active");
        p1Classes.add("active");
    }
}

function updatePlayerGlobalScore(){
    globalScoreDisplays[getCurrentPlayer()].textContent=scores[getCurrentPlayer()];
}

function displayWinner(){
    let winnerPanelClasses;
    let winnerNameClasses=nameDisplays[winner].classList;
    if(winner===0){         //player 1 won
        winnerPanelClasses=player1Panel.classList;
    }
    else{
        winnerPanelClasses=player2Panel.classList;
    }
    winnerPanelClasses.remove('active');
    winnerPanelClasses.add('winner');
    winnerNameClasses.add('.winner');          
}
//END OF UPDATE UI FUNCTIONS

/* GAMEPLAY HELPER FUNCTIONS */

function getCurrentPlayer(){
    return activePlayer;
}
//change player turn
function nextTurn(){
    let prevActivePlayer = activePlayer;
    activePlayer=nextPlayer;
    nextPlayer=prevActivePlayer;
    updatePlayerPanel();
}

//checks for winner
function didWin(){
    if(scores[getCurrentPlayer()] >=100){            
        return true;
    }
    return false;
}

/* GAMEPLAY HELPER FUNCTIONS */


/* SCORING RELATED FUNCTIONS */
function resetPlayerScores(){
    var p1ScoreDisplay=document.querySelector("#score-0");
    var p2ScoreDisplay = document.querySelector("#score-1");
    p1ScoreDisplay.textContent=0;
    p2ScoreDisplay.textContent=0;
}
//RESET ROUND SCORES
function resetRoundScores(){
    let roundScores= document.querySelectorAll(".player-current-score");        //reset both round scores
    roundScores.forEach((e)=>e.textContent=0);
}

//RESET ALL SCORES
function resetScoring(){
    resetRoundScores();
    resetPlayerScores();
}

//resetScoring();

//need to append resetScoring to newGAME buttohn

rollDiceButton.addEventListener('click',rollDiceHandler);
newGameButton.addEventListener('click',resetScoring);
holdButton.addEventListener('click',holdHandler);

//clicking the 'roll rollDice' button
//1. check turn
//2. get rollDice result
//3. change rollDice image


// while(didWin(scores)===false){      //continue game while no one won

    
// }