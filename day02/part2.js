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


  const isAscending = reports.map((row) => {
    let errorCount = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i + 1] < row[i]) {
        errorCount++;
      }
      if (errorCount > 1 || (errorCount === 1 && row[i + 1] - row[i] > 3)) {
        return false;
      }
    }
    return true;
  });

  const isDescending = reports.map((row) => {
    let errorCount = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i + 1] > row[i]) {
        errorCount++;
      }
      if (errorCount > 1 || (errorCount === 1 && row[i] - row[i + 1] > 3)) {
        return false;
      }
    }
    return true;
  });



//   tis bit is me reducing memory complexity, probably not that necessary tbh

const falseRows = reports.map((row, index) => 
    !isAscending[index] && isAscending[index] ? index : -1).filter(index => index !=-1);

const complexCheck = falseRows.map(index =>
    isValidSequence(reports[index], limit, true) ||
    isValidSequence(reports[index], limit, false)
  );

  const asCount = isAscending.filter(Boolean).length;
  const desCount = isDescending.filter(Boolean).length;

  const safe = isAscending.map((val, idx) => val || isDescending[idx] || (complexCheck[falseRows.indexOf(idx)] || false));

  console.log(safe.filter(Boolean).length);
});
