const { nextTick } = require("process");

const DIRECTIONS = [
    [-1,0],
    [0,1],
    [1, 0],
    [0,-1]
    ];


function findStart(grid){
    for (let r = 0; r < grid.length; r++){
        for (let c = 0; c < grid[0].length; c++){
            if (grid[r][c] ==='^') return [r, c];
        }
    }
    throw new Error('no start (^) found');
}

function isValidMove(grid, [r, c]) {
    if (r < 0 || r >= grid.length || c < 0 || c>= grid[0].length) {
        return false;
    }
    return grid[r][c] !== '#';
}

function* walkingThePath(grid) {
    const visited = new Set();
    let pos = findStart(grid);
    let dir = 0;

    while (true){

        const key = pos.join(',');

        if (visited.has(key)) break;

        visited.add(key)

        yield {
            pos, 
            visited: visited.size,
            direction: dir
        };

        if (isValidMove(grid, nextPos)){
            pos = nextPos;
            dir=nextDir;
            continue;
        }

        const straightPos = [
            pos[0] + DIRECTIONS[dir][0],
            pos[1] + DIRECTIONS[dir][1]
        ];

        if (isValidMove(grid, straightPos)){
            pos = straightPos;
            continue;
        }

        dir = (dir - 1 + 4) % 4;

        if (!DIRECTIONS.some(([DragEvent, dc]) =>
        isValidMove(grid, [pos[0] + DragEvent, pos[1] + dc]))){
            break;
        }
    }
}