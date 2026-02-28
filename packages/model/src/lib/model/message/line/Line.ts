/**
 * @links https://developers.line.biz/en/reference/messaging-api/#template-messages
 */
export enum LineTemplateType {
  BUTTONS = 'buttons',
  CONFIRM = 'confirm',
  CAROUSEL = 'carousel',
  IMAGE_CAROUSEL = 'image_carousel',
}

export enum LineImageAspectRatio {
  RECTANGLE = 'rectangle',
  SQUARE = 'square',
}

export enum LineImageSize {
  COVER = 'cover',
  CONTAIN = 'contain',
}

export enum LineTemplateAction {
  POSTBACK = 'postback',
  MESSAGE = 'message',
  URI = 'uri',
  DATETIMEPICKER = 'datetimepicker',
  CAMERA = 'camera',
  CAMERAROLL = 'cameraRoll',
  LOCATION = 'location',
  RICHMENUSWITCH = 'richmenuswitch',
  CLIPBOARD = 'clipboard',
}

export interface LineAction {
  type?: LineTemplateAction;
  label?: string;
  data?: string;
  mode?: string; // date: Pick date time: Pick time datetime: Pick date and time
  min?: string;
  max?: string;
  text?: string;
  clipboardText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nextMessage?: any;
  uri?: string;
}

export interface LineTemplate {
  type?: LineTemplateType;
  thumbnailImageUrl?: string;
  imageAspectRatio?: LineImageAspectRatio;
  imageSize?: LineImageSize;
  imageBackgroundColor?: string;
  title?: string;
  text?: string;
  defaultAction?: LineAction;
  actions?: Array<LineAction>;
  columns?: Array<{
    thumbnailImageUrl?: string;
    imageUrl?: string;
    imageBackgroundColor?: string;
    title?: string;
    text?: string;
    defaultAction?: LineAction;
    actions?: Array<LineAction>;
    action?: LineAction;
  }>;
}

export interface LineTemplateForm {
  type?: string;
  altText?: string;
  template: LineTemplate;
}
