import {downloadURLToBas64} from "./Download";

describe('Download', () => {
  it('should work', async () => {
    await downloadURLToBas64('https://img.freepik.com/premium-photo/technology-digital-wave-background_34629-925.jpg')
  });
});
