// eslint-disable-next-line @nx/enforce-module-boundaries
import { S3 } from "@aws-sdk/client-s3"

export const S3_OPTION = {
  accessKeyId: process.env['S3_ACCESS_KEY'] || '',
  secretAccessKey: process.env['S3_SECRET_KEY'] || '',
  endpoint: process.env['S3_ENDPOINT'] || '',
  region: process.env['S3_REGION'] || '',
  domain: process.env['S3_DOMAIN'] || ''
};

export const S3_INFO = {
  BUCKET: process.env['S3_BUCKET'] || ''
}

export const S3_FOLDERS = {
  DEFAULT: "files",
  TICKET: "files",
  PRIVATES: "privates",
};

export const s3 = new S3({
  credentials: {accessKeyId: S3_OPTION.accessKeyId, secretAccessKey: S3_OPTION.secretAccessKey},
  region: S3_OPTION.region, endpoint: S3_OPTION.endpoint
});
