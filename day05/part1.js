const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

async function grabUpdates(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    const data = await fs.promises.readFile(filePath, "utf8");
    
    //    two parts:
    const parts = data.trim().split("\n\n");
    if (parts.length !== 2) {
      throw new Error("expecting two parts");
    }
    //   ruleset:
    const rules = (ruleStr) => {
      return ruleStr
        .trim()
        .split("\n")
        .map((val) => {
          const [first, second] = val.split("|").map((val) => {
            const num = Number(val.trim());
            if (isNaN(num)) throw new Error(`NaN in rule: ${val}`);
            return num;
          });
          return [first, second];
        });
    };
    // updates:
    const updates = (updateStr) => {
      return updateStr
        .trim()
        .split("\n")
        .map((update) => {
          return update.split(",").map((val) => {
            const num = Number(val.trim());
            if (isNaN(num)) throw new Error(`NaN in update: ${val}`);
            return num;
          });
        });
    };
    const rulesArray = rules(parts[0]);
    const updatesArray = updates(parts[1]);


    if (validateRules(updatesArray.flat(),rulesArray)) {
     return { updatesArray };
    }

  } catch (err) {
    error(`file error: ${err.message}`);
    return [];
  }
}

// validation of updates that follow rules:

function validateRules(arr, rules){
    const positions = new Map(arr.map((num, idx) => [num, idx]))
    for (const [first, second] of rules) {
      const firstIndex = positions.get(first);
      const secondIndex = positions.get(second);
      if (firstIndex !== undefined && secondIndex !== undefined) {
        if (firstIndex >= secondIndex) {
          return false;
        }
      }
    }
    return true;
  };

async function middleDigits(file) {
  try {
    const updateList = await grabUpdates(file);

    if (updateList.length === 0) {
      log(`no updates found`);
      return [];
    }

    const middleIdx = Math.floor((updateList.length - 1) / 2);
    const middleDigitList =
      updateList.length === 1 ? updateList : [updateList[middleIdx]];

    log(middleDigitList);
    return middleDigitList;
  } catch (err) {
    log(`error in middleDigits:  ${err}`);
    return [];
  }
}
(async () => {
  await middleDigits("small_data.txt");
})();
