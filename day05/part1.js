const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "small_data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error when reading file: ", err);
    return;
  }
  const parts = data.trim().split("\n\n");

  const guide = parts[0].trim().split("\n");
  const pages = parts[1].trim().split("\n");

//   log(guide);
//   log(pages);
});
