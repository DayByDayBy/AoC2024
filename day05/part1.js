const { log, error } = require("console");
const fs = require("fs");
const path = require("path");


async function checkUpdates(filename){
    try{
        const filePath = path.join(__dirname, filename);
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {error("Error when reading file: ", err);
              return;
            }

        //   the two parts:
        const parts = data.trim().split("\n\n");
        if (parts.length !==2){
            throw new Error('expecting two parts');
        }




        //   the ruleset:
        const rules = (ruleStr) => {
            return ruleStr.trim().split('\n').map(val => {
                try{ 
                    const [first, second] = rule.split("|").map(val => {
                        const num = Number(val.trim());
                            if (isNaN(num)){
                                    throw new Error(`NaN: ${val}`);
                                } return num;
                        });
                        return [first, second];
                    } catch (parseError){
                        error(`rule parse error: ${parseError.message}`);
                        return null;
                    }
        }).filter(rule => rule !== null);
    };


        const rulesArray = rules.map((rule) => {
            const [first, second] = rule.split("|").map(Number);
            return [first, second];
        });







        //   the text to check:
        const updates = parts[1].trim().split("\n");
        const updatesArray = updates.map((update) => {
            return update.split(",").map(Number);
        });

        // log(rulesArray);
        // log(updatesArray);
        });
        }


checkUpdates("small_data.txt");