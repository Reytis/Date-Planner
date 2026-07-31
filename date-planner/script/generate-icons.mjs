import fs from "fs";
import path from "path";

const iconsDir = path.resolve("src/assets/icons");

const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".svg"));

const exports = files
  .map((file) => {
    const name = file.replace(".svg", "");
    return `export { default as ${name} } from "./${file}";`;
  })
  .join("\n");

fs.writeFileSync(
  path.join(iconsDir, "index.ts"),
  exports + "\n"
);

console.log(`Generated ${files.length} icon exports.`);