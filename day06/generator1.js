const fs = require("fs");
const path = require("path");


// NESW
const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];


// the data
const testInput = fs.readFileSync(
  path.join(__dirname, "small_data.txt"),
  "utf8"
);
const mainInput = fs.readFileSync(
    path.join(__dirname, "data.txt"), 
    "utf8"
);

function parseInput(input) {
    return input.trim().split('\n').map(line => line.split(''));
  }





function findStart(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "^") return [r, c];
    }
  }
  throw new Error("no start (^) found");
}

function isValidMove(grid, [r, c]) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
    return false;
  }
  return grid[r][c] !== "#";
}

function* walkingThePath(grid) {
  const visited = new Set();
  let pos = findStart(grid);
  let dir = 0;

  while (true) {
    const key = pos.join(",");

    if (visited.has(key)) break;

    visited.add(key);

    yield {
      pos,
      visited: visited.size,
      direction: dir,
    };

    if (isValidMove(grid, nextPos)) {
      pos = nextPos;
      dir = nextDir;
      continue;
    }

    const straightPos = [
      pos[0] + DIRECTIONS[dir][0],
      pos[1] + DIRECTIONS[dir][1],
    ];

    if (isValidMove(grid, straightPos)) {
      pos = straightPos;
      continue;
    }
      break;
    }
  }

function solveGrid(grid) {
  const walkinHere = walkingThePath(grid);

  let lastState;
  for (const state of walkinHere) {
    lastState = state;
  }
  return lastState ? lastState.visited : 0;
}


function main(){
    const testGrid = parseInput(testInput);
    const mainGrid = parseInput(mainInput);

    console.log("test:", solveGrid(testGrid));
    console.log("main:", solveGrid(mainGrid));

}