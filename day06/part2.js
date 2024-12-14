
// need these for sure 
directiions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0,-1]
]
// probably these, maybe a 'catchall' that runs em?
function turnRight(){

}

function isClear(){

}

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