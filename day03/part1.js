const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("error when reading file: ", err);
    return;
  }

});



string = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"

split = string.split(')');

console.log(split);



const regex = /mul\((\d+),(\d+)\)|mul\(.*?\)/g;

function splitMulString(string){

    let mulStrArray = [];
    let match;

    while (true) {
        const match = regex.exec(s);
        if (!match) break;

        const aMatch = match[1];
        const bMatch = match[2];
        const bracketMatch = match[3];

        if (bracketMatch && !/[a-zA-Z]/.test(bracketMatch)){
            string = string.substring(0, regex.lastIndex) + string.substring(regex.index + match[0].length)
            continue;
        }

        const a = parseInt(aMatch);
        const b = parseInt(bMatch);

        if (isNaN(a) || isNaN(b)){
            continue;
        }
        // console.log(match);


    }
};


const s = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
console.log(splitMulString(s));
