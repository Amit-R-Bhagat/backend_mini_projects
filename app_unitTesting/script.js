const fs = require("fs");
const path = require("path");
// Create and write to file
fs.writeFile(
  path.join(__dirname, ".gitignore"),
  "node_modules\n.env",
  (err) => {
    if (err) throw err;
    console.log("File written to...");
  }
);
