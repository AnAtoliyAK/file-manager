import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";

export const compress = async (filePath, filePathTo) => {
  const gzip = createGzip();
  const reader = createReadStream(filePath);
  const writer = createWriteStream(filePathTo);

  reader.pipe(gzip).pipe(writer);
};
