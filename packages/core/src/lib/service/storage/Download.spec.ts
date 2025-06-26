import {downloadURLToBas64} from "./Download";
import { createPreSignedUrl } from '@peacom/core';

describe('Download', () => {
  it('should work', async () => {
    await downloadURLToBas64('https://img.freepik.com/premium-photo/technology-digital-wave-background_34629-925.jpg')
  });
  it('createPreSignedUrl', async () => {
    console.log(await createPreSignedUrl({fileName: 'myFile6.xml', contentType: 'application/xml', folder: 'files'}))
  })
});
