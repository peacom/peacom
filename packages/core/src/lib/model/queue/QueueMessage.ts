import {JobsOptions} from "bullmq";
import {Conversation, ApplicationInfo, Message, MESSAGE_STATUS, BILLING_STATUS} from "@peacom/model";

export enum QueueMessageStatusSource {
  LOCAL = 1,
  PARTNER = 2
}

export interface QueueMessageStatus {
  messageId?: string; // message.publicId
  applicationMessageId?: string;
  applicationInfo: ApplicationInfo;
  status: MESSAGE_STATUS;
  sentTime: number;
  extraData?: Record<string, unknown>;
  deliveryStatus?: string,
  jobOpt?: JobsOptions,
  source: QueueMessageStatusSource,
  billing?: BILLING_STATUS // In some case, we need to add Bill when message it not delivery or read. Ex: When submit (SENT) success, we accept message bill
}

export interface QueueOutgoingMessage {
  receiverId: string
  messages: Array<Message>
  applicationInfo: ApplicationInfo
  contact: unknown
  jobOpt?: JobsOptions,
  name?: string
  conversation?: Conversation
}
