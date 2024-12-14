
// need these for sure 
DIRECTIONS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0,-1]
]



function walkGrid(){

}

function parseInput(input){
    const lines = input.trim().split('\n');
    const grid = lines.map(line => line.split('').map(char => char !== '#'));
    let startPos = null;

    for (let row=0; row< lines.length; row++) {
        for (let col = 0; col < lines[row].length; col++){
            if (lines[row][col] === '^'){
                startPos = [row, col];
            }
        }
    }
     if (!startPos) {
        throw new Error("guard (^) not found");
     }
return {grid, startPos};
}

function turnRight(directionIdx){
    return (directionIdx+1) % DIRECTIONS.length;
}

function isClear(grid, location, direction){
    const [row, col] = location;
    const [dRow, dCol] = direction;
    const newRow = row + dRow;
    const newCol = col + dCol;

    return (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        grid[newRow][newCol]
    );
}