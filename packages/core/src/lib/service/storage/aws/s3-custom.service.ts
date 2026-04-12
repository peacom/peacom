import { S3_Options } from './constants';
import { S3, S3ClientConfig } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { hasText } from '@peacom/model';

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
 * @param log
 */
export const getS3Service = (options?: S3_Options, log = console.info) => {
  const s3 = getS3(options || {
    accessKeyId: process.env['S3_ACCESS_KEY'] || '',
    secretAccessKey: process.env['S3_SECRET_KEY'] || '',
    endpoint: process.env['S3_ENDPOINT'] || '',
    region: process.env['S3_REGION'] || '',
    domain: process.env['S3_DOMAIN'] || '',
    forcePathStyle: process.env['S3_PATH_STYLE'] !== '1',
    acl: process.env['S3_ACL'] || 0,
    proxy: process.env['S3_PROXY'] || ''
  });

  return {};
};
