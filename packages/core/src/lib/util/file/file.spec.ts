import {getFileInfoFromUrl} from "./file.util";

describe('file.util', () => {
  it('getFileInfoFromUrl', () => {
    const rs = getFileInfoFromUrl('https://pngimg.com/uploads/birds/birds_PNG9.png')
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png'
    });
  });
});
