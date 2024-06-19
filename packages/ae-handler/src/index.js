import { executeScript } from "./utils/ae.js";
import { resolve } from "path";
import chokidar from "chokidar";
import { throttle } from "shared/utils/throttle.js";

const args = process.argv.slice(2);
const file = args[0];
const isWatchMode = args.includes("-w");

const getAeScriptPath = (path) => resolve(import.meta.dirname, path);

if (isWatchMode) {
  const watcher = chokidar.watch(getAeScriptPath(file));
  const watchHandler = throttle(async (event, path) => {
    console.log(event, path);
    if (event !== "change") return;
    console.log("running script");
    executeScript(getAeScriptPath(file));
  }, 1000);
  watcher.on("all", watchHandler);
} else {
  executeScript(getAeScriptPath(file));
}
