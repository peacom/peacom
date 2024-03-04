import mime = require("mime-types");

export interface FileInfo {
  id?: string //File Path from Folder
  type: string
  name: string
  url: string
  extension?: string
  size?: number
  uuid?: string
  preview?: string
}

export interface AwsFileInfo extends FileInfo {
  key: string
  bucket?: string
}

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

export const isCSV = (mimetype: string) => mimetype === "text/csv";
export const isExcel = (mimetype: string) =>
  [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel"
  ].includes(mimetype);

export const isDoc = (mimetype: string) => [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(mimetype)

export const isPPT = (mimetype: string) => [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
].includes(mimetype)

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
