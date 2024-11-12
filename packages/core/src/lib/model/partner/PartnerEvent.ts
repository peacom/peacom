import {PARTNER_MESSAGE_TYPE} from "./index";
import {MESSAGE_STATUS, RawMessage, Application, TEMPLATE_STATUS} from "@peacom/model";
import {JobsOptions} from "bullmq";

export interface TemplateEvent {
  id?: number // MMP Internal ID
  partnerTemplateId?: string
  status: TEMPLATE_STATUS
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
