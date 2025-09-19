import {PARTNER_MESSAGE_TYPE} from "./index";
import {MESSAGE_STATUS, RawMessage, Application, TEMPLATE_STATUS, ChannelStatus} from "@peacom/model";
import {JobsOptions} from "bullmq";

export enum TemplateEventType {
  STATUS, CATEGORY
}

export enum PhoneEventType {
  CALL_CONSENT,
  CALL_END
}

export interface PhoneEvent {
  type: PhoneEventType,
  userId: string
  extraData?: Record<string, any>
}

export interface TemplateEvent {
  publicId: string // MMP Internal ID
  type?: TemplateEventType
  partnerTemplateId?: string
  status?: TEMPLATE_STATUS
  cause?: string
  extraData?: Record<string, any>
}

export enum ChannelEventType {
  STATUS
}

export interface ChannelEvent {
  publicId: string // MMP Internal ID
  type?: ChannelEventType
  status?: ChannelStatus
  cause?: string
  extraData?: Record<string, any>
}

export interface PartnerEvent {
  type: PARTNER_MESSAGE_TYPE
  timestamp: number
  messageId: string // Peacom Message Public ID = Partner Application Message ID
  cause: string
  status: MESSAGE_STATUS
  message?: RawMessage
  publicId?: string // channel publicId OA, BOT Public ID
  applicationId: Application
  from?: string
  clientMessageId?: string
  template?: TemplateEvent
  phoneEvent?: PhoneEvent
}

export interface QueuePartnerEventParam {
  webHookUrl: string
  event: PartnerEvent
  companyId: number
  jobOpt?: JobsOptions,
}

export interface QueuePartnerEvent {
  webHookId: number
  event: PartnerEvent
  jobOpt?: JobsOptions,
}
