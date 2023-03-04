import {FileInfo, MESSAGE_TYPE, RawMessageSuggestion} from "../../model";

interface ImageMessage {
  imageUrl: string,
  fileName?: string,
  fileSize?: number,
  message?: string
}

interface VideoMessage {
  fileUrl: string,
  thumbnailUrl?: string,
  duration?: number,
  message?: string
}

interface TextMessage {
  attachments?: Array<FileInfo>,
  message: string,
  suggestions?: Array<RawMessageSuggestion>
}

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
  richCards: Array<unknown>,
}

export const buildTextMessage = ({message, attachments, suggestions}: TextMessage, extra = null) => ({
  type: MESSAGE_TYPE.TEXT,
  message,
  suggestions,
  attachments,
  extra
});

export const buildRichCardMessage = ({richCards}: RichCardMessage, extra = null) => ({
  message: "",
  type: MESSAGE_TYPE.RICH_CARD,
  richCards,
  extra
});

export const buildTypingIndicatorStartMessage = (extra = null) => ({
  message: "",
  type: MESSAGE_TYPE.TYPING_INDICATOR_START,
  extra
});

export const buildTypingIndicatorStopMessage = (extra = null) => ({
  message: "",
  type: MESSAGE_TYPE.TYPING_INDICATOR_STOP,
  extra
});

export const buildImageMessage = ({imageUrl, fileName = "", fileSize, message = ""}: ImageMessage, extra = null) => ({
  type: MESSAGE_TYPE.PICTURE,
  fileName: fileName,
  fileSize: fileSize,
  fileUrl: imageUrl,
  message: message,
  extra
});

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
