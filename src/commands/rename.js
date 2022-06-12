import { existsSync, rename as renameFS } from "fs";
import { ERROR_MESSAGE } from "./../constants/global.js";

export const rename = async (wrongFilePath, rightFilePath) => {

  try {
    if (existsSync(wrongFilePath) || !existsSync(rightFilePath)) {
        renameFS(wrongFilePath, rightFilePath, function (err) {
        if (err) throw err;
        console.log("File is renamed successfully.");
      });
    } else throw new Error(ERROR_MESSAGE);
  } catch (err) {
    console.error(err);
  }
};