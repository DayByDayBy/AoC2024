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


const findInGrid = (grid, target, nextTarget) => {
    const rows = grid.length;
    const cols = grid[0].length;

    const directions = [
        [-1, -1], [-1, 0], [-1, -1],
        [0,-1], [0,1],
        [-1,1], [1, 0], [1, 1] 
    ]

    const isValid = (x, y) => x >= 0 & x < rows && y >= 0 && y < cols;

    const search = (x, y, dx, dy) => {

        const nx1 = x + dx, ny1 = y + dy;
        const nx2 = nx1 + dx, ny2 = ny1 + dy;
        const nx3 = nx2 + dx, ny3 = ny2 + dy;

        return(
            isValid(nx1, ny1) && grid[nx1][ny1] === 'M' &&
            isValid(nx2, ny2) && grid[nx2][ny2] === 'A' &&
            isValid(nx3, ny3) && grid[nx3][ny3] === 'S'
        );
    };

    let count = 0;


    for (let i = 0; i < rows; i++){
        for (let j =0; j < cols; j++) {
            if (grid[i][j] === 'X'){
                for (const [dx, dy] of directions){
                    if (search(i, j, dx, dy)){
                        count++
                        break
                    }
                }
            }
                    }
                }
                return count;
};

const occurences = findInGrid(twoDArray);
log(occurences);


// log(lines);
// log(twoDArray);


});

