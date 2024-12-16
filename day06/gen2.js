const fs = require("fs");
const path = require("path");

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const testInput = fs.readFileSync(
  path.join(__dirname, "small_data.txt"),
  "utf8"
);
const mainInput = fs.readFileSync(path.join(__dirname, "data.txt"), "utf8");

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
}

function findStart(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "^") return [r, c];
    }
  }
  throw new Error("no start (^) found");
}

function walkPath(inputGrid) {
  const grid = inputGrid.map(row => [...row]);
  
  let startPos = [-1, -1];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '^') {
        startPos = [i, j];
        grid[i][j] = '.';
        break;
      }
    }
    if (startPos[0] !== -1) break;
  }

  const visited = new Set();
  let pos = [...startPos];
  let dir = 0;

  visited.add(`${pos[0]},${pos[1]}`);

  while (true) {
    let nextPos = [
      pos[0] + DIRECTIONS[dir][0], 
      pos[1] + DIRECTIONS[dir][1]
    ];

    if (nextPos[0] < 0 || nextPos[0] >= grid.length || 
        nextPos[1] < 0 || nextPos[1] >= grid[0].length) {
      break;
    }

    if (grid[nextPos[0]][nextPos[1]] === '#') {
      dir = (dir + 1) % 4;
      continue;
    }
    pos = nextPos;
    visited.add(`${pos[0]},${pos[1]}`);
  }

  return visited;
}

function solveGrid(grid) {
  const visited = walkPath(grid);
  return visited.size;
}

function main() {
  const testGrid = parseInput(testInput);
  const mainGrid = parseInput(mainInput);

  console.log("test:", solveGrid(testGrid));
  console.log("main:", solveGrid(mainGrid));
}

main();