(function(){
  var startScreen = document.getElementById('start');
  var startButton = document.querySelector('#start .button');
  var finishScreen = document.getElementById('finish');
  var boardScreen = document.getElementById('board');

  var player1 = document.getElementById('player1');
  var player2 = document.getElementById('player2');

  var spots = document.querySelectorAll('.box');
  var player1_spots = [];
  var player2_spots = [];
  const WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                [0, 4, 8], [2, 4, 6]]

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
      board.switchToPlayer(player2);
    } else {
      this.classList.add('box-filled-2');
      board.switchToPlayer(player1);
    }

    // check game status
    board.trackMoves();
    board.checkForWin();
    board.checkForTie();
  };

  // switch players
  Board.prototype.switchToPlayer = function(player) {
    if (player === player1) {
      // switch to player1
      player1.classList.add('active');
      boardScreen.classList.add('p1_active');
      player2.classList.remove('active');
      boardScreen.classList.remove('p2_active');
    } else {
      // switch to player2
      player2.classList.add('active');
      boardScreen.classList.add('p2_active');
      player1.classList.remove('active');
      boardScreen.classList.remove('p1_active');
    }
  };

  Board.prototype.resetBoard = function() {
    // make player one start the game
    player1.classList.add('active');
    boardScreen.classList.add('p1_active');
    player2.classList.remove('active');
    boardScreen.classList.remove('p2_active');

    // clear the board
    for (var i = 0; i < spots.length; i++) {
      spots[i].classList.remove('box-filled-1');
      spots[i].classList.remove('box-filled-2');
    }
    player1_spots = [];
    player2_spots = [];

    // clear finish screen styles
    finishScreen.classList.remove('screen-win-one');
    finishScreen.classList.remove('screen-win-two');
    finishScreen.classList.remove('screen-win-tie');
  };

  // track players moves
  Board.prototype.trackMoves = function() {
    for (var i = 0; i < spots.length; i++) {
      if (spots[i].classList.contains('box-filled-1')) {
        if (!player1_spots.includes(i)) {
          player1_spots.push(i);
        }
      } else if (spots[i].classList.contains('box-filled-2')) {
        if (!player2_spots.includes(i)) {
          player2_spots.push(i);
        }
      }
    }
  };

  // check if anyone has won
  Board.prototype.checkForWin = function() {
    WINNING_COMBINATIONS.forEach(function(combo) {
      var p1count = 0;
      var p2count = 0;

      combo.forEach(function(spot) {
        if (player1_spots.includes(spot)) {
          p1count++;
          if (p1count == 3) {
            board.showFinishScreen("screen-win-one");
          }
        } else if (player2_spots.includes(spot)) {
          p2count++;
          if (p2count == 3) {
            board.showFinishScreen("screen-win-two");
          }
        }
      })

    });
  };

  // check for a tie
  Board.prototype.checkForTie = function() {
    if (player1_spots.length + player2_spots.length == 9) {
      board.showFinishScreen("screen-win-tie");
    }
  };

  Board.prototype.showFinishScreen = function(winner) {
    finishScreen.classList.add(winner);

    if (winner == "screen-win-tie") {
      finishScreen.querySelector('.message').innerHTML = "It's a tie!";
    } else {
      finishScreen.querySelector('.message').innerHTML = "Winner!";
    }

    // Set up finish display
    startScreen.style.display = "none";
    boardScreen.style.display = "none";
    finishScreen.style.display = "initial";

    // Start button shows board
    finishScreen.querySelector('.button').addEventListener("click", function(){
      board.resetBoard();
      finishScreen.style.display = "none";
      startScreen.style.display = "none";
      boardScreen.style.display = "initial";
    });
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
}());
