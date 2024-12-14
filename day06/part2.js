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
  const grid = lines.map((line) => line.split(""));
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

        if(grid[row,col] !== '#'){
  return true;
} else {
    return false;
}
}

function walkGrid(grid, startPos) {
  const visitedGrid = grid.map((row) => row.map((cell) => (cell ? "." || "^": "#")));

  const visited = new Set();
  let directionIdx = 0;
  let [row, col] = startPos;

  let revisit_count = 0;
  const MAX_REVISITS = 1000;


  while (revisit_count < MAX_REVISITS) {
    const direction = DIRECTIONS[directionIdx];

    if (isClear(grid, [row, col], direction)) {
      row += direction[0];
      col += direction[1];
    
      const pos = `${row},${col}`;
      if(!visited.has(pos)){
      visited.add(`${row},${col}`);}
    } else {
      directionIdx = turnRight(directionIdx);
    } 
    console.log(`Moved to (${row}, ${col}).`);
    revisit_count++;
  }

  //   console.log("Visited cells:", [...visited]);
  //   console.log("Total visited cells:", visited.size);
  console.log(visitedGrid.map((row) => row.join("")).join("\n"));
  return visited.size;
}

const { map, startPos }  = parseInput(input);
console.log("visited squares: ", walkGrid(map, startPos));