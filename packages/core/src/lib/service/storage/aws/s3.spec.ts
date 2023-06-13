import {uploadS3FromUrl} from "./s3.service";
import fetch from 'node-fetch';

describe('s3.service.specs.ts', () => {
  it('uploadS3FromUrl', async () => {
    const rs = await uploadS3FromUrl({url: 'https://pngimg.com/uploads/birds/birds_PNG9.png'})
    console.log(rs);
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png'
    });
  });
})
