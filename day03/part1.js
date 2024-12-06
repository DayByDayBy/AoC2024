const fs = require("fs");
const path = require("path");

async function readAndSplit() {
  const filePath = path.join(__dirname, "small_data.txt");

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const regex = /mul(\d+),(\d+)/g;

    let mulStrArray = [];
    let str = data

    while (true) {
      const match = regex.exec(str);

      if (!match) break;

      const a = parseInt(match[1]);
      const b = parseInt(match[2]);

      mulStrArray.push(`mul(${a},${b})`);
      str.replace(match[0], "");
    }
    console.log(mulStrArray)
  } catch (e) {
    console.error("error reading file: ", e);
  }
}

readAndSplit();
