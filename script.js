let noOdin1sObjects = (function () {
  function userKeyPress() {
    let keyEntry = 0;

    /**
     * NOTE: The method below was adopted after several tries with
     *       using external functions and object. None was workable and
     *       therefore this method was adopted. The source for this
     *       solution:
     *       https://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript
     *       Using an object to house the function, and let closure to return
     *       the value captured from the keyboard.
     */
    function userKeyEntry() {
      return new Promise((resolve) => {
        document.addEventListener("keydown", onKeyHandler);
        function onKeyHandler(event) {
          if (
            event.key in noOdin1sObjects.keyMap ||
            allowedKeys.indexOf(event.key) != -1
          ) {
            keyEntry = event.key;
            document.removeEventListener("keydown", onKeyHandler);
            resolve();
          }
        }
      });
    }

    function getKeyEntry() {
      return keyEntry;
    }

    return { getKeyEntry, userKeyEntry };
  }

  function tictactoe() {
    let turn = 0;
    let winner = -1;
    let board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    const winCondition = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    function place(mark, row, col) {
      if (row < 0 || row > 2) {
        return;
      }
      if (col < 0 || col > 2) {
        return;
      }
      if (mark == "X" || mark == "O") {
        board[row][col] = mark;
      }
      turn += 1;
    }

    function getBoardPosition(row, col) {
      return board[row][col];
    }

    function printBoard() {
      console.table(board);
    }

    function resetBoard() {
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          board[i][j] = " ";
        }
      }
      resetWinner();
    }

    function getTurn() {
      return turn;
    }

    function getWinner() {
      return winner;
    }

    function resetWinner() {
      winner = -1;
    }

    function countEmptySpaces() {
      let count = 0;
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          count = getBoardPosition(i, j) == " " ? count + 1 : count;
        }
      }
      return count;
    }

    function checkForWinCondition() {
      winCondition.forEach((cond) => {
        let [x0, y0] = cond[0];
        let [x1, y1] = cond[1];
        let [x2, y2] = cond[2];
        if (
          getBoardPosition(x0, y0) != " " &&
          getBoardPosition(x1, y1) != " " &&
          getBoardPosition(x2, y2) != " "
        ) {
          if (
            (getBoardPosition(x0, y0) == "X" &&
              getBoardPosition(x1, y1) == "X" &&
              getBoardPosition(x2, y2) == "X") ||
            (getBoardPosition(x0, y0) == "O" &&
              getBoardPosition(x1, y1) == "O" &&
              getBoardPosition(x2, y2) == "O")
          ) {
            winner = getBoardPosition(x0, y0);
            console.log(`The winner is ${winner}`);
          }
        }
      });
      return winner === -1 ? false : true;
    }

    return {
      place,
      getBoardPosition,
      resetBoard,
      printBoard,
      getTurn,
      getWinner,
      resetWinner,
      countEmptySpaces,
      checkForWinCondition,
    };
  }

  function computersMove() {
    let boardPos = -1;
    let xPos = -1;
    let yPos = -1;

    function getNewPos() {
      xPos = Math.floor(Math.random() * 3);
      yPos = Math.floor(Math.random() * 3);

      boardPos = Object.keys(noOdin1sObjects.keyMap).find(
        (key) => noOdin1sObjects.keyMap[key] === [xPos, yPos],
      );
    }

    function getXYPos() {
      return [xPos, yPos];
    }

    function getBoardPos() {
      return boardPos;
    }

    return { getNewPos, getXYPos, getBoardPos };
  }

  function placeMarker(xPos, yPos, marker, game) {
    // successful marker placement
    if (game.getBoardPosition(xPos, yPos) == " ") {
      game.place(marker, xPos, yPos);
      return true;
    }
    return false;
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

  const allowedKeys = ["q", "y", "r", "n"];

  return { keyMap, allowedKeys, userKeyPress, tictactoe };
  return {
    keyMap,
    allowedKeys,
    userKeyPress,
    tictactoe,
    computersMove,
    placeMarker,
  };
})();

/* Define prototype for game participants */
/* User will be the template for human and computer */
let user = {
  name: "",
  setName(name) {
    this.name = name;
  },
  getName() {
    return this.name;
  },
  incrementScore() {
    this.score += 1;
  },
  decrementScore() {
    this.score -= 1;
  },
  getScore() {
    return this.score;
  },
  printScore() {
    console.log("[" + this.name + "] score is " + this.score);
  },
};

let human = {
  score: 0,
  __proto__: user, // the prototype
};

let computer = {
  score: 0,
  __proto__: user, // the prototype
};

async function round() {
  let game = noOdin1sObjects.tictactoe(); // initialize a new game
  let humanPlayer = user;
  let computerPlayer = computer;
  let comp = noOdin1sObjects.computersMove();

  let userEntry = 0;
  let userInput = noOdin1sObjects.userKeyPress();
  let humansTurn = true;

  while (userEntry != "q") {
    let placement = false;
    let marker = 0;
    let xPos = 0,
      yPos = 0;
    let choice = 0;
    while (!placement) {
      if (humansTurn) {
        await userInput.userKeyEntry();
        [xPos, yPos] = noOdin1sObjects.keyMap[userInput.getKeyEntry()];
        marker = "X";
      } else {
        comp.getNewPos();
        [xPos, yPos] = comp.getXYPos();
        marker = "O";
      }
      console.log("[round] xPos: " + xPos + ", yPos: " + yPos);
      placement = noOdin1sObjects.placeMarker(xPos, yPos, marker, game)
        ? true
        : false;
      humansTurn = placement ? !humansTurn : humansTurn;
    }
    game.printBoard();
    game.checkForWinCondition();
  }
  console.log("[game] You have opted to quit");
}

round();
