import { rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const targets = [
  ".next",
  "node_modules",
  "tsconfig.tsbuildinfo",
  ".turbo",
  "npm-debug.log",
].map((entry) => join("web", entry));

targets.push("cms-data");

for (const target of targets) {
  if (!existsSync(target)) continue;
  try {
    rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
    console.log(`Removed: ${target}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed: ${target} -> ${message}`);
  }
}
