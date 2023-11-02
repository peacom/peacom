import {FileInfo} from "../../../model/FileInfo"

/**
 * Reference: https://developers.facebook.com/docs/whatsapp/on-premises/reference/messages#interactive-object
 */

export enum WhatsappInteractiveType {
  list = 'list',
  button = 'button', // Use it for Reply Buttons
  product = 'product',
  product_list = 'product_list'
}

export enum WhatsappInteractiveHeaderType {
  text = 'text', // For WhatsappInteractiveType [list, button, product_list]
  video = 'video', // For WhatsappInteractiveType [ button ]
  image = 'image', // For WhatsappInteractiveType [ button ]
  document = 'document', // For WhatsappInteractiveType [ button ]
}

export interface WhatsappInteractiveHeader {
  type: WhatsappInteractiveHeaderType,
  text?: string // MAX 60
  media?: FileInfo
}

export interface WhatsappInteractiveBody {
  text: string // MAX 1024
}

export interface WhatsappInteractiveFooter {
  text: string // MAX 1024
}

export enum WhatsappInteractiveReplyButtonType {
  REPLY = 'reply'
}

export interface WhatsappInteractiveReplyButton {
  type: WhatsappInteractiveReplyButtonType,
  title: string // 20 characters Unique,
  id: string,// Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters
  [key: string]: any
}

export interface WhatsappInteractiveSessionRow {
  title: string // 24 characters
  ID: string // Maximum length: 200 characters.
  description?: string // Optional 72 Characters
  [key: string]: any
}

export interface WhatsappInteractiveSession {
  title: string // 24 characters Unique,
  id: string,// Unique identifier for your button. This ID is returned in the webhook when the button is clicked by the user. Maximum length: 256 characters
  rows: Array<WhatsappInteractiveSessionRow>

  [key: string]: any
}

export interface WhatsappInteractiveAction {
  button?: string // Required for List Messages, Emojis are supported, markdown is not. Maximum length: 20 characters
  buttons?: Array<WhatsappInteractiveReplyButton> // Required for Reply Button Messages
  sessions?: Array<WhatsappInteractiveSession> // Required for List Messages and Multi-Product Messages.
}

export interface WhatsappInteractive {
  type: WhatsappInteractiveType
  header?: WhatsappInteractiveHeader | null // Required of WhatsappInteractiveType[product_list], NONE for [product], other optional
  body?: WhatsappInteractiveBody | null // Optional for type product. Required for other message types.
  footer?: WhatsappInteractiveFooter | null // Optional
  action: WhatsappInteractiveAction
}
