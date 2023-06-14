import {uploadS3FromUrl} from "./s3.service";

describe('s3.service.specs.ts', () => {
  it('uploadS3FromUrl test env key', async () => {
    console.log(process.env['S3_SECRET_KEY'])
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs);
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png',
      "url": "https://ap-southeast-1-dev-peacom.s3.ap-southeast-1.amazonaws.com/files/birds_PNG9.png"
    });
  }, 200000);
})
