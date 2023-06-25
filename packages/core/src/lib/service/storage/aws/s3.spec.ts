import {createPreSignedUrl, downloadS3Url, uploadLocalFileToS3, uploadS3FromUrl} from "./s3.service";
import * as path from "path";

describe('s3.service.specs.ts', () => {
  it('uploadS3FromUrl test env key', async () => {
    console.log(process.env['S3_SECRET_KEY'])
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs);
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png',
      "key": "files/birds_PNG9.png","size": 827214,
      "url": "https://ap-southeast-1-dev-peacom.s3.ap-southeast-1.amazonaws.com/files/birds_PNG9.png"
    });
  }, 200000);
  it('uploadS3FromLocalFile xml', async () => {
    const xmlFile = path.resolve( 'src', 'lib', 'service', 'storage', 'aws', 'RBM_7_10_data.xlsx')
    const rs = await uploadLocalFileToS3({filePath: xmlFile})
    console.log(rs);
  }, 200000);
  it('Download S3 Large file', async () => {
    await downloadS3Url({
      url: 'https://ap-southeast-1-dev-peacom.s3.ap-southeast-1.amazonaws.com/files/birds_PNG9.png',
      outputFile: './test1.png', chunkSize: 1024
    })
  }, 200000)
  it('createPreSignedUrl', async () => {
    console.log(await createPreSignedUrl({fileName: 'test1234.xml', contentType: 'application/xml'}))
  })
})
