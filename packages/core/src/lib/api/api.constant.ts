import {Application, ApplicationInfo, Message, PARTNER, RawMessage, SEND_MESSAGE_VIA} from '../model/';

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
}

export interface ApiCoreHandleResponse {
  receiverId: string
  messages: Array<Message>
  contact: unknown
  applicationInfo: ApplicationInfo
}

export interface ApiChannelMessageParams {
  applicationId: Application,
  application: Record<string, unknown>,
  partnerId: PARTNER,
  rawMessage: RawMessage,
  messageId?: string // message Public ID
  internalMessageId?: number
  receiverId: string
  sendVia: SEND_MESSAGE_VIA
  queueOption?: Record<string, unknown>,
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
}

export const INTEGRATED_CHANNEL = [Application.APPLE, Application.ZALO, Application.ZALO_ZNS]
