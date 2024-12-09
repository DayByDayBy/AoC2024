const { log, error } = require("console");
const fs = require("fs");
const path = require("path");

async function checkUpdates(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    const data = await fs.promises.readFile(filePath, "utf8");
      //   the two parts:
      const parts = data.trim().split("\n\n");
      if (parts.length !== 2) {
        throw new Error("expecting two parts");
      }
      //   the ruleset:
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
  
        // log(rulesArray);
        // log(updatesArray);

  } catch (error) {
    error(`file error: ${error.message}`);
  }


};

async function middleDigits(file) {
    try{

        const updateList = await checkUpdates(file);

        if (updateList.length === 0) {
            log(`no updates found`);
            return ['oh no!'];
        }

        const middleIdx = Math.floor(updateList.length/2);
        const middleDigitList = [updateList[middleIdx]];

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


middleDigits("small_data.txt")
// checkUpdates("small_data.txt");
// checkUpdates("data.txt");
