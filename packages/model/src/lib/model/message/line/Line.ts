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
