import * as fs from "fs";
import * as path from "path";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  DeleteObjectCommandInput, DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectRequest
} from "@aws-sdk/client-s3";
// eslint-disable-next-line @nx/enforce-module-boundaries
import {createPresignedPost} from "@aws-sdk/s3-presigned-post"
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {s3, S3_FOLDERS, S3_INFO, S3_OPTION} from "./constants";
import {
  filterNonAlphaNumeric,
  hasText,
  rightString, AwsFileInfo, getFileInfoFromUrl
} from '@peacom/model';
import {getFileInfoFromLocalFile} from "../../../util";

export const getS3EndPoint = () => {
  if (hasText(S3_OPTION.domain)) {
    return S3_OPTION.domain;
  }
  return `https://${S3_INFO.BUCKET}.s3.${S3_OPTION.region}.amazonaws.com`;
};

export const getS3Url = (key: string | null | undefined) => `${getS3EndPoint()}/${key}`;

export const uploadLocalFileToS3 = async (
  {filePath = ""},
  folder = S3_FOLDERS.DEFAULT
): Promise<AwsFileInfo> => {
  const rs = getFileInfoFromLocalFile(filePath);
  const fileStream = fs.createReadStream(filePath);

  // Setting up S3 upload parameters
  const key = `${folder}/${path.basename(filePath)}`;
  const params: PutObjectCommandInput = {
    Bucket: S3_INFO.BUCKET,
    Key: key,
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
    key,
    url: getS3Url(params.Key)
  };
};


interface FileProp {
  fileName: string;
  contentType: string;
  folder?: string;
}

export const createPreSignedUrl = async ({fileName, contentType, folder = S3_FOLDERS.DEFAULT}: FileProp) => {
  const fileInfo = fileName.split(".");
  const type = fileInfo.length > 1 ? fileInfo.pop() : "";

  const location = `${folder}/${filterNonAlphaNumeric(fileInfo.join("."))}${hasText(type || "") ? `.${type}` : ""}`;
  const Conditions: Array<any> = [
    {key: location},
    ['content-length-range', 0, 104857600]
  ]
  const command = {
    Bucket: S3_INFO.BUCKET,
    Key: location,
    Conditions,
    Expires: 3600,
    Fields: {'content-type': contentType},
  }
  return {
    urlUpload: await createPresignedPost(s3, command),
    urlEndpoint: getS3Url(location)
  };
};

export const getS3UrlKey = (url: string) => {
  if (hasText(S3_OPTION.domain) && url.startsWith(S3_OPTION.domain)) {
    return rightString(
      url,
      url.length -
      `${S3_OPTION.domain}/`.length
    );
  }
  return rightString(
    url,
    url.length -
    `https://${S3_INFO.BUCKET}.s3.${S3_OPTION.region}.amazonaws.com/`.length
  );
};

export const getAwsUrlInfo = async (str: string): Promise<AwsFileInfo> => {
  const fileInfo = getFileInfoFromUrl(str);
  const key = getS3UrlKey(str);
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
    type: resp.ContentType || fileInfo.type,
    key,
    bucket: S3_INFO.BUCKET
  };
};

export const getAwsKeyInfo = async (key: string): Promise<AwsFileInfo> => {
  const input = {
    // GetObjectRequest
    Bucket: S3_INFO.BUCKET,
    Key: key
  };
  const command = new GetObjectCommand(input);
  const resp = await s3.send(command);
  const url = getS3Url(key);
  const remoteFileInfo = getFileInfoFromUrl(url);
  return {
    name: remoteFileInfo.name,
    url: getS3Url(key),
    size: resp.ContentLength,
    type: resp.ContentType || "application/binary",
    key,
    bucket: S3_INFO.BUCKET
  };
};

interface UploadS3BufferProp extends FileProp {
  data: PutObjectRequest["Body"] | string | Uint8Array | Buffer;
}

