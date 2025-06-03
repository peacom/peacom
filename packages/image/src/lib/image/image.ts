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
}

export function generateImage(props: GenerateImageProp): string {
  return 'image';
}
