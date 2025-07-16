import childProcess from "node:child_process";
import fs from "node:fs/promises";

export const exec = (command: string) => {
  const child = childProcess.spawn(command, { shell: true, stdio: "inherit" });
  child.on("close", (code: number) => {
    process.exit(code);
  });
};

export const getDirectories = async (path: string) =>
  (await fs.readdir(path, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory() && dirent.name !== "node_modules")
    .map((dirent) => dirent.name);
