import {MESSAGE_TYPE} from "../../model";

interface ImageMessage {
  imageUrl: string,
  fileName?: string,
  fileSize?: number,
  message?: string
}

export const buildImageMessage = ({imageUrl, fileName = "", fileSize, message = ""}: ImageMessage, extra = null) => ({
  type: "picture",
  fileName: fileName,
  fileSize: fileSize,
  fileUrl: imageUrl,
  message: message,
  extra
});

interface VideoMessage {
  fileUrl: string,
  thumbnailUrl?: string,
  duration?: number,
  message?: string
}

export const buildVideoMessage = (
  {fileUrl, duration, thumbnailUrl, message = ""}: VideoMessage,
  extra = null
) => ({
  type: MESSAGE_TYPE.VIDEO,
  duration,
  fileUrl,
  thumbnailUrl,
  message,
  extra
});


interface TextMessage {
  attachments?: Array<any>,
  message: string
}

export const buildTextMessage = ({message}: TextMessage, extra = null) => ({
  type: MESSAGE_TYPE.TEXT,
  message,
  extra
});

interface Location {
  longitude: number
  latitude: number
}

interface LocationMessage {
  location: Location,
  message?: string
}

export const buildLocationMessage = (
  {location, message = ""}: LocationMessage,
  extra = null
) => ({
  type: MESSAGE_TYPE.LOCATION,
  message,
  location,
  extra
});


interface FileMessage {
  fileUrl: string,
  fileName: string,
  fileSize?: number
  message?: string
}

export const buildFileMessage = (
  {message = "", fileUrl, fileName = "", fileSize = 0}: FileMessage,
  extra = null
) => ({
  type: MESSAGE_TYPE.FILE,
  message,
  fileName,
  fileUrl,
  fileSize,
  extra
});

interface RichCardMessage {
  richCards: Array<any>,
}

export const buildRichCardMessage = ({richCards}: RichCardMessage, extra = null) => ({
  message: "",
  type: MESSAGE_TYPE.RICH_CARD,
  richCards,
  extra
});
