import { readdir } from "fs";
import { ERROR_MESSAGE } from "./../constants/global.js";

export const list = async (directoryPath) => {
  readdir(directoryPath, function (err, files) {
    if (err) {
      throw new Error(ERROR_MESSAGE);
    }

    files.forEach((file) => {
      console.log(file);
    });
  });
};
