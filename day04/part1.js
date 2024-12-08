// 140 by 140 grid again
// probably do the ole 2d array?

//   maybe matching x and then checking adjacent squares for M
//        - none, move on, 
//        - find one, continue in that direction and check for an A, 
//        - none, move on, check for S

//      a bit slow, tho 
//   maybe check for easy ones first? do a l-r pass, then a top-bottom pass? if so, probably double check xmas and samx?
// 


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


const findMatches = (grid, target, nextTarget) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const results = [];

    const directions = [
        [-1, -1], [-1, 0], [-1, -1],
        [0,-1], [0,1],
        [-1,1], [1, 0], [1, 1] 
    ]

    const isValid = (x, y) => x >= 0 & x < rows && y >= 0 && y < cols;


    for (let i = 0; i < rows; i++){
        for (let j =0; j < cols; j++) {
            if (grid[i][j] === target){
                for (const [dx, dy] of directions){
                    const ni = i +dx;
                    const nj = j + dy;

                    if (isValid(ni, nj) && grid[ni][nj] === nextTarget){
                        results.push({
                            target: {row: i, col: j},
                            neighbour: {row: ni, col: nj },
                        });
                    }
                }
            }
        }
    }
return results;

};


const matches = findMatches(twoDArray, 'X', 'M');
log(matches);


// log(lines);
// log(twoDArray);


});

