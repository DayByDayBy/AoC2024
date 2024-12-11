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
];

function guardFind(matrix, char) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === char) {
                return [i,j];
            }
        }
    }
    return null;
}

const startPos = guardFind(matrix, '^');


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



// main geezer
function pathFind(startPos, grid){

    let [row, col] = startPos
    let currDirection = directions[0];

    while (true) {
        const [dRow, dCol] = directions[currDirection];
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (isClear(newRow, newCol, grid)){
            row = newRow;
            col = newCol;

        } else {
            currDirection = nextDirection(currDirection);

        }

        if (
            (row + directions[currentDirection][0] < 0 || row + directions[currentDirection][0] >= grid.length) ||
            (col + directions[currentDirection][1] < 0 || col + directions[currentDirection][1] >= grid[0].length)
        
        ){
        log(`Reached edge of grid. Stopping at (${row}, ${col}).`);
        break;
    }
}
}


const guardPos = guardFind(mapInput, '^');
if (guardPos){
    pathFind(guardPos, mapInput);
} else {
    log("nae guard found m8");
}