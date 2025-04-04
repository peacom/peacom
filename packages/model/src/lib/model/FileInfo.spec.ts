import {getFileInfoFromUrl} from "./FileInfo";


describe('FileInfo', () => {
  it('getFileInfoFromUrl', () => {
    const rs = getFileInfoFromUrl('https://pngimg.com/uploads/birds/birds_PNG9.png')
    expect(rs).toEqual({
      name: 'birds_PNG9.png',
      type: 'image/png',
      extension: 'png',
      "url": "https://pngimg.com/uploads/birds/birds_PNG9.png"
    });
  });
  it('getFileInfoFromUrlWithText', () => {
    const rs = getFileInfoFromUrl('https://testing message')
    console.log(rs)
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png'
    });
  });
});
