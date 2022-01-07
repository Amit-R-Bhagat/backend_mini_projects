const expect = require("chai").expect;

// expect(true).to.be.true;

function titleCase(title) {
  //   return title;
  let words = title.split(" ");
  let titleCaseWords = words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  });
  return titleCaseWords.join(" ");
}

expect(titleCase("hello world")).to.be.a("string");
