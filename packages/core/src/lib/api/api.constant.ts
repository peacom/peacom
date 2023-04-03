import {Application, ApplicationInfo, Message, PARTNER, RawMessage, SEND_MESSAGE_VIA} from '../model/';
import {Conversation} from "../model";

interface Contact {
  id: string
  name?: string
  phone?: string
  isSubscribed: boolean
  extraData: Record<string, unknown>
  avatarUrl?: string
  language: string
  country: string
}

export interface ApiCoreHandleParams {
  to: ApplicationInfo
  rawMessage: RawMessage
  replyToApplicationMessageId?: string
  sentTime: number;
  extraData?: Record<string, unknown>
  applicationMessageId: string;
  from: Contact
  conversation?: Conversation
}

export interface ApiCoreLiveAgentParams {
  to: ApplicationInfo
  sentTime: number;
  extraData?: Record<string, unknown>
  applicationMessageId: string;
  from: Contact
  conversation?: Conversation
}

export interface ApiCoreLiveAgentResponse {
  conversation?: Conversation
}

export interface ApiCoreHandleResponse {
  receiverId: string
  messages: Array<Message>
  contact: unknown
  applicationInfo: ApplicationInfo
  conversation?: Conversation
}

export interface ApiChannelMessageParams {
  applicationInfo?: ApplicationInfo
  message: Message
  receiverId: string
  sendVia?: SEND_MESSAGE_VIA
  conversation?: Conversation
  queueOption?: Record<string, unknown>,

  [key: string]: unknown
}

export interface ApiChannelMessageResponse {
  applicationMessageId: string
  extraData?: Record<string, unknown>,

  [key: string]: unknown
}

export type LOG_FUNCTION = ((t: unknown) => void) | null

export const MICROSERVICE_URL: Record<Application, string> = {
  [Application.APPLE]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4005/eip/apple',
  [Application.ZALO]: process.env['ZALO_INTEGRATION'] || 'http://127.0.0.1:4001/eip/zalo/bot',
  [Application.ZALO_ZNS]: process.env['ZALO_ZNS_INTEGRATION'] || 'http://127.0.0.1:4001/eip/zalo/zns',
  [Application.RCS]: process.env['RCS_INTEGRATION'] || 'http://127.0.0.1:4006',
  [Application.VIBER]: process.env['VIBER_BOT_INTEGRATION'] || 'http://127.0.0.1:4001/eip/viber/bot',
  [Application.VIBER_BUSINESS]: process.env['VIBER_BUSINESS_INTEGRATION'] || 'http://127.0.0.1:4001/eip/viber/business',
  [Application.TELEGRAM]: process.env['TELEGRAM_INTEGRATION'] || 'http://127.0.0.1:4009',
  [Application.FACEBOOK]: process.env['FACEBOOK_INTEGRATION'] || 'http://127.0.0.1:4010',
  [Application.SMS]: process.env['SMS_INTEGRATION'] || 'http://127.0.0.1:4011',
  [Application.VIBER_BOT]: process.env['VIBER_BOT_INTEGRATION'] || 'http://127.0.0.1:4001/eip/viber/bot',
  [Application.WHATSAPP]: process.env['WHATSAPP_INTEGRATION'] || 'http://127.0.0.1:4001/eip/whatsapp',
  [Application.GOOGLE_BUSINESS]: process.env['GOOGLE_BUSINESS_INTEGRATION'] || 'http://127.0.0.1:4006/eip/google/business',
}

export const INTEGRATED_CHANNEL = [Application.APPLE, Application.ZALO, Application.ZALO_ZNS, Application.GOOGLE_BUSINESS]
