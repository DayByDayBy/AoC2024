const fs = require("fs");
const path = require("path");

async function readAndSplitMulAndSum() {
  const filePath = path.join(__dirname, "small_data.txt");

  try {
    // const fileContent = fs.readFileSync(filePath, "utf8");
    const fileContent =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const regex = /mul\((\d+),(\d+)\)/g;
    let strArray = [];
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
      const a = parseInt(match[1]);
      const b = parseInt(match[2]);
      strArray.push(`mul(${a},${b})`);

      const mulSum = strArray.reduce(
        (total, element) =>
          total +
          parseInt(element.match(regex)[1]) * parseInt(element.match(regex)[2]),
        0
      );
    }
    return mulSum;
  } catch (e) {
    console.error("error reading file", e);
    return ["oh no", "it no go"];
  }
}
readAndSplitMulAndSum().then((result) => console.log(result));
