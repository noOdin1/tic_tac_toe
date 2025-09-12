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

  function printBoard() {
    console.table(board);
  }

  return { place, printBoard };
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

let keyMap = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
};

newGame.place("x", 1, 1);
newGame.printBoard();
