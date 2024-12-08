const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "small_data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error when reading file: ", err);
    return;
  }

  const lines = data.trim().split("\n");
  const twoDArray = lines.map((line) => line.split(""));

  const findInGrid = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;

    // opposing pairs (if M is left-down S, needs to be right-up, etc)
    const directions = [
      [-1, -1, 1, 1],
      [-1, 1, 1, -1],
      [1, 1, -1, -1],
      [1, -1, -1, 1],
    ];

    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;

    const search = (x, y, visited) => {
      
        const word = "MAS";

      for (const [dx1, dy1, dx2, dy2] of directions) {

        const nx1 = x + dx1,
          ny1 = y + dy1;
        const nx2 = x + dx2,
          ny2 = y + dy2;

        if (
          isValid(nx1, ny1) &&
          grid[nx1][ny1] === "M" &&
          isValid(nx2, ny2) &&
          grid[nx2][ny2] === "S"
        ) {
          visited[nx1][ny1] = true;
          visited[nx2][ny2] = true;
          return true;
        }
      }
      return false;
    };

    let count = 0;
    const visited = Array.from({ length: rows}, () => Array(cols).fill(false));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === "A" && !visited[i][j]) {
            if (search(i, j, visited)) {
              count++;
            }
          }
        }
    }
    return count;
  };
  const occurrences = findInGrid(twoDArray);
  log(occurrences);
});
