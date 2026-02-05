import { Application } from '../Application';
import { BILLING_STATUS } from '../Billing';
import { FileInfo } from '../FileInfo';
import { WhatsappTemplate } from './sinch';
import { ZaloZnsTemmplateParam } from './zalo';
import { TemplateMessageSource } from './TemplateMessage';
import { WhatsappInteractive } from './infobip';

export enum MESSAGE_CONTENT_TYPE {
  EVENT = 1, // DELIVERY STATUS
  MESSAGE,
  LIVE_AGENT_REQUEST,
  TYPING_INDICATOR,
  CONVERSATION_CLOSE,
}

export enum SEND_TYPE {
  VIA_BROADCAST = 1,
  VIA_BOT = 2,
  RECEIVE = 3,
}

export const sendTypeStr = (sendType: SEND_TYPE | null) => {
  switch (sendType) {
    case SEND_TYPE.VIA_BROADCAST:
      return 'BROADCAST';
    case SEND_TYPE.RECEIVE:
      return 'RECEIVE';
    case SEND_TYPE.VIA_BOT:
      return 'CONVERSATION';
    default:
      return 'UNKNOWN';
  }
};

export enum MESSAGE_STATUS {
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3,
  DELIVERED = 4,
  READ = 5,
}

export const messageStatusStr = (status: MESSAGE_STATUS) => {
  switch (status) {
    case MESSAGE_STATUS.PENDING:
      return 'PENDING';
    case MESSAGE_STATUS.SUCCESS:
      return 'SUCCESS';
    case MESSAGE_STATUS.FAIL:
      return 'FAIL';
    case MESSAGE_STATUS.DELIVERED:
      return 'DELIVERED';
    case MESSAGE_STATUS.READ:
      return 'READ';
    default:
      return `UNKNOWN (${status})`;
  }
};

export enum DIRECTION_TYPE {
  SEND = 1,
  RECEIVE,
}

export enum MESSAGE_TYPE {
  NONE = 'NONE',
  TEXT = 'text',
  TEXT_WITH_ATTACHMENT = 'text_with_attachment',
  RICH_CARD = 'rich_card',
  VIDEO = 'video',
  PICTURE = 'picture',
  FILE = 'file',
  RICH_LINK = 'richLink',
  LIST_PICKER = 'listPicker',
  QUICK_REPLY = 'quickReply',
  LOCATION = 'location',
  ZALO_LIST_PICKER = 'zalo_list_picker',
  TYPING_INDICATOR_START = 'TYPING_INDICATOR_START',
  TYPING_INDICATOR_STOP = 'TYPING_INDICATOR_STOP',
  ZALO_ZNS_TEMPLATE = 'zalo_zns_template',
  SHARE_INFO = 'share_info',
  REACTION = 'reaction',
  FB_WHATSAPP_TEMPLATE = 'fb_whatsapp_template',
  FB_WHATSAPP_INTERACTIVE = 'FB_WHATSAPP_INTERACTIVE',
  ZALO_TRANSACTION_MESSAGE = 'ZALO_TRANSACTION_MESSAGE',
  ZALO_PROMOTION_MESSAGE = 'ZALO_PROMOTION_MESSAGE',
  PRODUCT_LIST = 'PRODUCT_LIST',
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
  CONVERSATION_STARTED = 'CONVERSATION_STARTED',
  CHOICES = 'CHOICES',
  FORM = 'FORM',
  ARTICLES = 'ARTICLES',
  FORM_RESULT = 'FORM_RESULT',
  VIBER_CAROUSEL = 'VIBER_CAROUSEL',
  VIBER_LIST_MESSAGE = 'VIBER_LIST_MESSAGE',
  CALL_CONSENT = 'CALL_CONSENT',
  CALL_CONFIRM = 'CALL_CONFIRM',
  CALL_INFO = 'CALL_INFO',
  SHARE = 'SHARE',
  NEWS = 'NEWS',
  LINE_TEMPLATE = 'LINE_TEMPLATE'
}

