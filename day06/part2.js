const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "small_data.txt"), "utf8");

DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function parseInput(input) {
  const lines = input.trim().split("\n");
  const grid = lines.map((line) => line.split("").map((char) => char !== "#"));
  let startPos = null;

  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      if (lines[row][col] === "^") {
        startPos = [row, col];
      }
    }
  }
  if (!startPos) {
    throw new Error("guard (^) not found");
  }
  return { grid, startPos };
}

function turnRight(directionIdx) {
  return (directionIdx + 1) % DIRECTIONS.length;
}

function isClear(grid, location, direction) {
  const [row, col] = location;
  const [dRow, dCol] = direction;
  const newRow = row + dRow;
  const newCol = col + dCol;

  return (
    newRow >= 0 &&
    newRow < grid.length &&
    newCol >= 0 &&
    newCol < grid[0].length &&
    grid[newRow][newCol]
  );
}

function walkGrid(grid, startPos) {
 
  const visited = new Set();
  let directionIdx = 0;
  let [row, col] = startPos;

  let revisit_count = 0; 
  const MAX_REVISITS = 1000;

  visited.add(`${row}, ${col}`);

  while (revisit_count < MAX_REVISITS) {

    const direction = DIRECTIONS[directionIdx];

    if (isClear(grid, [row, col], direction)) {
      row += direction[0];
      col += direction[1];
      visited.add(`${row}, ${col}`);
    } else {
      directionIdx = turnRight(directionIdx);
    }
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      break;
    }
    revisit_count++;
  }
  return visited.size;
}

const { grid, startPos } = parseInput(input);
console.log("visited squares: ", walkGrid(grid, startPos));
