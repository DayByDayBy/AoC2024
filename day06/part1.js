const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

function readFromFile(fileName){
    const filePath = path.join(__dirname, fileName);
    try{
        const data = fs.readFileSync(filePath);
        return data.toString();

    }catch(err){
        error(`error reading in file: ${err.message}`)
    }
}

//input
const mapInput = readFromFile('small_data.txt')

// NESW
const directions = [
    [-1,0], 
    [0,1],
    [1,0],
    [0,-1]
]
let direction = directions[0];

const guardFind(matrix, char) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === char) {
                return [i,j];
            }
        }
    }
    return null;
}

const guardPos = guardFind(matrix, '^');


// path check
const isClear = (row, col, grid) =>{
    return (
        row >= 0 && row < grid.length &&
        col >= 0 && col < grid[0].length &&
        grid[row][col] === '.' 
    );
};

// change direction
function nextDirection(currentIndex) {
    return (currentIndex + 1) % 4; // Move to the next direction, cycling back to 0 after 3
}




// const directionCalc = (position, directions){
//     for (i=0; i< directions.length; i++) {
//         const [dRow, dCol] = directions[i];
//         if (!isClear && directions[0]){
//             direction = direction[i+1]
//     }
    
// }


function pathFind(guardPos, grid){
    while (
        guardPos[0] > 0 && 
        guardPos[0] < grid.length &&
        guardPos[1] > 0 &&
        guardPos[1] < grid[0].length){

        }

    if((guardPos + direction) === isClear){
        guardPos = guardPos+direction;
    } else {directionCalc}


}
