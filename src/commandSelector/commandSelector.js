import * as readline from "node:readline";
import { parse } from "path";
import {
  UP_DIRECTORY_COMMAND,
  DEFAULT_PROMPT,
  WRONG_COMMAND,
  EXIT_MESSAGE,
  DIRECTORY_LIST,
  CURRENT_PATH_MESSAGE,
  CHANGE_DIRECTORY,
  READ_FILE,
  CREATE_FILE,
  RENAME_FILE,
  COPY_FILE,
  MOVE_FILE,
  REMOVE_FILE,
  OPERATING_SYSTEM,
  GET_HASH,
  COMPRESS,
  DECOMPRESS,
  EXIT,
} from "./../constants/global.js";
import { list } from "../commands/list.js";
import { access } from "node:fs";
import { read } from "../commands/read.js";
import { create } from "../commands/create.js";
import { rename } from "../commands/rename.js";
import { copy } from "../commands/copy.js";
import { remove } from "../commands/remove.js";
import { osCommands } from "../commands/osCommands.js";
import { calculateHash } from "../commands/calculateHash.js";
import { compress } from "../commands/compress.js";
import { decompress } from "../commands/decompress.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: DEFAULT_PROMPT,
});

export function runCommandSelector(userName, homeDirectory) {
  rl.prompt();
  let currentDirectory = parse(homeDirectory);

  rl.on("line", (line) => {
    const { dir, base } = currentDirectory;

    const command = line.split(" ")[0];
    const firstParam = line.split(" ")[1];
    const secondParam = line.split(" ")[2];

    switch (command) {
      case UP_DIRECTORY_COMMAND:
        currentDirectory = parse(dir);
        console.log(CURRENT_PATH_MESSAGE + dir);
        break;

      case CHANGE_DIRECTORY:
        access(firstParam, () => {
          currentDirectory = parse(dir + "\\" + base + "\\" + firstParam);
          console.log(
            CURRENT_PATH_MESSAGE +
              currentDirectory.dir +
              "\\" +
              currentDirectory.base
          );
        });
        break;

      case DIRECTORY_LIST:
        list(dir + "//" + base);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case READ_FILE:
        read(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case CREATE_FILE:
        create(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case RENAME_FILE:
        rename(dir + "\\" + base + "\\" + firstParam, secondParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case COPY_FILE:
        copy(dir + "\\" + base + "\\" + firstParam, secondParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case MOVE_FILE:
        copy(dir + "\\" + base + "\\" + firstParam);
        remove(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case REMOVE_FILE:
        remove(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case OPERATING_SYSTEM:
        osCommands(firstParam.slice(2));
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case GET_HASH:
        calculateHash(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case COMPRESS:
        compress(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case DECOMPRESS:
        decompress(dir + "\\" + base + "\\" + firstParam);
        console.log(
          CURRENT_PATH_MESSAGE +
            currentDirectory.dir +
            "\\" +
            currentDirectory.base
        );
        break;

      case EXIT:
        process.stdout.write(EXIT_MESSAGE + userName + "!");
        process.exit(0);

      default:
        console.log(WRONG_COMMAND);
        break;
    }

    rl.prompt();
  }).on("close", () => {
    process.stdout.write(EXIT_MESSAGE + userName + "!");
    process.exit(0);
  });
}
