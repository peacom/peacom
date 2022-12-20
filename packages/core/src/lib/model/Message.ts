export enum MESSAGE_STATUS {
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3,
  DELIVERED = 4,
  READ = 5,
}

export enum MESSAGE_TYPE {
  TEXT = "text",
  RICH_CARD = "rich_card",
  VIDEO = "video",
  PICTURE = "picture",
  FILE = "file",
  RICH_LINK = "richLink",
  LIST_PICKER = "listPicker",
  QUICK_REPLY = "quickReply",
  LOCATION = "location"
}

export enum SEND_MESSAGE_VIA {
  QUEUE = 1,
  DIRECTLY = 2
}

export enum MESSAGE_REACTION {
  REPLY = 1,
  LIKE = 2,
  SUGGESTION_CLICK = 3
}

export enum SuggestionActionType {
  OPEN_URL = "open-url",
  REPLY = "reply",
  DIAL = "dial",
}

export interface FileInfo {
  type: string
  name: string
  size: number
  url: string
  uuid: string
  preview?: string
}

export interface RawMessageSuggestion {
  action: SuggestionActionType
  text: string
  postbackData: string
}

export interface RichCard {
  title?: string
  titleRow?: number
  description?: string
  descriptionRow?: number
  image?: string
  imageRow?: number
  suggestions: RawMessageSuggestion[]
}

export interface PickListItem {
  title: string
  value: string
  subtitle?: string
  image?: string
}

type ReceivedMessage = PickListItem
type ReplyMessage = PickListItem

export interface RawMessage {
  type: MESSAGE_TYPE
  message?: string
  file?: FileInfo
  fileUrl?: string
  fileName?: string
  fileSize?: string | number
  trackingData?: ""
  richCards?: RichCard[]
  viberRichCardRow?: number
  viberRichCardCol?: number
  fileResolution?: string
  thumbnailUrl?: string
  thumbnailFile?: FileInfo
  suggestions?: Array<RawMessageSuggestion>
  allowMultiple?: boolean
  attachments?: Array<FileInfo>
  listPicker?: Array<PickListItem>
  receivedMessage?: ReceivedMessage
  replyMessage?: ReplyMessage
  richLinkUrl?: string
}
