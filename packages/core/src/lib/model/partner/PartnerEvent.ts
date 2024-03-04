import {PARTNER_MESSAGE_TYPE} from "./index";
import {MESSAGE_STATUS, RawMessage, Application} from "@peacom/model";
import {JobsOptions} from "bullmq";

export interface PartnerEvent {
  messageId: string // Peacom Message Public ID = Partner Application Message ID
  type: PARTNER_MESSAGE_TYPE
  timestamp: number
  cause: string
  status: MESSAGE_STATUS
  message?: RawMessage
  publicId?: string // channel publicId OA, BOT Public ID
  applicationId: Application
  from?: string
  clientMessageId?: string
}

export interface QueuePartnerEventParam {
  webHookUrl: string
  event: PartnerEvent
  companyId: number
  jobOpt?: JobsOptions,
}
