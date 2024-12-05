const fs = require("fs");
const path = require("path");

const filePath = (__dirname, "data.txt");

fs.readFile(filePath, "utf-8", (_, data) => {


  const pairs = data.trim().split("\n").map(line => line.trim().split(/\s+/).map(Number))
    .filter(pair => pair.length == 2 && pair.every(n => !isNaN(n)));

  const [left, right] = [pairs.map(pair => pair[0]), pairs.map(pair => pair[1])];

  const differences = left.map((num, index) => Math.abs(num - right[index]));
  const occurrences = right.reduce((occ, val) => (occ[val] = (occ[val] || 0) + 1, occ), {});
  const totals = left.map(value => value * (occurrences[value] || 0));
  

  console.log("similarity score:", totals.reduce((a, b) => a + b, 0));
  console.log("difference_sum:", differences.reduce((a, b)=> a + b, 0));
});

