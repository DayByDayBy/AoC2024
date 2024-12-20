const fs = require("fs");
const path = require("path");

async function readAndSplitMulAndSum() {
  const filePath = path.join(__dirname, "data.txt");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const regex = /mul\((\d+),(\d+)\)/g;
    let a, b, mulSum = 0;

    while ((match = regex.exec(fileContent)) !== null) {
      const a = parseInt(match[1]);
      const b = parseInt(match[2]);
      const mulProd = a * b;
      mulSum += mulProd;
    }
    return mulSum;


  } catch (e) {
    console.error("error reading file", e);
    return ["oh no", "it no go"];
  }
}
readAndSplitMulAndSum().then((result) => console.log(result));
