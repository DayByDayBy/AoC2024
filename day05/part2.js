// actually a pt1/pt2
// didnt need to be, pt1 already worked, but it does mean extra verification for the soltion 
// here, and tbh i kinda like the idea of making one script to solve them both 

const fs = require("fs");
const path = require("path");

const parseInput = (lines) => {
    const rules = {};
    const pages = [];
  
    lines.forEach((line) => {
      if (line.includes('|')) {
        const [l, r] = line.split('|').map(Number);
        if (!rules[l]) rules[l] = [];
        rules[l].push(r);
      } else if (line.includes(',')) {
        pages.push(line.split(',').map(Number));
      }
    });
  
    return { rules, pages };
  };
  
  const validatePage = (page, rules) => {
    for (let i = 1; i < page.length; i++) {
      for (let j = 0; j < i; j++) {
        if (rules[page[i]]?.includes(page[j])) {
          return false;
        }
      }
    }
    return true;
  };
  
  const fixPage = (page, rules) => {
    return page.sort((l, r) => rules[l]?.includes(r) ? -1 : 1);
  };
  
  const processPages = (rules, pages) => {
    let p1 = 0, p2 = 0;
  
    pages.forEach((page) => {
      if (validatePage(page, rules)) {
        p1 += page[Math.floor(page.length / 2)];
      } else {
        const fixed = fixPage(page, rules);
        p2 += fixed[Math.floor(fixed.length / 2)];
      }
    });
  
    return { p1, p2 };
  };
  
  const main = async (filename) => {
    try {
      const filePath = path.join(__dirname, filename);
      const data = await fs.promises.readFile(filePath, "utf8");
  
      const lines = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);
      const { rules, pages } = parseInput(lines);
      const { p1, p2 } = processPages(rules, pages);
  
      console.log("partOneMiddleSum", p1);
      console.log("partTwoMmiddleSum:", p2);
    } catch (err) {
      console.error("error reading file:", err);
    }
  };
  
  const filename = process.argv[2];
  if (!filename) {
    process.exit(1);
  }
  
  main(filename);