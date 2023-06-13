import * as fs from "fs";
import * as path from "path";
import {GetObjectCommand, PutObjectCommand, PutObjectCommandInput} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {v4 as uuidv4} from "uuid";
import {s3, S3_INFO, S3_OPTION, S3_FOLDERS} from "./constants";
import {hasText, getFileInfoFromUrl, rightString, getFileInfoFromLocalFile} from "../../../util";
import {FileInfo} from "../../../model";
import {PutObjectRequest} from "@aws-sdk/client-s3/dist-types/models/models_0";
import fetch from "node-fetch";

export const getS3Url = (key: string | null | undefined) => `https://${S3_INFO.BUCKET}.s3.${S3_OPTION.region}.amazonaws.com/${key}`

export const uploadLocalFileToS3 = async (
  {filePath = ""},
  folder = S3_FOLDERS.DEFAULT
): Promise<FileInfo> => {
  const rs = getFileInfoFromLocalFile(filePath)
  const fileStream = fs.createReadStream(filePath);

  // Setting up S3 upload parameters
  const params: PutObjectCommandInput = {
    Bucket: S3_INFO.BUCKET,
    Key: `${folder}/${path.basename(filePath)}`,
    Body: fileStream,
    ContentType: rs.type,
    ContentLength: rs.size
  };

  const command = new PutObjectCommand(params);
  /*
  const multipartUpload = new Upload({
    client: s3,
    params
    })
  return multipartUpload.done()
   */
  await s3.send(command);

  return {
    ...rs,
    url: getS3Url(params.Key),
  }
};


interface FileProp {
  fileName: string
  contentType: string
}

export const createPreSignedUrl = ({fileName, contentType}: FileProp) => {
  const type = fileName.split(".").pop();
  const location = `${S3_FOLDERS.DEFAULT}/${fileName.replace(
    /[^a-zA-Z]/g,
    ""
  )}_${uuidv4()}.${type}`;
  const command = new PutObjectCommand({
    Bucket: S3_INFO.BUCKET,
    Key: location,
    ContentType: contentType
  });
  return getSignedUrl(s3, command, {expiresIn: 3600});
};

export const getUrlInfo = async (str: string): Promise<FileInfo> => {
  const fileInfo = getFileInfoFromUrl(str);
  const key = rightString(
    str,
    str.length -
    `https://${S3_INFO.BUCKET}.s3.${S3_OPTION.region}.amazonaws.com/`.length
  );
  const input = {
    // GetObjectRequest
    Bucket: S3_INFO.BUCKET,
    Key: key
  };
  const command = new GetObjectCommand(input);
  const resp = await s3.send(command);
  return {
    ...fileInfo,
    size: resp.ContentLength,
    type: resp.ContentType || fileInfo.type
  };
};

interface UploadS3BufferProp extends FileProp {
  data: PutObjectRequest["Body"] | string | Uint8Array | Buffer;
}

const uploadS3Buffer = async (
  {fileName = "", contentType = "application/octet-stream", data}: UploadS3BufferProp,
  folder = S3_FOLDERS.TICKET
): Promise<string> => {
  // Setting up S3 upload parameters
  const params: PutObjectCommandInput = {
    Bucket: S3_INFO.BUCKET,
    Key: `${folder}/${fileName}`,
    Body: data
  };
  if (hasText(contentType)) {
    params.ContentType = contentType;
  }

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return getS3Url(params.Key);
};

export const uploadS3FromUrl = async (
  {url = "", mimeType = "", name = ""},
  folder = S3_FOLDERS.DEFAULT
): Promise<FileInfo> => {
  const data = await fetch(url).then(t => t.arrayBuffer())
  const fileInfo = getFileInfoFromUrl(url);
  const uploadUrl = await uploadS3Buffer(
    {
      fileName: name || fileInfo.name,
      contentType: mimeType || fileInfo.type,
      data: data as Uint8Array
    },
    folder
  );
  return {
    ...fileInfo,
    url: uploadUrl
  }
};
