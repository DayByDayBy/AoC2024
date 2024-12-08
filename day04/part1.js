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


// log(lines);
// log(twoDArray);


});

