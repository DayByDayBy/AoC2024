const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "small_data.txt");
const fileContent = fs.readFileSync(filePath, "utf8");


fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("error when reading file: ", err);
      return;
}

const lines = data.trim().split("\n");
const twoDArray = lines.map(line => line.split(""));

const findInGrid = (grid) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [1, -1], [1, 0], [1, 1],

        [0,-1], [0,1],
        
        [-1,1], [-1, 0], [-1, 1]
    ]

    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;

    const search = (x, y, dx, dy) => {

        const xmas = "XMAS";

        for (let k = 1; k < xmas.length; k++){

        const nx = x + k * dx, ny = y + k * dy;
        if (!isValid(nx, ny) || grid[nx][ny] !== xmas[k]) {
            return false;
        }
    }
    return true;
};
    let count = 0;

    for (let i = 0; i < rows; i++) {
        for (let j =0; j < cols; j++) {
            if (grid[i][j] === 'X'){
                for (const [dx, dy] of directions) {
                    if (search(i, j, dx, dy)) {
                        count++
                    }
                }
            }
        }
    }
                return count;
};

const occurences = findInGrid(twoDArray);
log(occurences);


});

