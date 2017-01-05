var startScreen = document.getElementById('start');
var startButton = document.querySelector('#start .button');
var finishScreen = document.getElementById('finish');
var board = document.getElementById('board');

// Set up initial display
startScreen.style.display = "initial";
board.style.display = "none";
finishScreen.style.display = "none";

// Start button shows board
startButton.addEventListener("click", function(){
  startScreen.style.display = "none";
  board.style.display = "initial";
});
