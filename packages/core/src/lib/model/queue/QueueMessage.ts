import {ApplicationInfo, RawMessage} from "../";
import {MESSAGE_STATUS} from "../";
import {JobsOptions} from "bullmq";
import {Conversation} from "../conversation";

export enum QueueMessageStatusSource {
  LOCAL = 1,
  PARTNER = 2
}

export interface QueueMessageStatus {
  messageId?: string;
  applicationMessageId?: string;
  applicationInfo: ApplicationInfo;
  status: MESSAGE_STATUS;
  sentTime: number;
  extraData?: Record<string, unknown>;
  deliveryStatus?: string,
  jobOpt?: JobsOptions,
  source: QueueMessageStatusSource
}

export interface QueueOutgoingMessage {
  receiverId: string
  messages: Array<{
    rawMessage: RawMessage,
    publicId?: string,
    id?: number
  }>
  applicationInfo: ApplicationInfo
  contact: unknown
  jobOpt?: JobsOptions,
  name?: string
  conversation?: Conversation
}
