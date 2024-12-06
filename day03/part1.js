
const fs = require("fs");
const path = require("path");

async function readAndSplit() {
  const filePath = path.join(__dirname, "small_data.txt");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const regex = /mul(\d+),(\d+)/g;
    let mulStrArray = [];
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
      const a = parseInt(match[1]);
      const b = parseInt(match[2]);
      mulStrArray.push(`mul(${a},${b})`);
    }
    return mulStrArray;
  } catch (e) {
    console.error("error reading file", e);
  }
  return mulStrArray;
}
readAndSplit().then((result) => console.log(result));
