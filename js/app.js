var startScreen = document.getElementById('start');
var startButton = document.querySelector('#start .button');
var finishScreen = document.getElementById('finish');
var boardScreen = document.getElementById('board');

var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');

var spots = document.querySelectorAll('.box');

// Set up initial display
startScreen.style.display = "initial";
boardScreen.style.display = "none";
finishScreen.style.display = "none";

// Start button shows board
startButton.addEventListener("click", function(){
  startScreen.style.display = "none";
  boardScreen.style.display = "initial";
});

function Board() {
  this.spot1 = spots[1];
  this.spot2 = spots[2];
  this.spot3 = spots[3];
  this.spot4 = spots[4];
  this.spot5 = spots[5];
  this.spot6 = spots[6];
  this.spot7 = spots[7];
  this.spot8 = spots[8];
  this.spot9 = spots[9];
}

Board.prototype.playerMove = function() {
  // if box is already checked, do nothing
  if (this.classList.contains('box-filled-1') || this.classList.contains('box-filled-2')) {
    return;
  }

  // otherwise mark the box and switch player turns
  if (player1.classList.contains('active')) {
    this.classList.add('box-filled-1');
    player1.classList.remove('active');
    player2.classList.add('active');
  } else {
    this.classList.add('box-filled-2');
    player2.classList.remove('active');
    player1.classList.add('active');
  }
};

Board.prototype.resetBoard = function() {
  // make player one start the game
  player1.classList.add('active');
  player2.classList.remove('active');

  // clear the board
  for (var i = 0; i < spots.length; i++) {
    spots[i].classList.remove('box-filled-1');
    spots[i].classList.remove('box-filled-2');
  }
};

// set up a new board
var board = new Board();
// reset it for the start of the game
board.resetBoard();

// bind clicks on board spots to playerMove
for (var i = 0; i < spots.length; i++) {
  spots[i].addEventListener("click", board.playerMove);
}

// TODO
// animate board clicks
//  special animation when clicking on spots already taken
