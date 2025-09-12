function gameboardObject() {
  let board = [
    ["e", "e", "e"],
    ["e", "e", "e"],
    ["e", "e", "e"],
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

}

