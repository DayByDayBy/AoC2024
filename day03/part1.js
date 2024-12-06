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

    while ((match = regex.exec(string)) !== null {
        if (match[1] && match[2]){
            mulStrArray.push(`mul${match[1]}, ${match[2]}`)
        }
    }
}
