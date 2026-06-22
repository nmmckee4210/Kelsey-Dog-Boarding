import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { parse } from "@babel/parser";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

const walkSourceFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkSourceFiles(entryPath));
      continue;
    }

    if (/\.(js|jsx)$/.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files.sort();
};

const sourceFiles = walkSourceFiles(srcDir).map((filePath) =>
  path.relative(rootDir, filePath),
);

let errorCount = 0;

for (const filePath of sourceFiles) {
  const code = fs.readFileSync(path.join(rootDir, filePath), "utf8");

  try {
    parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: false,
    });
  } catch (error) {
    errorCount += 1;
    const line = error.loc?.line ?? 0;
    const column = error.loc?.column ?? 0;

    console.log(`\n${filePath}`);
    console.log(`  ${line}:${column}  error  ${error.message}`);
  }
}

const fileLabel = `${sourceFiles.length} file${sourceFiles.length === 1 ? "" : "s"}`;
console.log(`\nChecked ${fileLabel}. ${errorCount} error(s).`);

process.exit(errorCount > 0 ? 1 : 0);
