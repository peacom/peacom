// eslint-disable-next-line @nx/enforce-module-boundaries
import { S3 } from "@aws-sdk/client-s3"

export const S3_OPTION = {
  accessKeyId: process.env['S3_ACCESS_KEY'] || '',
  secretAccessKey: process.env['S3_SECRET_KEY'] || '',
  endpoint: process.env['S3_ENDPOINT'] || '',
  region: process.env['S3_REGION'] || '',
  domain: process.env['S3_DOMAIN'] || '',
  auth: process.env['S3_AUTH'] || ""
};

export const S3_INFO = {
  BUCKET: process.env['S3_BUCKET'] || ''
}

export const S3_FOLDERS = {
  DEFAULT: "files",
  TICKET: "files",
  PRIVATES: "privates",
};

interface S3Config {
  region: string,
  endpoint: string,
  credentials?: {
    accessKeyId: string,
    secretAccessKey: string
  }
}

const getS3ByOption = () => {
  const s3Options = {
      region: S3_OPTION.region,
      endpoint: S3_OPTION.endpoint
  } as S3Config

  if (S3_OPTION.accessKeyId && S3_OPTION.secretAccessKey) {
    s3Options.credentials = {accessKeyId: S3_OPTION.accessKeyId, secretAccessKey: S3_OPTION.secretAccessKey}
  }
  return new S3(s3Options)
}

export const s3 = getS3ByOption()
