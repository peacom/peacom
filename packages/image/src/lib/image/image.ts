import * as fs from 'fs';
import * as path from 'path';
import { Canvas, createCanvas, loadImage } from 'canvas';
import {v4 as uuid} from "uuid";

export enum GenerateType {
  TEXT,
  IMAGE,
}

export interface Location {
  x: number;
  y: number;
}

export interface GenerateOptions {
  /**
   * Width of the image (only applies if type is IMAGE).
   */
  width?: number;

  /**
   * Height of the image (only applies if type is IMAGE).
   */
  height?: number;

  /**
   * Font style used for text (e.g., "20px Arial").
   */
  font?: string;

  /**
   * Text alignment relative to x position.
   */
  textAlign?: CanvasTextAlign;

  /**
   * Text baseline alignment relative to y position.
   */
  textBaseline?: CanvasTextBaseline;

  /**
   * Fill color for the text (default: "#ffffff").
   */
  fillStyle?: string;
}


export interface GenerateItem {
  /**
   * Type of the item to render: TEXT or IMAGE.
   */
  type: GenerateType;

  /**
   * The data to render:
   * - If type is TEXT: a string to draw.
   * - If type is IMAGE: a path or URL to the image file.
   */
  data: string;

  /**
   * The position (x, y) where the item should be drawn on the canvas.
   */
  location: Location;

  /**
   * Optional rendering options for the item.
   */
  options?: GenerateOptions
}


export interface GenerateImageProp {
  baseImage: string;
  fileName?: string;
  width?: number;
  height?: number;
  items?: Array<GenerateItem>;
  output: string;
}

/**
 * Generates a new image based on a base image and overlays of text or image items.
 *
 * @param props.baseImage Path to the base image to draw on.
 * @param props.fileName Name of image (defaults uuid).
 * @param props.width Optional canvas width (defaults to base image width).
 * @param props.height Optional canvas height (defaults to base image height).
 * @param props.items List of items to overlay on the canvas.
 * @param props.output Output folder to save the final image file.
 * @returns Full path of the generated image file.
 */
export async function generateImage(props: GenerateImageProp): Promise<string> {
  try {
    const baseImage = await loadImage(props.baseImage);
    const canvas = createCanvas(props.width ?? baseImage.width, props.height ?? baseImage.height);
    const ctx = canvas.getContext('2d');

    // Draw base image
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // Draw overlay items
    if (props.items) {
      for (const item of props.items) {
        const { type, data, location, options } = item;
        if (type === GenerateType.IMAGE) {
          const image = await loadImage(data);
          ctx.drawImage(image, location.x, location.y, options?.width ?? image.width, options?.height ?? image.height);
        } else {
          ctx.font = options?.font || '20px sans-serif';
          ctx.textAlign = options?.textAlign || 'left';
          ctx.textBaseline = options?.textBaseline || 'middle';
          ctx.fillStyle = options?.fillStyle || '#ffffff';
          ctx.fillText(data, location.x, location.y);
        }
      }
    }

    const fileName = props.fileName ? `${props.fileName}-${uuid()}` : uuid();
    return createFile(canvas, fileName, props.output);
  } catch (err) {
     console.error(err)
     return "";
  }
}


async function createFile(canvas: Canvas, fileName: string, output: string): Promise<string> {
  const outputPath = path.join(output);
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });
  const filePath = path.resolve(outputPath, `${fileName}.png`);
  const fileWriteStream = fs.createWriteStream(filePath);
  canvas.createPNGStream().pipe(fileWriteStream);

  return new Promise((res) =>
    fileWriteStream.on('finish', () => res(filePath))
  );
}
