function tictactoe() {
  let turn = 0;
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
    if (mark == "x" || mark == "o") {
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
  }

  function getTurn() {
    return turn;
  }

  function checkForWinCondition() {
    winCondition.forEach((cond) => {
      [x0, y0] = cond[0];
      [x1, y1] = cond[1];
      [x2, y2] = cond[2];
      console.log(
        "\n[checkForWinCondition] 0 getBoardPosition(" +
          x0 +
          "," +
          y0 +
          ") = " +
          getBoardPosition(x0, y0),
      );
      console.log(
        "[checkForWinCondition] 1 getBoardPosition(" +
          x1 +
          "," +
          y1 +
          ") = " +
          getBoardPosition(x1, y1),
      );
      console.log(
        "[checkForWinCondition] 2 getBoardPosition(" +
          x2 +
          "," +
          y2 +
          ") = " +
          getBoardPosition(x2, y2),
      );
      if (
        getBoardPosition(x0, y0) != " " &&
        getBoardPosition(x1, y1) != " " &&
        getBoardPosition(x2, y2) != " "
      ) {
        if (
          (getBoardPosition(x0, y0) == "x" &&
            getBoardPosition(x1, y1) == "x" &&
            getBoardPosition(x2, y2) == "x") ||
          (getBoardPosition(x0, y0) == "o" &&
            getBoardPosition(x1, y1) == "o" &&
            getBoardPosition(x2, y2) == "o")
        ) {
          console.log("A winning pattern found.");
        }
      }
    });
  }

  return {
    place,
    getBoardPosition,
    resetBoard,
    printBoard,
    getTurn,
    checkForWinCondition,
  };
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

const allowedKeys = ["q", "y", "r"];

// function userKeyPress() {
//   let keyEntry = 0;
//
//   /**
//    * NOTE: The method below was adopted after several tries with
//    *       using external functions and object. None was workable and
//    *       therefore this method was adopted. The source for this
//    *       solution:
//    *       https://stackoverflow.com/questions/17176046/pause-function-until-enter-key-is-pressed-javascript
//    *       Using an object to house the function, and let closure to return
//    *       the value captured from the keyboard.
//    */
//   function userKeyEntry() {
//     return new Promise((resolve) => {
//       document.addEventListener("keydown", onKeyHandler);
//       function onKeyHandler(event) {
//         if (event.key in keyMap || allowedKeys.indexOf(event.key) != -1) {
//           keyEntry = event.key;
//           document.removeEventListener("keydown", onKeyHandler);
//           resolve();
//         }
//       }
//     });
//   }
//
//   function getKeyEntry() {
//     return keyEntry;
//   }
//
//   return { getKeyEntry, userKeyEntry };
// }

let noOdin1sObjects = (function () {
  function userKeyPress() {
    // userKeyPress : function() {
    keyEntry: 0;

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
          if (event.key in keyMap || allowedKeys.indexOf(event.key) != -1) {
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

  return { userKeyPress };
})();

function computersDecision() {
  let boardPos = -1;
  let xPos = -1;
  let yPos = -1;

  function getNewPos() {
    xPos = Math.floor(Math.random() * 3);
    yPos = Math.floor(Math.random() * 3);

    boardPos = Object.keys(keyMap).find((key) => keyMap[key] === [xPos, yPos]);
  }

  function getXYPos() {
    return [xPos, yPos];
  }

  function getBoardPos() {
    return boardPos;
  }

  return { getNewPos, getXYPos, getBoardPos };
}

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

/**
 * NOTE: This function works. It still has some short comings,
 *         1. If all the spaces were filled up, then while() will
 *            be an infinite loop;
 *         2. The placements are random and no strategy added.
 
 **/
function computersMove(comp, game, mark) {
  let placement = false;
  // console.dir(game);
  while (!placement) {
    comp.getNewPos();
    [x, y] = comp.getXYPos();
    if (game.getBoardPosition(x, y) == " ") {
      game.place(mark, x, y);
      placement = true;
    }
  }
}

function humansMove(userEntry) {
  let placement = false;
  // human's turn
  while (!placement) {
    // await userInput.userKeyEntry();
    // // await userKeyPress;
    // userEntry = userInput.getKeyEntry();
    console.log("[game] userEntry: " + userEntry);
    if (userEntry in keyMap) {
      [x, y] = keyMap[userEntry];

      if (game.getBoardPosition(x, y) == " ") {
        game.place("x", x, y);
        // game.printBoard();
        placement = true;
      } else {
        console.log("[game] That position is occupied.");
      }
    }
  }
}

async function round() {
  let game = new tictactoe(); // initialize a new game
  let humanPlayer = user;
  let computerPlayer = computer;
  let compute = new computersDecision();

  let userEntry = 0;
  let userInput = noOdin1sObjects.userKeyPress();

    game.checkForWinCondition();
    if (userEntry == "r") {
      game.resetBoard();
      game.printBoard();
    }
  }
  console.log("[game] You have opted to quit");
}

round();
