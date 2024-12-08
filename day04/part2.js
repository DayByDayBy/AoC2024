const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error when reading file: ", err);
    return;
  }

  const lines = data.trim().split("\n");
  const grid = lines.map((line) => line.split(""));

  const findValidAs = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;

    let count = 0;

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        if (grid[x][y] !== "A") continue;

        const diagonal1 = [
          [x - 1, y - 1],
          [x + 1, y + 1], 
        ];
        const diagonal2 = [
          [x - 1, y + 1],
          [x + 1, y - 1],
        ];

        const checkDiagonal = (diagonal) => {
          if (!diagonal.every(([dx, dy]) => isValid(dx, dy))) return false;

          const values = diagonal.map(([dx, dy]) => grid[dx][dy]);
          return (
            (values[0] === "M" && values[1] === "S") ||
            (values[0] === "S" && values[1] === "M") 
          );
        };

        if (checkDiagonal(diagonal1) && checkDiagonal(diagonal2)) {
          count++;
        }
      }
    }

    return count;
  };

  const occurrences = findValidAs(grid);
  log(`Number of valid A's: ${occurrences}`);
});
