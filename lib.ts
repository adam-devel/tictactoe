type MarkState =
  | "X" // Awaiting X's move
  | "O"; // Awaiting O's move

type FinalState =
  | "Tie" // Game ended with a tie
  | "Victory"; // Game ended with a victory

type Board = Array<Array<MarkState | null>>;

// Make a board given a side length
function makeBoard(sideLength: number): Board {
  const array: Board = [];
  for (let line = 0; line < sideLength; line++) {
    array[line] = [];
    for (let col = 0; col < sideLength; col++) {
      array[line][col] = null;
    }
  }
  return array;
}

class IlligalGameMoveError extends Error {}

// Compute the next state of the game given a board, the current state and a move
// this function does mutate the board, and yes, a mark is a game state, it's the state an ongoing game has
function play(
  board: Board,
  mark: MarkState,
  line: number,
  col: number,
): MarkState | FinalState {
  if (!line && line !== 0) {
    throw new IlligalGameMoveError(`the line coordinate of the move is falsy`);
  }
  if (!col && col !== 0) {
    throw new IlligalGameMoveError(
      "the column coordinate of the move is falsy",
    );
  }
  if (line < 0 || line >= board.length) {
    throw new IlligalGameMoveError(
      'the "line" part of the move is out of bound',
    );
  }
  if (col < 0 || col >= board[line].length) {
    throw new IlligalGameMoveError(
      'the "column" part of the move is out of bound',
    );
  }
  if (board[line][col] !== null) {
    throw new IlligalGameMoveError(
      "refusing to overwrite an already ocuppied cell",
    );
  }
  board[line][col] = mark;
  if (
    horizentalWin() || verticalWin() || diagonalWin() || oppositeDiagonalWin()
  ) {
    return "Victory";
  }
  function horizentalWin() {
    return board[line].every((cell) => cell === mark);
  }
  function verticalWin() {
    return board.every((line) => line[col] === mark);
  }
  function diagonalWin() {
    return board.every((row, rowIdx) => row[rowIdx] === mark);
  }
  function oppositeDiagonalWin() {
    return board.every((row, rowIdx) => row[row.length - rowIdx - 1] === mark);
  }
  if (!board.some((l) => l.some((c) => c === null))) {
    return "Tie";
  }
  return mark === "X" ? "O" : "X";
}

export type { Board };
export { makeBoard, play };
export type { FinalState, MarkState };
