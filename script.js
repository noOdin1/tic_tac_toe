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
          /* Resetting the web page board */
          // let tmpId = noOdin1sObjects.reverseKeyLookup(i, j);
          let tmpId = reverseKeyLookup(i, j);
          // console.log("[resetBoard] tmpId: " + tmpId);
          let tmpBtn = document.getElementById("button_" + tmpId);
          if (tmpBtn.classList.contains("placed")) {
            tmpBtn.classList.remove("placed");
            tmpBtn.textContent = tmpId;
          }
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

    function reverseKeyLookup(row, col) {
      // let tmp = 0;
      /**
       * NOTE: There was an issue of using this block of code previously.
       *       When the comparison was made between noOdin1sObjects.keyMap[key]
       *       with [row, col], the condition returned was always false. I started
       *       to printout the individual components of the statement and found that
       *       the comparison is done between 2 objects. There's unknown composition
       *       to the objects and that's why it fails. The solution is shown below,
       *       to compare the basic values of keyMap and [row, col].
       *       I might change this code so that there's actually a function to handle
       *       the reverseKeyLookup.
       */
      // tmp = Object.keys(noOdin1sObjects.keyMap).find(
      return Object.keys(noOdin1sObjects.keyMap).find(
        // (key) => noOdin1sObjects.keyMap[key] == [row, col],
        (key) =>
          noOdin1sObjects.keyMap[key][0] === row &&
          noOdin1sObjects.keyMap[key][1] === col,
      );
      // return tmp;
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
      reverseKeyLookup,
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

  function btnFunction(event) {
    console.log("[btnFunction] button id: " + event.target.id);

    let btn_id = event.target.id.replace("button_", "");
    const keypress_event = new KeyboardEvent("keydown", { key: `${btn_id}` });
    // console.dir(this);
    document.dispatchEvent(keypress_event);
  }

  function toggleTurn(event) {
    if (this.checked) {
      turnTxt.textContent = "second";
      document.getElementById("playerTurnHidden").disabled = true;
    } else {
      turnTxt.textContent = "first";
      document.getElementById("playerTurnHidden").disabled = false;
    }
  }

  function toggleMarker(event) {
    if (this.checked) {
      markerTxt.textContent = "O";
      document.getElementById("playersMarkerHidden").disabled = true;
    } else {
      markerTxt.textContent = "X";
      document.getElementById("playersMarkerHidden").disabled = false;
    }
  }

  function formSubmit(event) {
    event.preventDefault();

    // const data = new FormData(form);
    const data = new FormData(this);
    for (const [name, value] of data) {
      console.log("[formSubmit] name: " + name + ", value: " + value);
    }
    // let tmpBook = new Book();
    for (const [name, value] of data) {
      if (name === "playersName") {
        human.setName(value);
      }
      if (name === "playersTurn") {
        human.getTurn() !== value ? human.switchTurn() : null;
      }
      if (name === "playersMarker") {
        human.getMarker() !== value ? human.switchMarker() : null;
      }
    }
    /* Reset the player's information form */
    this.reset();
    // The following needs to be explicitly 'reset'
    document.getElementById("turnTxt").textContent = "first";
    document.getElementById("markerTxt").textContent = "X";

    /* Making the fieldset disabled is not enough. */
    document.getElementById("formFieldset").disabled = true;
    disableFormItems();
    round(human);
  }

  function disableFormItems() {
    let item1 = (document.getElementById("playerNameInput").disabled = true);
    let items = document.getElementsByClassName("toLighten");
    Array.from(items).forEach((elem) => elem.classList.add("lighten"));
  }

  function placeMarkerOnBtn(game, marker) {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        if (game.getBoardPosition(i, j) != " ") {
          console.log("i: " + i + ", j: " + j);
          let tmpPos = game.reverseKeyLookup(i, j);
          console.log("[round] board position: " + tmpPos);
          let tmpBtn = document.getElementById("button_" + tmpPos);
          if (!tmpBtn.classList.contains("placed")) {
            tmpBtn.classList.add("placed");
            tmpBtn.textContent = marker;
          }
        }
      }
    }
  }

  function showScore() {
    /* Display initial score on scoreboard */
    let firstPlayerScoreDisplay = document.getElementById("firstPlayerScore");
    let secondPlayerScoreDisplay = document.getElementById("secondPlayerScore");

    firstPlayerScoreDisplay.textContent =
      human.getTurn() === "first" ? human.getScore() : computer.getScore();
    secondPlayerScoreDisplay.textContent =
      human.getTurn() === "second" ? human.getScore() : computer.getScore();
  }

  async function round(human) {
    let game = tictactoe(); // initialize a new game
    let computerPlayer = computer;
    let comp = computersMove();

    console.log(
      "[round] human name: " +
        human.getName() +
        ", turn: " +
        human.getTurn() +
        ", marker: " +
        human.getMarker(),
    );

    let userEntry = 0;
    let userInput = userKeyPress();
    let humansTurn = human.getTurn() === "first" ? true : false;

    let btnCollection = document.getElementsByClassName("boardSpace");
    Array.from(btnCollection).forEach((elem) =>
      elem.addEventListener("click", btnFunction),
    );

    /* Display name on scoreboard */
    document.getElementById("firstPlayerName").textContent =
      human.getTurn() === "first" ? human.getName() : "computer";
    document.getElementById("secondPlayerName").textContent =
      human.getTurn() === "second" ? human.getName() : "computer";

    game.printBoard();
    while (true) {
      showScore();
      let placement = false;
      let marker = 0;
      let xPos = 0,
        yPos = 0;
      let choice = 0;
      while (!placement) {
        if (humansTurn) {
          await userInput.userKeyEntry();
          [xPos, yPos] = keyMap[userInput.getKeyEntry()];
          marker = human.getMarker();
        } else {
          comp.getNewPos();
          [xPos, yPos] = comp.getXYPos();
          marker = human.getMarker() === "X" ? "O" : "X";
        }
        placement = placeMarker(xPos, yPos, marker, game) ? true : false;
        if (!placement) {
          console.log("Space already occupied, choose another");
        }
        humansTurn = placement ? !humansTurn : humansTurn;
      }
    }
  /**
   * Delay function, src:
   *   https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
   * As usual, the calling function must have 'async' and on the statement
   * calling delay, it must be preceeded by 'await'.
   **/
  const delay = (milisecond) =>
    new Promise((resolve) => setTimeout(resolve, milisecond));

  /* Define prototype for game participants */
  /* User will be the template for human and computer */
  let user = {
    name: "",
    marker: "X",
    turn: "first",
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
    getMarker() {
      return this.marker;
    },
    switchMarker() {
      this.marker = this.marker === "X" ? "O" : "X";
    },
    getTurn() {
      return this.turn;
    },
    switchTurn() {
      this.turn = this.turn === "first" ? "second" : "first";
    },
    printScore() {
      console.log("[" + this.name + "] score is " + this.score);
    },
  };

  let human = {
    score: 0,
    turn: "first",
    __proto__: user, // the prototype
  };

  let computer = {
    score: 0,
    __proto__: user, // the prototype
  };

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

  return {
    keyMap,
    allowedKeys,
    userKeyPress,
    tictactoe,
    computersMove,
    placeMarker,
    btnFunction,
    placeMarkerOnBtn,
    delay,
    user,
    human,
    computer,
    toggleMarker,
    toggleTurn,
    formSubmit,
  };
})();

noOdin1sObjects.startGame();
