import {FileInfo} from "../../model/";
import * as path from "path";
import * as fs from "fs";
import mime = require("mime-types");

export const isImage = (mimetype: string) => {
  const regex = /(^image)(\/)[a-zA-Z0-9_]*/gm
  return regex.test(mimetype)
}

export const isVideo = (mimetype: string) => {
  const regex = /(^video)(\/)[a-zA-Z0-9_]*/gm
  return regex.test(mimetype)
}

export const isAudio = (mimetype: string) => {
  const regex = /(^audio)(\/)[a-zA-Z0-9_]*/gm
  return regex.test(mimetype)
}

export const getFileInfoFromUrl = (
  url: string,
  defaultMimeType = "application/binary"
): FileInfo => {
  const rs = {
    name: "",
    type: defaultMimeType,
    extension: "",
    url
  } as FileInfo;

  rs.name = new URL(url).pathname.split("/").pop() || url;
  rs.extension = rs.name.split(".").pop();
  if (rs.extension) {
    rs.type = mime.lookup(rs.extension) || defaultMimeType;
  }

  return rs;
};

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
