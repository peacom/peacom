import {FileInfo} from "../../model/";

import mime = require("mime-types");

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
