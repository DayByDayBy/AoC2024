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

// path check
const isClear = (row, col, grid) =>{
    return (
        row >= 0 && row < grid.length &&
        col >= 0 && col < grid[0].length &&
        grid[row][col] === '.' 
    );
};





