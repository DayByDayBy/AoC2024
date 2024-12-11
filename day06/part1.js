const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

// gotdang i hate how messy this import style is
function readFromFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  try {
    const data = fs.readFileSync(filePath);
    return data
      .toString()
      .split("\n")
      .map((line) => line.split(""));
  } catch (err) {
    error(`error reading in file: ${err.message}`);
  }
}

//input
const mapInput = readFromFile("small_data.txt");
// const mapInput = readFromFile('data.txt');

// NESW
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function guardFind(matrix, char) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return null;
}

// path check
const isClear = (row, col, grid) => {
  return (
    row >= 0 &&
    row < grid.length &&
    col >= 0 &&
    col < grid[0].length &&
    grid[row][col] === "."
  );
};

// change direction
function nextDirection(currentIndex) {
  return (currentIndex + 1) % 4;
}

// main geezer

function pathFind(startPos, grid) {
  let [row, col] = startPos;
  let currDirection = 0;
  let count = 0;
  let visited = new Set();

  while (true) {
    const [dRow, dCol] = directions[currDirection];
    const newRow = row + dRow;
    const newCol = col + dCol;

    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length
    ) {
      log(`Reached edge of grid. Stopping at (${row}, ${col}).`);
      break;
    }

    if (!isClear(newRow, newCol, grid)) {
    currDirection = nextDirection(currDirection);
    } else {
        row = newRow;
        col = newCol;
        count++;
    }
  }
  return count;
}

const guardPos = guardFind(mapInput, "^");
if (guardPos) {
  const steps = pathFind(guardPos, mapInput);
  log(`Total steps taken: ${steps}`);
} else {
  log("nae guard found m8");
}
