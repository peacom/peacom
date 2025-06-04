export enum GenerateType {
  TEXT, IMAGE
}

export interface Location {
  x: number, y: number
}

export interface GenerateItem {
  type: GenerateType,
  data: string,
  location: Location
}

export interface GenerateImageProp {
  baseImage: string
  items: Array<GenerateItem>
  output: string
}

/**
 * baseImage: Image using for render all item
 * output: Full path of output file
 * @param props
 */
export function generateImage(props: GenerateImageProp): string {
  return 'image';
}
