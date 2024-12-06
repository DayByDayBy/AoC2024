const fs = require("fs");
const path = require("path");

const filePath = (__dirname, "data.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("error when reading file: ", err);
    return;
  }

  const pairs = data
    .trim()
    .split("\n")
    .filter((line) => line.trim() != "")
    .map((line) => line.trim().split(/\s+/).map(Number))
    .filter((pair) => pair.length == 2 && pair.every((n) => !isNaN(n)));

//   console.log("pairs:", pairs);

  const leftNumSorted = pairs.map(pair => pair[0]).sort((a, b) => a-b);
  const rightNumSorted = pairs.map(pair => pair[1]).sort((a, b) => a-b);

//   console.log("left:", leftNumSorted);
//   console.log("right:", rightNumSorted);

  const differences = leftNumSorted.map((num, index) =>
    Math.abs(num - rightNumSorted[index])
  );

//   console.log("differences:", differences);
//   console.log(differences.reduce((left, right) => left + right, 0));

const occurrences = {};


leftNumSorted.forEach(value => {
    occurrences[value] = rightNumSorted.filter(num => num === value).length
});
console.log('occ:', occurrences);

totals = leftNumSorted.map( value => value * rightNumSorted.filter(num => num === value).length);
 console.log('totals:', totals);

similarity_score = totals.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


console.log('similarity score:', similarity_score);


})