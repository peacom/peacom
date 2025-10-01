import {
  createPreSignedUrl,
  downloadS3Url,
  getAwsKeyInfo, getPreSignedUrl, getS3UrlKey,
  s3RemoveFile, s3RemoveMultipleFile,
  uploadLocalFileToS3, uploadMultipartLocalFileToS3, uploadMultipartS3FromUrl,
  uploadS3FromUrl
} from './s3.service';
import * as path from "path";
import * as fs from "fs";

describe('s3.service.specs.ts', () => {
  it.skip('uploadS3FromUrl test env key', async () => {
    console.log(process.env['S3_SECRET_KEY'])
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs);
  }, 200000);

  it.only('uploadMultipartS3FromUrl', async () => {
    const rs = await uploadMultipartS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs)
  }, 200000)

  it.only('uploadS3FromUrl Viettel test env key', async () => {
    console.log(process.env['S3_SECRET_KEY'])
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'}, 'files');
    console.log(rs);
  }, 200000);

  it('uploadS3FromLocalFile xml', async () => {
    const xmlFile = path.join(__dirname, 'RBM_7_10_data.xlsx')
    const rs = await uploadLocalFileToS3({filePath: xmlFile});
    console.log(rs);
  }, 200000);

  it.only('uploadMultipartS3FromLocalFile xml', async () => {
    const xmlFile = path.join(__dirname, 'RBM_7_10_data.xlsx')
    const rs = await uploadMultipartLocalFileToS3({filePath: xmlFile});
    console.log(rs);
  }, 200000);



  it.skip('Download S3 AWS Large file', async () => {
    const fileName = "birds_PNG9";
    await downloadS3Url({
      url: `https://${process.env['S3_BUCKET']}.s3.${process.env['S3_REGION']}.amazonaws.com/files/${fileName}.png`,
      outputFile: path.join(__dirname, 'output', `./${fileName}.aws.jpeg`),
      chunkSize: 1024 * 1024,
    });
  }, 200000)

  it.skip('Download S3 Google Large file', async () => {
    const fileName = "birds_PNG9";
    await downloadS3Url({
      url: `https://storage.googleapis.com/telin-mmp/files/${fileName}.png`,
      outputFile: path.join(__dirname, 'output', `${fileName}.google.jpeg`),
      chunkSize: 1024 * 1024,
    });
  }, 200000)

  it.only('Download S3 Viettel Large file', async () => {
    const fileName = "birds_PNG9";
    const folder = path.join(__dirname, 'output');
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    await downloadS3Url({
      url: `https://dev-cdn.peacom.co/files/LOGOBRIBIRU224x224_dba95bd1185142d993d42ec6d072a727_65aeefc2329b4d3bbc42cc3c740755e2.jpg`,
      outputFile: path.join(__dirname, 'output', `./${fileName}.viettel.jpeg`),
      chunkSize: 1024 * 1024,
      onError(err: Error) {
        console.error(err)
      }
    });
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
    console.log(await getAwsKeyInfo('files/birds_PNG9.png'))
  })

  it('Delete S3 File', async () => {
    console.log(await s3RemoveFile({key: 'files/RBM_7_10_data.xlsx'}))
  })

  it('Delete Multiple S3 File', async () => {
    console.log(await s3RemoveMultipleFile({keys: ['files/birds_PNG9.png', '1234']}))
  })
})
