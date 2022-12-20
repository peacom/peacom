import {Application, PARTNER, SEND_MESSAGE_VIA} from '../model/';
import {RawMessage} from "../model/";

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

export interface ApiChannelMessageParams {
  applicationId: Application,
  application: Record<string, unknown>,
  partnerId: PARTNER,
  rawMessage: RawMessage,
  messageId: string // message Public ID
  receiverId: string
  sendVia: SEND_MESSAGE_VIA
  queueOption?: Record<string, unknown>
}

export type LOG_FUNCTION = ((t: unknown) => void) | null
