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

        log(rulesArray);
        log(updatesArray);

  } catch (error) {
    error(`file error: ${error.message}`);
  }
  
};
checkUpdates("small_data.txt");
