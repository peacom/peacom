export interface FileInfo {
  type: string
  name: string
  url: string
  extension?: string
  size?: number
  uuid?: string
  preview?: string
}

export interface AwsFileInfo extends FileInfo {
  key: string
  bucket?: string
}
