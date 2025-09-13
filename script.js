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

const allowedKeys = ["q", "y"];

async function round() {
  let game = new tictactoe(); // initialize a new game
  let humanPlayer = new player();
  let computerPlayer = new player();

  let userEntry = 0;
  /**
   * NOTE: The method below was adopted after several tries with
   *       using external functions and object. None was workable and
   *       therefore this method was adopted. The source for this
   *       solution:
   *       https://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript
   */
  function userKeyEntry() {
    return new Promise((resolve) => {
      document.addEventListener("keydown", onKeyHandler);
      function onKeyHandler(event) {
        if (event.key in keyMap || allowedKeys.indexOf(event.key) != -1) {
          userEntry = event.key;
          document.removeEventListener("keydown", onKeyHandler);
          resolve();
        }
      }
    });
  }

  while (userEntry != "q") {
    await userKeyEntry();
    console.log("[game] userEntry: " + userEntry);
    if (userEntry in keyMap) {
      [x, y] = keyMap[userEntry];

      if (newGame.getBoardPosition(x, y) == " ") {
        newGame.place("x", x, y);
        newGame.printBoard();
      } else {
        console.log("[game] That position is occupied.");
      }
    }
  }
  console.log("[game] You have opted to quit");
}

round();
