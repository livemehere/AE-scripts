const AE_EXE_PATH =
  "C:\\Program Files\\Adobe\\Adobe After Effects 2024\\Support Files\\AfterFX.exe";
import { spawn } from "child_process";

export function executeScript(path) {
  const child = spawn(AE_EXE_PATH, ["-r", path]);
  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
}
