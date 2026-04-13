import { getS3Service } from './s3-custom.service';


describe('s3-custom.service.specs.ts', () => {
  it('createPreSignedUrl', async () => {
    const s3Service = getS3Service();
    console.log(await s3Service.createPreSignedUrl({ fileName: 'test1234', contentType: 'application/xml' }));
  });
});
