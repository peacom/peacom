import * as fs from 'fs';
import * as path from 'path';
import {
  S3,
  S3ClientConfig,
  PutObjectCommandInput,
  PutObjectCommand,
  GetObjectCommand,
  CreateMultipartUploadCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { HttpsProxyAgent } from 'https-proxy-agent';

import { AwsFileInfo, filterNonAlphaNumeric, getFileInfoFromUrl, hasText, rightString } from '@peacom/model';
import {
  DownloadLargeFileKeyProps,
  DownloadLargeFileProps,
  FileProp, GetObjectRangeProp,
  S3_ACL_OPTIONS,
  S3_FOLDERS,
  S3_INFO,
  S3_Options,
  UploadS3BufferProp
} from './constants';
import { getFileInfoFromLocalFile, writeFileStream } from '../../../util';

/**
 * Get s3 option base on options, if options is NULL, get default from env or throw not found
 * @param options
 */
const getS3 = (options: S3_Options) => {
  const s3Options = {
    endpoint: options.endpoint,
    forcePathStyle: options.forcePathStyle
  } as S3ClientConfig;

  if (hasText(options.region)) {
    s3Options.region = options.region;
  }

  if (options.accessKeyId && options.secretAccessKey) {
    s3Options.credentials = { accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey };
  }

  if (options.proxy) {
    const agent = new HttpsProxyAgent(options.proxy);
    s3Options.requestHandler = new NodeHttpHandler({
      httpsAgent: agent as any,
      httpAgent: agent as any
    });
  }

  return new S3(s3Options);
};
/**
 *
 * @param options
 */
export const getS3Service = (options?: S3_Options) => {
  const _options = options || {
    accessKeyId: process.env['S3_ACCESS_KEY'] || '',
    secretAccessKey: process.env['S3_SECRET_KEY'] || '',
    endpoint: process.env['S3_ENDPOINT'] || '',
    region: process.env['S3_REGION'] || '',
    domain: process.env['S3_DOMAIN'] || '',
    forcePathStyle: process.env['S3_PATH_STYLE'] !== '1',
    acl: process.env['S3_ACL'] || 0,
    proxy: process.env['S3_PROXY'] || '',
    bucket: process.env['S3_BUCKET'] || ''
  };

  const s3 = getS3(_options);

  const getS3EndPoint = () => {
    if (_options.domain && hasText(_options.domain)) {
      return _options.domain;
    }
    return _options.forcePathStyle ? `https://${_options.bucket}.s3.${_options.region}.amazonaws.com` : `https://s3.${_options.region}.amazonaws.com/${_options.bucket}`;
  };

  const getS3Url = (key: string | null | undefined) => `${getS3EndPoint()}/${key}`;

  const uploadLocalFileToS3 = async (
    { filePath = '' },
    folder = S3_FOLDERS.DEFAULT
  ): Promise<AwsFileInfo> => {
    const rs = getFileInfoFromLocalFile(filePath);
    const fileStream = fs.createReadStream(filePath);

    // Setting up S3 upload parameters
    const key = `${folder}/${path.basename(filePath)}`;
    const params: PutObjectCommandInput = {
      Bucket: _options.bucket,
      Key: key,
      Body: fileStream,
      ContentType: rs.type,
      ContentLength: rs.size
    };

    const command = new PutObjectCommand(params);
    try {
      await s3.send(command);

      return {
        ...rs,
        key,
        url: getS3Url(params.Key)
      };
    } finally {
      fileStream.destroy();
    }
  };

  const getPreSignedUrl = async (key: string, expiresIn = 3600) => {
    const command = new GetObjectCommand({
      Bucket: _options.bucket,
      Key: key
    });
    return getSignedUrl(s3, command, { expiresIn });
  };

  const createPreSignedUrl = async ({
                                      fileName,
                                      contentType,
                                      folder = S3_FOLDERS.DEFAULT,
                                      maxSize = 104857600
                                    }: FileProp) => {
    const fileInfo = fileName.split('.');
    const type = fileInfo.length > 1 ? fileInfo.pop() : '';

    const location = `${folder}/${filterNonAlphaNumeric(fileInfo.join('.'))}${hasText(type || '') ? `.${type}` : ''}`;
    const Conditions: Array<any> = [
      { key: location },
      ['content-length-range', 0, maxSize],
      ['eq', '$Content-Type', contentType]
    ];
    const command = {
      Bucket: S3_INFO.BUCKET,
      Key: location,
      Conditions,
      Expires: 3600,
      Fields: {
        'content-type': contentType
      } as any
    };
    if (Number(_options.acl)) {
      const acl = S3_ACL_OPTIONS[folder];
      if (acl) {
        command.Fields['x-amz-acl'] = acl;
      }
    }
    return {
      urlUpload: await createPresignedPost(s3, command),
      urlEndpoint: getS3Url(location)
    };
  };

  const getS3UrlKey = (url: string) => {
    const _url = getS3EndPoint();
    return rightString(
      url,
      url.length -
      _url.length
    );
  };

  const getAwsUrlInfo = async (str: string): Promise<AwsFileInfo> => {
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

  const getAwsKeyInfo = async (key: string): Promise<AwsFileInfo> => {
    const input = {
      // GetObjectRequest
      Bucket: _options.bucket,
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
      type: resp.ContentType || 'application/binary',
      key,
      bucket: _options.bucket
    };
  };

  const uploadS3Buffer = async (
    { fileName = '', contentType = 'application/octet-stream', data }: UploadS3BufferProp,
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

  const uploadS3FromUrl = async (
    { url = '', mimeType = '', name = '' },
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

  const uploadS3Multipart = async (
    { fileName = '', contentType = 'application/octet-stream', data }: UploadS3BufferProp,
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

    const command = new CreateMultipartUploadCommand(params);
    await s3.send(command);
    return {
      key, name: fileName, url: getS3Url(key), type: contentType
    };
  };

  const uploadMultipartS3FromUrl = async (
    { url = '', mimeType = '', name = '' },
    folder = S3_FOLDERS.DEFAULT
  ): Promise<AwsFileInfo> => {
    const data = await fetch(url).then(t => t.arrayBuffer());
    const fileInfo = getFileInfoFromUrl(url);
    const uploadAwsInfo = await uploadS3Multipart(
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

  const isComplete = ({ end, length }: { end: number, length: number }) => end === length - 1;

  const getObjectRange = ({ bucket, key, start, end }: GetObjectRangeProp) => {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      Range: `bytes=${start}-${end}`
    });

    return s3.send(command);
  };

  const getRangeAndLength = (contentRange: string) => {
    const [range, length] = contentRange.split('/');
    const [start, end] = range.split('-');
    return {
      start: parseInt(start),
      end: parseInt(end),
      length: parseInt(length)
    };
  };

  const downloadS3Key = async ({
                                 key,
                                 outputFile,
                                 onError,
                                 chunkSize, log = console.info
                               }: DownloadLargeFileKeyProps) => new Promise(async (res, rej) => {
    const writeStream = fs.createWriteStream(
      outputFile
    ).on('error', (err) => {
      if (onError) {
        onError(err);
      }
      rej(err);
    });

    let rangeAndLength = { start: -1, end: -1, length: -1 };
    try {
      while (!isComplete(rangeAndLength)) {
        const { end } = rangeAndLength;
        const nextRange = { start: end + 1, end: end + chunkSize };

        log(`Downloading bytes ${nextRange.start} to ${nextRange.end}`);

        const { ContentRange, Body } = await getObjectRange({
          bucket: S3_INFO.BUCKET,
          key: key || '',
          ...nextRange
        });

        if (Body) {
          log(`Write Stream: ${JSON.stringify(ContentRange)}`);
          await writeFileStream(writeStream, await Body.transformToByteArray());
          log(`Write Stream Finish`);
        }
        rangeAndLength = getRangeAndLength(ContentRange || '');
      }
      writeStream.end(() => {
        res(outputFile);
      });
    } catch (e: any) {
      if (onError) {
        onError(e);
      }
      try {
        fs.unlinkSync(outputFile);
      } catch (e2: any) {
        log(e2.message);
      }

      return rej(e);
    }
  });

  const downloadS3Url = async ({ url, outputFile, onError, chunkSize, log }: DownloadLargeFileProps) => {
    const key = getS3UrlKey(url);
    return downloadS3Key({ key, outputFile, chunkSize, onError, log });
  };

  return {
    getS3EndPoint,
    getS3Url,
    uploadLocalFileToS3,
    getPreSignedUrl,
    createPreSignedUrl,
    getAwsKeyInfo,
    getAwsUrlInfo,
    getS3UrlKey, uploadS3Buffer, uploadS3FromUrl, uploadMultipartS3FromUrl, downloadS3Url, downloadS3Key
  };
};
