import {
  USER_NAME_COMMAND,
  WELCOME_MESSAGE_TEXT,
  CURRENT_PATH_MESSAGE,
} from "./constants/global.js";
import { homedir } from "os";
import { getFilePath } from "./utils/getFilePath.js";
import { runCommandSelector } from "./commandSelector/commandSelector.js";

const processArguments = process.argv.slice(2);

const { userName } = processArguments.reduce(
  (acc, arg) => {
    if (arg.includes(USER_NAME_COMMAND)) {
      acc.userName = arg.replace(USER_NAME_COMMAND, "");
    }

    return acc;
  },
  { userName: "" }
);

const homeDirectory = homedir();

console.log(WELCOME_MESSAGE_TEXT + userName + "!");
console.log(homedir());
console.log(CURRENT_PATH_MESSAGE + homeDirectory);

// console.log(getFilePath(import.meta.url, ["constants", "global.js"]));

runCommandSelector(userName, homeDirectory);
