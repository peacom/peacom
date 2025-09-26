import {FileInfo} from "@peacom/model";
import * as path from "path";
import * as fs from "fs";
import mime = require("mime-types");

export const getFileInfoFromLocalFile = (
  filePath: string, folder = ''
): FileInfo => {
  const rs = {
    id: filePath,
    name: "",
    type: '',
    extension: "",
    url: filePath
  } as FileInfo;

  const stat = fs.statSync(filePath)
  rs.name = path.basename(filePath)
  if (folder) {
    rs.id = path.relative(folder, filePath)
  }

  rs.extension = path.extname(filePath);
  rs.size = stat.size
  if (rs.extension) {
    rs.type = mime.lookup(rs.extension) || "application/binary";
  }

  return rs;
};

export const writeFileStream = async (stream: any, data: any) => {
  if (!stream.write(data)) {
    await new Promise((resolve) => {
      stream.once("drain", resolve);
    });
  }
}

export const closeFileStream = async (stream) => new Promise((resolve) => {
  stream.end();
  stream.on("finish", () => {
    console.log("closeFileStream Success");
    resolve();
  });
})
