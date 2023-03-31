import {Application} from "../Application";
import {BILLING_STATUS} from "../Billing";
import {FileInfo} from "../FileInfo";

export enum MESSAGE_CONTENT_TYPE {
  EVENT = 1, // DELIVERY STATUS
  MESSAGE,
  LIVE_AGENT_REQUEST,
  TYPING_INDICATOR
}

export enum SEND_TYPE {
  VIA_BROADCAST = 1,
  VIA_BOT = 2,
  VIA_TEMPLATE_TEST = 3,
  VIA_CONVERSATION = 4,
  VIA_PARTNER = 5
}

export enum MESSAGE_STATUS {
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3,
  DELIVERED = 4,
  READ = 5,
}

export enum DIRECTION_TYPE {
  SEND = 1,
  RECEIVE
}

export enum MESSAGE_TYPE {
  TEXT = "text",
  TEXT_WITH_ATTACHMENT = "text_with_attachment",
  RICH_CARD = "rich_card",
  VIDEO = "video",
  PICTURE = "picture",
  FILE = "file",
  RICH_LINK = "richLink",
  LIST_PICKER = "listPicker",
  QUICK_REPLY = "quickReply",
  LOCATION = "location",
  ZALO_LIST_PICKER = "zalo_list_picker",
  TYPING_INDICATOR_START = "TYPING_INDICATOR_START",
  TYPING_INDICATOR_STOP = "TYPING_INDICATOR_STOP"
}

export const GENERAL_MESSAGE = [MESSAGE_TYPE.TEXT, MESSAGE_TYPE.RICH_CARD, MESSAGE_TYPE.VIDEO, MESSAGE_TYPE.PICTURE, MESSAGE_TYPE.FILE]

export const APPLICATION_MESSAGE: Record<Application, Array<MESSAGE_TYPE>> = {
  [Application.APPLE]: [MESSAGE_TYPE.TEXT, MESSAGE_TYPE.TEXT_WITH_ATTACHMENT, MESSAGE_TYPE.RICH_LINK, MESSAGE_TYPE.LIST_PICKER, MESSAGE_TYPE.QUICK_REPLY, MESSAGE_TYPE.LOCATION, MESSAGE_TYPE.TYPING_INDICATOR_START, MESSAGE_TYPE.TYPING_INDICATOR_STOP],
  [Application.SMS]: [MESSAGE_TYPE.TEXT],
  [Application.VIBER]: GENERAL_MESSAGE,
  [Application.RCS]: [...GENERAL_MESSAGE, MESSAGE_TYPE.TYPING_INDICATOR_START, MESSAGE_TYPE.TYPING_INDICATOR_STOP],
  [Application.TELEGRAM]: GENERAL_MESSAGE,
  [Application.VIBER_BUSINESS]: GENERAL_MESSAGE,
  [Application.FACEBOOK]: GENERAL_MESSAGE,
  [Application.ZALO]: [...GENERAL_MESSAGE, MESSAGE_TYPE.ZALO_LIST_PICKER],
  [Application.ZALO_ZNS]: [MESSAGE_TYPE.TEXT],
  [Application.VIBER_BOT]: GENERAL_MESSAGE,
  [Application.WHATSAPP]: GENERAL_MESSAGE,
  [Application.GOOGLE_BUSINESS]: [MESSAGE_TYPE.TEXT, MESSAGE_TYPE.RICH_CARD, MESSAGE_TYPE.PICTURE],
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
  LIVE_AGENT_REQUEST = "liveAgentRequest"
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

export interface Message {
  id: number;
  publicId: number;
  extraData?: RawMessage;
  createdDate: string;
  cost?: number;
  billingStatus?: BILLING_STATUS
}
