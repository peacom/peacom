import {getFileInfoFromUrl} from "./file.util";

describe('file.util', () => {
  it('getFileInfoFromUrl', () => {
    const rs = getFileInfoFromUrl('https://pngimg.com/uploads/birds/birds_PNG9.png')
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png'
    });
  });
  it('getFileInfoFromUrlWithText', () => {
    const rs = getFileInfoFromUrl('https://testing message')
    console.log(rs)
    expect(rs).toEqual({
      name: 'birds_PNG9.png', type: 'image/png', extension: 'png'
    });
  });
  it('getFileInfoFromUrl1', () => {
    const rs = getFileInfoFromUrl('https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg')
    console.log(rs)
  });
});
