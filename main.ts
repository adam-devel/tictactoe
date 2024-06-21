#!/usr/bin/env -S deno run

import * as ansi from "./ansi.ts";
import { Board, makeBoard, MarkState, play } from "./lib.ts";
import { coordinatesToIndex, indexToCoordinates } from "./utils.ts";

const stderr = Deno.stderr;
const stdinReader = Deno.stdin.readable.getReader();
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const theme = {
  cross: ansi.yellow,
  knot: ansi.blue,
  victory: ansi.green,
  tie: ansi.magenta,
  illigal: ansi.red,
  empty: ansi.dim,
  highlight: ansi.invert,
};

const sideLength = 3;
const board = makeBoard(sideLength);

// Start the game loop
loop("X");

async function loop(mark: MarkState, fail = false) {
  // Generate and render a frame
  let frame = "";
  frame += fail ? generateIlligalMessageUI() : generateHeaderUI();
  frame += generateBoardUI(board) + "\n" + generatePromptMessageUI(mark);
  stderr.writeSync(encoder.encode(ansi.erase() + frame));
  // Read user input
  const answer = decoder.decode((await stdinReader.read()).value);
  if (!answer) return loop(mark, true);
  const index = parseInt(answer);
  if (isNaN(index)) return loop(mark, true);
  const coordinates = indexToCoordinates(index, sideLength);
  if (!coordinates) return loop(mark, true);
  const [line, col] = coordinates;
  // Play the move
  try {
    const result = play(board, mark, line, col);
    switch (result) {
      case "X":
      case "O":
        return loop(result);
      case "Tie":
        tie();
        break;
      case "Victory":
        victory(mark);
        break;
    }
  } catch {
    return loop(mark, true);
  }
  // Renders a tie
  function tie() {
    const frame = generateTieMessageUI() + generateBoardUI(board) + "\n";
    stderr.writeSync(encoder.encode(ansi.erase() + frame));
  }
  // Renders a victory
  function victory(previousState: MarkState) {
    const frame = generateVictoryMessageUI(previousState) +
      generateBoardUI(board) + "\n";
    stderr.writeSync(encoder.encode(ansi.erase() + frame));
  }
}

function generateBoardUI(board: Board) {
  let frame = "";
  for (let line = 0; line < sideLength; line++) {
    frame += "\n";
    for (let col = 0; col < sideLength; col++) {
      const padding = Math.floor(
        Math.log10(sideLength ** 2) + 1 + /*number of spaces*/ 2,
      );
      const mark = board[line][col];
      switch (mark) {
        case "X":
          frame += theme.cross("X".padStart(padding));
          break;
        case "O":
          frame += theme.knot("O".padStart(padding));
          break;
        case null:
          frame += theme.empty(
            coordinatesToIndex(line, col, sideLength).toString().padStart(
              padding,
            ),
          );
          break;
      }
    }
  }
  return frame;
}

function generateHeaderUI() {
  return ansi.bold("Tic Tac Toe");
}
function generateTieMessageUI() {
  return theme.tie("Tie ") + "._.";
}
function generateIlligalMessageUI() {
  return theme.illigal("Illigal Move ") + "!";
}
function generateVictoryMessageUI(mark: MarkState) {
  switch (mark) {
    case "X":
      return theme.victory("Victory for Crosses ") + theme.cross("XD");
    case "O":
      return theme.victory("Victory for Knots ") + theme.knot(":O");
  }
}
function generatePromptMessageUI(mark: MarkState) {
  switch (mark) {
    case "X":
      return theme.cross("Cross ") + "at: ";
    case "O":
      return theme.knot("Knot ") + "at: ";
  }
}
