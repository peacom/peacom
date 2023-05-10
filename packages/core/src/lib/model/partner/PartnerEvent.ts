import {PARTNER_MESSAGE_TYPE} from "./index";
import {MESSAGE_STATUS, RawMessage} from "../message";
import {JobsOptions} from "bullmq";

export interface PartnerEvent {
  messageId: string
  type: PARTNER_MESSAGE_TYPE
  timestamp: number
  cause: string
  status: MESSAGE_STATUS
  message?: RawMessage
  channelId?: string
  from?: string
  clientMessageId?: string
}

export interface QueuePartnerEventParam {
  webHookUrl: string
  event: PartnerEvent
  companyId: number
  jobOpt?: JobsOptions,
}
