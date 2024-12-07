const fs = require("fs");
const path = require("path");

async function mull2() {
  const filePath = path.join(__dirname, "data.txt");
  

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const mull2 = fileContent.split('do()').map(track => track.split('don\'t()')[0]).join('');

    const regex = /mul\((\d+),(\d+)\)/g;
    let a, b, mulSum = 0;

    while ((match = regex.exec(mull2)) !== null) {
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
mull2().then((result) => console.log(result));
