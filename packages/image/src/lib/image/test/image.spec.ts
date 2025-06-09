import path = require('path');
import { generateImage, GenerateType } from '../image';
import { loadImage } from 'canvas';
import * as fs from 'fs';

const output = path.join(__dirname, "output");
const baseImage = path.join(__dirname, 'images/Cat.jpg');

describe('image', () => {
  it('should work with only base image and custom name', async () => {
    const outputUrl = await generateImage({ baseImage, output, fileName: "meomeo" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });

  it('should work with only base image and no name', async () => {
    const outputUrl = await generateImage({ baseImage, output });
    expect(outputUrl).not.toBe("");
  });

  it('should work with base image and custom size', async () => {
    const width = 300;
    const height = 300;
    const outputUrl = await generateImage({ baseImage, output, width, height, fileName: "meomeo_has_size" });
    const imageOutput = await loadImage(outputUrl);
    expect(imageOutput.width).toEqual(width);
    expect(imageOutput.height).toEqual(height);
  });

  it('should work with image items without options', async () => {
    const items = [
      {
        type: GenerateType.IMAGE,
        data: path.join(__dirname, 'images/QR.jpg'),
        location: { x: 380, y: 360 },
      },
    ];
    const outputUrl = await generateImage({ baseImage, output, items, fileName: "meomeo_with_image_item_non_options" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });

  it('should work with image items with options', async () => {
    const items = [
      {
        type: GenerateType.IMAGE,
        data: path.join(__dirname, 'images/QR.jpg'),
        location: { x: 380, y: 360 },
        options: {
          width: 100,
          height: 100,
        },
      },
    ];
    const outputUrl = await generateImage({ baseImage, output, items, fileName: "meomeo_with_image_item_has_options" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });

  it('should work with text items non options', async () => {
    const items = [
      {
        type: GenerateType.TEXT,
        data: "Hi Peacom",
        location: { x: 380, y: 360 },
      },
    ];
    const outputUrl = await generateImage({ baseImage, output, items, fileName: "meomeo_with_text_item_non_options" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });

  it('should work with text items with options', async () => {
    const items = [
      {
        type: GenerateType.TEXT,
        data: 'Hi Peacom',
        location: { x: 380, y: 360 },
        options: {
          font: '30px sans-serif',
          textAlign: 'right' as CanvasTextAlign,
          textBaseline: 'top' as CanvasTextBaseline,
          fillStyle: '#ff0000',
        },
      },
    ];
    const outputUrl = await generateImage({ baseImage, output, items, fileName: "meomeo_with_text_item_has_options" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });

  it('should work with full options', async () => {
    const items = [
      {
        type: GenerateType.IMAGE,
        data: path.join(__dirname, 'images/QR.jpg'),
        location: { x: 380, y: 360 },
        options: {
          width: 100,
          height: 100,
        },
      },
      {
        type: GenerateType.TEXT,
        data: "Hi Peacom",
        location: { x: 380, y: 480 },
        options: {
          font: '20px sans-serif',
          textAlign: 'left' as CanvasTextAlign,
          textBaseline: 'top' as CanvasTextBaseline,
          fillStyle: '#ff0000',
        }
      },
    ];
    const output = path.join(__dirname, "output");
    const outputUrl = await generateImage({ baseImage, items, output, width: 500, height: 500, fileName: "meomeo_full_options" });
    expect(fs.existsSync(outputUrl)).toBeTruthy();
  });
});
