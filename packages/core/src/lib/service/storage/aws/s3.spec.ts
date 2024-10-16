import {
  createPreSignedUrl,
  downloadS3Url,
  getAwsKeyInfo, getPreSignedUrl, getS3UrlKey,
  s3RemoveFile, s3RemoveMultipleFile,
  uploadLocalFileToS3,
  uploadS3FromUrl
} from './s3.service';
import * as path from "path";

describe('s3.service.specs.ts', () => {
  it('uploadS3FromUrl test env key', async () => {
    console.log(process.env['S3_SECRET_KEY'])
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs);
  }, 200000);
  it('uploadS3FromLocalFile xml', async () => {
    const xmlFile = path.resolve('src', 'lib', 'service', 'storage', 'aws', 'RBM_7_10_data.xlsx')
    const rs = await uploadLocalFileToS3({filePath: xmlFile})
    console.log(rs);
  }, 200000);
  it('Download S3 Large file', async () => {
    await downloadS3Url({
      url: 'https://dev-cdn.peacom.co/privates/avatar.jpeg',
      outputFile: './avatar.jpeg', chunkSize: 1024 * 1024
    })
  }, 200000)
  it('createPreSignedUrl', async () => {
    console.log(await createPreSignedUrl({fileName: 'test1234', contentType: 'application/xml'}))
  })
  it('getPreSignedUrl', async () => {
    console.log(await getPreSignedUrl("privates/testphone_1938493c73a64fe5a207eea4e0f4ecf1.xlsx"))
  })
  it('getS3UrlKey', async () => {
    console.log(getS3UrlKey("https://dev-cdn.peacom.co/files/tes.png"))
  })
  it('Get S3 File', async () => {
    console.log(await getAwsKeyInfo('files/DaNangNHxlsx_e45afd6a-47c6-42ae-af7b-21f567a96a3c.xlsx'))
  })
  it('Delete S3 File', async () => {
    console.log(await s3RemoveFile({key: 'files/RBM_7_10_data.xlsx'}))
  })
  it('Delete Multiple S3 File', async () => {
    console.log(await s3RemoveMultipleFile({keys: ['files/birds_PNG9.png', '1234']}))
  })
})
