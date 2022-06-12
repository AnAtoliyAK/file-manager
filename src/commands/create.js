import { existsSync, writeFile } from "fs";
import { ERROR_MESSAGE } from "./../constants/global.js";

export const create = async (filePath) => {
  try {
    if (!existsSync(filePath)) {
      writeFile(filePath, '', function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    } else throw Error(ERROR_MESSAGE);
  } catch (err) {
    console.error(err);
  }
};