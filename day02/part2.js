const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("error when reading file: ", err);
    return;
  }

  const lines = data.trim().split("\n");
  const reports = lines.map((line) => line.split(" ").map(Number));
  const limit = 3;

  const isAscending = (row) =>
    row.every((value, i) => i === 0 || (value > row[i - 1] && value - row[i - 1] <= limit));

  const isDescending = (row) =>
    row.every((value, i) => i === 0 || (value < row[i - 1] && row[i - 1] - value <= limit));


  const isValidSequence = (row, limit, isAscending) => 
    row.some((_, removeIndex) => {
      const modifiedRow = row.filter((_, index) => index !== removeIndex);
      return modifiedRow.every((value, i) => {
        if (i === 0) return true;
        const gap = Math.abs(value - modifiedRow[i-1]);
        if (isAscending) {
          return value > modifiedRow[i - 1] && gap <= limit;
        } else {
          return value < modifiedRow[i - 1] && gap <= limit;
        }
    });
});

let safeCount = 0;

//   const results = reports.map((row) => {
//     const isAscending = row.every((value, i) => i === 0 || (value > row[i-1]) && Math.abs(value - row[i-1]) <= limit);
//     const isDescending = row.every((value, i) => i === 0 || (value < row[i-1]) && Math.abs(value - row[i-1]) <= limit);  
//     if (isAscending || isDescending ) return true;
//     for (let i = 0; i < row.length; i++) {
//         const modifiedRow = [...row];
//         delete modifiedRow[1];

//         if (modifiedRow.every((value) => 0) && modifiedRow.ever((value) => value <= limit)) return true;
//         if (modifiedRow.every((value) => 0) && modifiedRow.ever((value) => value >= limit)) return true;}
//         return false;
//   });

//   const safe = results.filter(Boolean).length;
//   console.log(safe);

  reports.forEach((row, index) => {
    console.log(`Row ${index + 1}:`, row);

    const ascending = isAscending(row);
    const descending = isDescending(row);

    if (ascending || descending) {
        safeCount++;
    } else {
        const modifiedValid = isValidSequence(row, limit, true) || isValidSequence(row, limit, false);
        if (modifiedValid) safeCount++;
    }

  });
  console.log(`safe, yeh? ${safeCount}`)
});



