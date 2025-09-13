function tictactoe() {
  let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  function place(mark, row, col) {
    if (row < 0 || row > 2) {
      return;
    }
    if (col < 0 || col > 2) {
      return;
    }
    if (mark == "x" || mark == "o") {
      board[row][col] = mark;
    }
  }

  function getBoardPosition(row, col) {
    return board[row][col];
  }

  function printBoard() {
    console.table(board);
  }

  return { place, getBoardPosition, printBoard };
}

function player() {
  let score = 0;

  function incrementScore() {
    score += 1;
  }

  function getScore() {
    return score;
  }

  return { incrementScore, getScore };
}

const keyMap = {
  1: [2, 0],
  2: [2, 1],
  3: [2, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [0, 0],
  8: [0, 1],
  9: [0, 2],
};

function userKeyPress(event) {
  if (event.key in keyMap) {
    console.log("[userKeyPress] key: " + event.key + " is mapped");
    return;
  }
  console.log("[userKeyPress] key not mapped");
}
const allowedKeys = ["q", "y"];

function game() {
  let newGame = new tictactoe(); // initialize a new game
  let humanPlayer = new player();
  let computerPlayer = new player();

  document.addEventListener("keydown", userKeyPress);

  newGame.place("x", 1, 1);
  newGame.place("o", 1, 2);
  // newGame.place("x",);
  let [x, y] = keyMap[1];
  console.log("value of x: " + x + ", y: " + y);

  // newGame.place("x", 1, 1);
  // newGame.place("o", 1, 2);
  // // newGame.place("x",);
  // let [x, y] = keyMap[1];
  // console.log("value of x: " + x + ", y: " + y);
  //
  // newGame.printBoard();
  // console.table(keyMap);
}

game();