export const GENERAL_MESSAGE = [
  MESSAGE_TYPE.TEXT,
  MESSAGE_TYPE.RICH_CARD,
  MESSAGE_TYPE.VIDEO,
  MESSAGE_TYPE.PICTURE,
  MESSAGE_TYPE.FILE,
  MESSAGE_TYPE.VIBER_CAROUSEL,
  MESSAGE_TYPE.VIBER_LIST_MESSAGE,
];

export const APPLICATION_MESSAGE: Record<Application, Array<MESSAGE_TYPE>> = {
  [Application.APPLE]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.TEXT_WITH_ATTACHMENT,
    MESSAGE_TYPE.RICH_LINK,
    MESSAGE_TYPE.LIST_PICKER,
    MESSAGE_TYPE.QUICK_REPLY,
    MESSAGE_TYPE.LOCATION,
    MESSAGE_TYPE.TYPING_INDICATOR_START,
    MESSAGE_TYPE.TYPING_INDICATOR_STOP,
  ],
  [Application.SMS]: [MESSAGE_TYPE.TEXT],
  [Application.VIBER]: GENERAL_MESSAGE,
  [Application.RCS]: [
    ...GENERAL_MESSAGE,
    MESSAGE_TYPE.TYPING_INDICATOR_START,
    MESSAGE_TYPE.TYPING_INDICATOR_STOP,
  ],
  [Application.TELEGRAM]: GENERAL_MESSAGE,
  [Application.VIBER_BUSINESS]: GENERAL_MESSAGE,
  [Application.FACEBOOK]: GENERAL_MESSAGE,
  [Application.ZALO]: [
    ...GENERAL_MESSAGE,
    MESSAGE_TYPE.ZALO_LIST_PICKER,
    MESSAGE_TYPE.ZALO_TRANSACTION_MESSAGE,
    MESSAGE_TYPE.ZALO_PROMOTION_MESSAGE,
  ],
  [Application.ZALO_ZNS]: [MESSAGE_TYPE.ZALO_ZNS_TEMPLATE],
  [Application.VIBER_BOT]: GENERAL_MESSAGE,
  [Application.WHATSAPP]: [
    MESSAGE_TYPE.FB_WHATSAPP_TEMPLATE,
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.FILE,
    MESSAGE_TYPE.LOCATION,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.FB_WHATSAPP_INTERACTIVE,
  ],
  [Application.GOOGLE_BUSINESS]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.RICH_CARD,
    MESSAGE_TYPE.PICTURE,
  ],
  [Application.LIVE_CHAT]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.FILE,
    MESSAGE_TYPE.RICH_CARD,
    MESSAGE_TYPE.CHOICES,
    MESSAGE_TYPE.FORM,
    MESSAGE_TYPE.ARTICLES,
  ],
  [Application.MMS]: [
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.FILE,
  ],
  [Application.TELEGRAM_GATEWAY]: [MESSAGE_TYPE.TEXT],
  [Application.INSTAGRAM]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.FILE,
    MESSAGE_TYPE.QUICK_REPLY,
    MESSAGE_TYPE.RICH_CARD,
  ],
  [Application.WECOM_CUSTOMER_GROUP]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.FILE,
  ],
  [Application.WECOM_CUSTOMER]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.FILE,
  ],
  [Application.WECOM_INTERNAL]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.FILE,
  ],
  [Application.WECOM_COMPANY]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.FILE,
  ],
  [Application.WECHAT]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.FILE,
    MESSAGE_TYPE.NEWS,
    MESSAGE_TYPE.QUICK_REPLY,
  ],
  [Application.LINE]: [
    MESSAGE_TYPE.TEXT,
    MESSAGE_TYPE.PICTURE,
    MESSAGE_TYPE.VIDEO,
    MESSAGE_TYPE.FILE,
    MESSAGE_TYPE.LOCATION,
    MESSAGE_TYPE.LINE_TEMPLATE,
  ]
};

export enum SEND_MESSAGE_VIA {
  QUEUE = 1,
  DIRECTLY = 2,
}

