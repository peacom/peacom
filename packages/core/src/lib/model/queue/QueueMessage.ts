import {JobsOptions} from "bullmq";
import {Conversation, ApplicationInfo, Message, MESSAGE_STATUS} from "@peacom/model";

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
  source: QueueMessageStatusSource
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
