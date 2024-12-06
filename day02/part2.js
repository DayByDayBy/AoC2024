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
        if (isAscending) {
          return (
            value > modifiedRow[i - 1] && value - modifiedRow[i - 1] <= limit
          );
        } else {
          return (
            value < modifiedRow[i - 1] && value - modifiedRow[i - 1] <= limit
          );
        }
      });
    });

  const results = reports.map((row) => {
      if (isAscending(row) || isDescending(row)) return true;
      return isValidSequence(row, limit, true) || isValidSequence(row, limit, false);
  });

  const safe = results.filter(Boolean).length;
  console.log(safe);
});
