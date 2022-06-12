import { mkdirSync, readdirSync, lstatSync, copyFileSync } from "fs";
import path from "path";

export const copy = async (fromPath, toPath) => {
  const copyFolderSync = (from, to) => {
    mkdirSync(to);

    readdirSync(from).forEach((element) => {
      if (lstatSync(path.join(from, element)).isFile()) {
        copyFileSync(path.join(from, element), path.join(to, element));
      } else {
        copyFolderSync(path.join(from, element), path.join(to, element));
      }
    });
  };

  try {
    copyFolderSync(fromPath, toPath);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};
