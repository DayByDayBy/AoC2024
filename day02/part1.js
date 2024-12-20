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

  //   console.log("lines:", lines);
  //   console.log("reports:", reports);

  const isAscending = reports.map((row) =>
    row
      .slice(0, row.length - 1)
      .every((value, i) => 
        value < row[i + 1] && (row[i + 1] - value <= 3)
      )
  );

  const isDescending = reports.map((row) =>
    row
      .slice(0, row.length - 1)
      .every((value, i) => 
        value > row[i + 1] && (value - row[i + 1] <= 3)
      )
  );

//   console.log("rows ascending:", isAscending);
//   console.log("rows descending:", isDescending);

  const asCount = isAscending.filter(Boolean).length;
  const desCount = isDescending.filter(Boolean).length;

  console.log("A & D:", asCount, '&', desCount);

  const safe = isAscending.map((val, idx) => 
    val ||  isDescending[idx]);
  console.log(safe.filter(Boolean).length);

});