export const uploadS3Buffer = async (
  {fileName = "", contentType = "application/octet-stream", data}: UploadS3BufferProp,
  folder = S3_FOLDERS.TICKET
): Promise<AwsFileInfo> => {
  // Setting up S3 upload parameters
  const key = `${folder}/${fileName}`;
  const params: PutObjectCommandInput = {
    Bucket: S3_INFO.BUCKET,
    Key: key,
    Body: data
  };
  if (hasText(contentType)) {
    params.ContentType = contentType;
  }

  const command = new PutObjectCommand(params);
  await s3.send(command);
  return {
    key, name: fileName, url: getS3Url(key), type: contentType
  };
};

export const uploadS3FromUrl = async (
  {url = "", mimeType = "", name = ""},
  folder = S3_FOLDERS.DEFAULT
): Promise<AwsFileInfo> => {
  const data = await fetch(url).then(t => t.arrayBuffer());
  const fileInfo = getFileInfoFromUrl(url);
  const uploadAwsInfo = await uploadS3Buffer(
    {
      fileName: name || fileInfo.name,
      contentType: mimeType || fileInfo.type,
      data: data as Uint8Array
    },
    folder
  );
  return {
    ...uploadAwsInfo,
    extension: fileInfo.extension,
    size: data.byteLength
  };
};

const isComplete = ({end, length}: { end: number, length: number }) => end === length - 1;

interface GetObjectRangeProp {
  bucket: string;
  key: string;
  start: number;
  end: number;
}

interface DownloadLargeFileProps {
  url: string;
  outputFile: string;
  chunkSize: number;

  onError?(err: Error): void;
}

interface DownloadLargeFileKeyProps {
  key: string;
  outputFile: string;
  chunkSize: number;

  onError?(err: Error): void;
}

export const getObjectRange = ({bucket, key, start, end}: GetObjectRangeProp) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Range: `bytes=${start}-${end}`
  });

  return s3.send(command);
};

export const getRangeAndLength = (contentRange: string) => {
  const [range, length] = contentRange.split("/");
  const [start, end] = range.split("-");
  return {
    start: parseInt(start),
    end: parseInt(end),
    length: parseInt(length)
  };
};

export const downloadS3Url = async ({url, outputFile, onError, chunkSize}: DownloadLargeFileProps) => {
  const key = getS3UrlKey(url);
  return downloadS3Key({key, outputFile, chunkSize, onError});
};

export const downloadS3Key = async ({key, outputFile, onError, chunkSize}: DownloadLargeFileKeyProps) => {
  const writeStream = fs.createWriteStream(
    outputFile
  ).on("error", (err) => {
    if (onError) {
      onError(err);
    }
  });

  let rangeAndLength = {start: -1, end: -1, length: -1};
  try {
    while (!isComplete(rangeAndLength)) {
      const {end} = rangeAndLength;
      const nextRange = {start: end + 1, end: end + chunkSize};

      console.log(`Downloading bytes ${nextRange.start} to ${nextRange.end}`);

      const {ContentRange, Body} = await getObjectRange({
        bucket: S3_INFO.BUCKET,
        key: key || "",
        ...nextRange
      });

      if (Body) {
        writeStream.write(await Body.transformToByteArray());
      }

      rangeAndLength = getRangeAndLength(ContentRange || "");
    }
  } catch (e) {
    try {
      fs.unlinkSync(outputFile);
    } catch (e2: any) {
      console.log(e2.message);
    }

    throw e;
  }
};

export async function s3RemoveFile({bucket = S3_INFO.BUCKET, key = ""}) {
  const params: DeleteObjectCommandInput = {
    Bucket: bucket,
    Key: key
  };
  return s3.deleteObject(params);
}

export async function s3RemoveMultipleFile({bucket = S3_INFO.BUCKET, keys = [] as Array<string>}) {
  const command: DeleteObjectsCommand = new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: {
      Objects: keys.map(t => ({Key: t}))
    }
  });
  return s3.send(command);
}
