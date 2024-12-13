const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

function readFromFile(fileName) {
  const filePath = path.join(__dirname, fileName);
  try {
    const data = fs.readFileSync(filePath);
    return data.toString().split("\n").map(line => line.trim());
  } catch (err) {
    error(`error reading in file: ${err.message}`);
  }
}


function walking(mandem){
    let start = null;
    for (let i = 0; i < mandem.length; i++){
        for(let j = 0; j < mandem[i].length; j++){
            if (mandem[i][j] === '^') {
                start = { x: j, y: i };
                break;
            }
        }
        if (start) break;
    }
    const directions = [
        {x:0, y:-1},
        {x:1, y:0},
        {x:0, y:1},
        {x:-1, y:0},
      ];

      let pos = start;
      let directionIdx = 0;
      let seen = new Set();
      let path = new Set();

      while (true) {
        const key = `${pos.x}, ${pos.y}, ${directionIdx}`;
        log(pos.y, pos.x);

        if (seen.has(key)) break;
        
        seen.add(key);
        path.add(`${pos.x}, ${pos.y}`);

        let dir = directions[directionIdx]
        let newPos = { x: pos.x + dir.x, y: pos.y + dir.y};


        if ((pos+dir) === '#'){
            directionIdx= (directionIdx + 1) % 4;
        } else {
            pos = newPos;
        }
        if (
            pos.x < 0 ||
            pos.x >= mandem[0].length ||
            pos.y < 0 ||
            pos.y >= mandem.length
        ) {
            break;
        }
      }
      return { path, steps: path.size }

}

const mapInput = readFromFile("small_data.txt");
const result = walking(mapInput);
log(`total steps: ${result.steps}`);