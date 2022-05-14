import fs from "fs";

const file = fs.readFileSync(
  "./public/images/flowchart/internal_storage.svg",
  "utf-8"
);

console.log(file);
