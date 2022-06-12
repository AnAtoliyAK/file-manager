import { createReadStream, createWriteStream } from "fs";
import { createUnzip } from "zlib";

export const decompress = async (filePath, filePathTo) => {
  const unzip = createUnzip();
  const reader = createReadStream(filePath);
  const writer = createWriteStream(filePathTo);

  reader.pipe(unzip).pipe(writer);

  reader.pipe(gzip).pipe(writer);
};

