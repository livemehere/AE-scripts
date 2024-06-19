import { rollup } from "rollup";
import tsPlugin from "@rollup/plugin-typescript";
import { resolve } from "path";
import chokidar from "chokidar";
import * as fs from "fs";
import { throttle } from "shared/utils/throttle.js";

const args = process.argv.slice(2);
const isWatchMode = args.includes("-w");

const inputDir = resolve(import.meta.dirname, "../src");
const outputDir = resolve(import.meta.dirname, "../dist");
const inputFiles = [];
function getFiles(dir) {
  const result = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const path = resolve(dir, file);
    if (fs.statSync(path).isFile()) {
      result.push(path);
    } else {
      result.push(...getFiles(path));
    }
  }
  return result;
}
fs.readdirSync(inputDir).forEach((file) => {
  if (fs.statSync(resolve(inputDir, file)).isFile()) {
    inputFiles.push(resolve(inputDir, file));
  } else {
    inputFiles.push(...getFiles(resolve(inputDir, file)));
  }
});

async function bundle(inputPath) {
  const outputPath = inputPath.replace(inputDir, outputDir);
  /** @type{import('rollup').RollupOptions} */
  const inputOptions = {
    input: inputPath,
    plugins: [tsPlugin()],
  };

  /** @type{import('rollup').OutputOptions} */
  const outputOptions = {
    file: outputPath.replace(/\.ts$/, ".jsx"),
  };

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
  console.log(`bundle success :${outputPath}`);
}

if (!isWatchMode) {
  for (const file of inputFiles) {
    if (file.includes(".d.ts")) continue;
    await bundle(file);
  }
} else {
  const watcher = chokidar.watch(inputDir);
  const watchHandler = throttle(async (event, path) => {
    if (path.includes(".d.ts")) return;
    if (event !== "change" && event !== "add") return;
    console.log(event, path);
    await bundle(path);
  }, 1000);
  watcher.on("all", watchHandler);
}
