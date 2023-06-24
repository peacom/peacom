import {getFileInfoFromLocalFile, getFileInfoFromUrl} from "./file.util";
import * as path from "path";

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
  it('test resolve', () => {
    let localFile = path.resolve('a', 'data/Chuyen-de-1.pdf');
    console.log(localFile)
    localFile = path.resolve('data/Chuyen-de-1.pdf');
    console.log(localFile)
  })
  it('getFileInfoFromLocal', () => {
    const localFile = path.resolve('./data/Chuyen-de-1.pdf');
    console.log(localFile)
    const folder = '/Users/lecanh/Documents/Project/Vietnam/Peacom/peacom/packages/core'
    const rs = getFileInfoFromLocalFile(localFile, folder)
    expect(rs).toEqual({
      id: "data/Chuyen-de-1.pdf",
      name: 'Chuyen-de-1.pdf',
      type: 'application/pdf',
      extension: '.pdf',
      url: '/Users/lecanh/Documents/Project/Vietnam/Peacom/peacom/packages/core/data/Chuyen-de-1.pdf',
      size: 17004899
    })
    console.log(rs)
  });
  it('getFileInfoFromLocalWrongFile', () => {
    try {
      const localFile = path.resolve('./data/Chuyen-de-2.pdf');
      console.log(localFile)
      getFileInfoFromLocalFile(localFile)
    } catch (e: any) {
      expect(e.code).toEqual('ENOENT')
    }
  });
});
