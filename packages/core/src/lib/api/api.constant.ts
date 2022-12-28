import {Application, Message, PARTNER, RawMessage, SEND_MESSAGE_VIA} from '../model/';

interface ApplicationInfo {
  application: Application
  id: string
}

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
  application: Record<string, unknown>
  applicationId: Application;
}

export interface ApiChannelMessageParams {
  applicationId: Application,
  application: Record<string, unknown>,
  partnerId: PARTNER,
  rawMessage: RawMessage,
  messageId?: string // message Public ID
  receiverId: string
  sendVia: SEND_MESSAGE_VIA
  queueOption?: Record<string, unknown>
}

export type LOG_FUNCTION = ((t: unknown) => void) | null

export const MICROSERVICE_URL: Record<Application, string> = {
  [Application.APPLE]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4005/eip/apple',
  [Application.ZALO]: process.env['ZALO_INTEGRATION'] || 'http://127.0.0.1:4001/eip/zalo',
  [Application.ZALO_ZNS]: process.env['ZALO_INTEGRATION'] || 'http://127.0.0.1:4001/eip/zalo',
  [Application.RCS]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4006',
  [Application.VIBER]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4007',
  [Application.VIBER_BUSINESS]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4008',
  [Application.TELEGRAM]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4009',
  [Application.FACEBOOK]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4010',
  [Application.SMS]: process.env['APPLE_INTEGRATION'] || 'http://127.0.0.1:4011',
}

export const INTEGRATED_CHANNEL = [Application.APPLE, Application.ZALO, Application.ZALO_ZNS]
