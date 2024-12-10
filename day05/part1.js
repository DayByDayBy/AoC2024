const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

const parseRuleset = (str) => {
  const [first, second] = str.split("|").map((val) => {
    const num = Number(val.trim());
    if (isNaN(num)) throw new Error(`NaN in ruleset: ${val}`);
    return num;
  });
  return [first, second];
};

const parseUpdate = (str) =>
  str.split(",").map((val) => {
    const num = Number(val.trim());
    if (isNaN(num)) throw new Error(`NaN in update: ${val}`);
    return num;
  });

const isValidUpdate = (update, rulesArray) => {
  for (const [first, second] of rulesArray) {
    const firstIdx = update.indexOf(first);
    const secondIdx = update.indexOf(second);
    if (firstIdx !== -1 && secondIdx !== -1 && firstIdx > secondIdx) {
      return false;
    }
  }
  return true;
};

async function checkUpdates(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
      throw new Error(`file doesnt exist: ${filename}`);
    }

    const data = await fs.promises.readFile(filePath, "utf8");
    const parts = data.trim().split("\n\n");
    if (parts.length !== 2) {
      throw new Error("expecting two chunks");
    }

    const rulesArray = parts[0].trim().split("\n").map(parseRuleset);

    const updatesArray = parts[1]
      .trim()
      .split("\n")
      .map(parseUpdate)
      .filter((update) => isValidUpdate(update, rulesArray));

    return { rulesArray, updatesArray };
  } catch (err) {
    error(`file error: ${err.message}`);
    return { rulesArray: [], updatesArray: [] };
  }
}
function findMiddleDigit(update) {
  const midIdx = Math.floor((update.length - 1) / 2);
  return update[midIdx];
}

async function middleDigits(file) {
  try {
    const { updatesArray } = await checkUpdates(file);

    if (updatesArray.length === 0) {
      log(`no valid updates found`);
      return { middleDigits: [], sum: 0 };
    }
    const middleDigits = updatesArray.map(findMiddleDigit);
    const sum = middleDigits.reduce((acc, val) => acc + val, 0);

    log(`middle digits: ${middleDigits}`);
    log(`sum of middles: ${sum}`);

    return { middleDigits, sum };
  } catch (err) {
    log(` error in middleDigits(): ${err.message}`);
    return { middleDigits: [], sum: 0 };
  }
}

// (async () => {
//     await middleDigits('small_data.txt');
// })();

(async () => {
  await middleDigits("data.txt");
})();
