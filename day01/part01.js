const fs = require("fs");
const path = require("path");

const filePath = (__dirname, "small_data.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("error when reading file: ", err);
    return;
  }

  const pairs = data
    .trim()
    .split("\n")
    .filter(line => line.trim() !='')
    .map(line => 
        line
        .trim()
        .split(/\s+/)
        .map(Number)).filter(pair => pair.length == 2 && pair.every(n => !isNaN(n)));

//   console.log("pairs:", pairs);






});
