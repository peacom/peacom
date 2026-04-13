import { PutObjectRequest, S3 } from '@aws-sdk/client-s3';
import { hasText } from '@peacom/model';
import * as process from 'process';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpHandlerUserInput as __HttpHandlerUserInput } from '@smithy/protocol-http/dist-types/httpHandler';

export interface S3_Options {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
  region?: string;
  domain?: string; // Using for custom domain
  forcePathStyle?: boolean;
  acl?: any;
  proxy?: string;

}

export const S3_OPTION: S3_Options = {
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

export const S3_INFO = {
  BUCKET: process.env['S3_BUCKET'] || ''
};

export const S3_FOLDERS = {
  DEFAULT: 'files',
  TICKET: 'files',
  PRIVATES: 'privates'
};

export const S3_ACL_OPTIONS = {
  [S3_FOLDERS.PRIVATES]: '',
  [S3_FOLDERS.DEFAULT]: 'public-read'
};

interface S3Config {
  region?: string,
  endpoint: string,
  credentials?: {
    accessKeyId: string,
    secretAccessKey: string
  },
  requestHandler?: __HttpHandlerUserInput
}

const getS3ByOption = () => {
  const s3Options = {
    endpoint: S3_OPTION.endpoint,
    forcePathStyle: S3_OPTION.forcePathStyle
  } as S3Config;

  if (hasText(S3_OPTION.region)) {
    s3Options.region = S3_OPTION.region;
  }

  if (S3_OPTION.accessKeyId && S3_OPTION.secretAccessKey) {
    s3Options.credentials = { accessKeyId: S3_OPTION.accessKeyId, secretAccessKey: S3_OPTION.secretAccessKey };
  }

  if (S3_OPTION.proxy) {
    s3Options.requestHandler = new NodeHttpHandler({
      httpsAgent: new HttpsProxyAgent(S3_OPTION.proxy) as any
    });
  }

  return new S3(s3Options);
};

export const s3 = getS3ByOption();

export interface FileProp {
  fileName: string;
  contentType: string;
  folder?: string;
  maxSize?: number;
}

export interface UploadS3BufferProp extends FileProp {
  data: PutObjectRequest["Body"] | string | Uint8Array | Buffer;
}

export interface GetObjectRangeProp {
  bucket: string;
  key: string;
  start: number;
  end: number;
}

export interface DownloadLargeFileProps {
  url: string;
  outputFile: string;
  chunkSize: number;

  log?(message: string): void

  onError?(err: Error): void;
}

export interface DownloadLargeFileKeyProps {
  key: string;
  outputFile: string;
  chunkSize: number;

  log?(message: string): void

  onError?(err: Error): void;
}
