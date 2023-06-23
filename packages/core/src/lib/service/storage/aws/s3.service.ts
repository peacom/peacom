import * as fs from "fs";
import * as path from "path";
import {GetObjectCommand, PutObjectCommand, PutObjectCommandInput, PutObjectRequest} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {v4 as uuidv4} from "uuid";
import {s3, S3_FOLDERS, S3_INFO, S3_OPTION} from "./constants";
import {getFileInfoFromLocalFile, getFileInfoFromUrl, hasText, rightString} from "../../../util";
import {AwsFileInfo, FileInfo} from "../../../model";

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

export const createPreSignedUrl = async ({fileName, contentType}: FileProp) => {
  const type = fileName.split(".").pop();
  const location = `${S3_FOLDERS.DEFAULT}/${fileName.replace(
    /[^a-zA-Z]/g,
    ""
  )}.${type}`;
  const command = new PutObjectCommand({
    Bucket: S3_INFO.BUCKET,
    Key: location,
    ContentType: contentType
  });
  return {
    urlUpload: await getSignedUrl(s3, command, {expiresIn: 3600}),
    urlEndpoint: getS3Url(location)
  }
};

export const getS3UrlKey = (url: string) => {
  return rightString(
    url,
    url.length -
    `https://${S3_INFO.BUCKET}.s3.${S3_OPTION.region}.amazonaws.com/`.length
  )
}

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

const isComplete = ({end, length}: { end: number, length: number }) => end === length - 1;

interface GetObjectRangeProp {
  bucket: string
  key: string
  start: number
  end: number
}

interface DownloadLargeFileProps {
  url: string
  outputFile: string
  chunkSize: number

  onError?(err: Error): void
}

export const getObjectRange = ({bucket, key, start, end}: GetObjectRangeProp) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Range: `bytes=${start}-${end}`,
  });

  return s3.send(command);
};

export const getRangeAndLength = (contentRange: string) => {
  const [range, length] = contentRange.split("/");
  const [start, end] = range.split("-");
  return {
    start: parseInt(start),
    end: parseInt(end),
    length: parseInt(length),
  };
};

export const downloadS3Url = async ({url, outputFile, onError, chunkSize}: DownloadLargeFileProps) => {
  const key = getS3UrlKey(url)
  const writeStream = fs.createWriteStream(
    outputFile
  ).on("error", (err) => {
    if (onError) {
      onError(err)
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
        key,
        ...nextRange,
      });

      if (Body) {
        writeStream.write(await Body.transformToByteArray());
      }

      rangeAndLength = getRangeAndLength(ContentRange || '');
    }
  } catch (e) {
    try {
      fs.unlinkSync(outputFile)
    } catch (e2: any) {
      console.log(e2.message)
    }

    throw e
  }
}
