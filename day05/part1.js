const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "small_data.txt");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error when reading file: ", err);
    return;
  }

//   the two halves:

  const parts = data.trim().split("\n\n");

//   the ruleset:

  const rules = parts[0].trim().split("\n");
  const rulesArray = rules.map((rule) => {
    const [first, second] = rule
    .split("|")
    .map(Number);
    return [first, second];
  });

//   the text to check:
  const updates = parts[1].trim().split("\n");
  const updatesArray = updates.map((update) => {
    return update.split(',').map(Number);
});

  log(rulesArray);
  log(updatesArray);
});