export enum MESSAGE_REACTION {
  REPLY = 1,
  LIKE = 2,
  SUGGESTION_CLICK = 3,
  DELETE = 4,
}

export enum SuggestionActionType {
  OPEN_URL = 'open-url',
  REPLY = 'reply',
  DIAL = 'dial',
  CALENDAR = 'CalendarEventAction',
  VIEW_LOCATION = 'VIEW_LOCATION',
  SHARE_LOCATION = 'SHARE_LOCATION',
  SHARE_INFO = 'SHARE_INFO',
}

export interface RawMessageSuggestion {
  action: SuggestionActionType;
  text: string;
  postbackData: string;
}

export interface RichCard {
  title?: string;
  titleRow?: number;
  description?: string;
  descriptionRow?: number;
  image?: string;
  imageRow?: number;
  suggestions: RawMessageSuggestion[];
}

export interface PickListItem {
  title: string;
  value: string;
  subtitle?: string;
  image?: string;
}

type ReceivedMessage = PickListItem;
type ReplyMessage = PickListItem;

export interface ContactMessage {
  name: string;
  phone: string;
  address: string;

  [key: string]: any;
}

export enum PreviewUrlPosition {
  BEFORE = 1,
  AFTER = 2,
}

export interface PreviewUrl {
  image: string;
  title: string;
  redirectUrl: string;
  position: PreviewUrlPosition;
}

export enum ExpireType {
  NONE = 'NONE',
  TTL = 'TTL',
  EXPIRE_TIME = 'EXPIRE_TIME',
}

interface Expire {
  type: ExpireType;
  ttl: string;
  expireTime: string;
}

export interface RawMessage {
  type: MESSAGE_TYPE;
  message?: string;
  previewUrl?: PreviewUrl;
  file?: FileInfo;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string | number;
  trackingData?: '';
  richCards?: RichCard[];
  rcsExpireOpts?: Expire;
  rcsRichCardsOpts?: {
    type: 'STANDALONE' | 'CAROUSEL';
    orientation?: string;
    imageAlign?: string;
  };
  viberRichCardRow?: number;
  viberRichCardCol?: number;
  fileResolution?: string;
  thumbnailUrl?: string;
  thumbnailFile?: FileInfo;
  suggestions?: Array<RawMessageSuggestion>;
  allowMultiple?: boolean;
  attachments?: Array<FileInfo>;
  listPicker?: Array<PickListItem>;
  receivedMessage?: ReceivedMessage;
  replyMessage?: ReplyMessage;
  richLinkUrl?: string;
  zaloZnsTemplateParam?: ZaloZnsTemmplateParam;
  whatsappTemplateParam?: WhatsappTemplate;
  whatsappInteractive?: WhatsappInteractive;
  contacts?: Array<ContactMessage>;
  source?: TemplateMessageSource;
  extra?: any;
  formMessages?: Array<FormMessageItem>;
  articleMessages?: Array<ArticlesMessageItem>;
  choiceMessages?: Array<ChoiceMessageItem>;
  sharePayload?: {
    url: string;
    title?: string;
    id?: string;
    type?: string;
  };
  news?: {
    articles?: Array<{
      title?: string;
      description?: string;
      url?: string;
      picurl?: string;
    }>;
  };
}

export interface Message {
  id?: number;
  publicId?: string;
  rawMessage: RawMessage;
  extraData?: RawMessage;
  createdDate?: string;
  cost?: number;
  billingStatus?: BILLING_STATUS;
}

export interface FormMessageItem {
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'text_area' | 'select' | string;
  label: string;
  deafult?: string;
  options?: Array<{ label: string; value: string }>;
}

export interface ArticlesMessageItem {
  title: string;
  description?: string;
  link: string;
}

export interface ChoiceMessageItem {
  title: string;
  value: any;
  nextMessage?: any;
}

export enum OPEN_URL_APPLICATION {
  WEBVIEW = 'WEBVIEW',
  BROWSER = 'BROWSER',
}

export enum WEBVIEW_TYPE {
  FULL = 'FULL',
  HALF = 'HALF',
  TALL = 'TALL',
}
