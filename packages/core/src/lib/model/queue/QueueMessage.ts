import {Application} from "../";
import {MESSAGE_STATUS} from "../Message";
import {JobsOptions} from "bullmq";

export enum QueueMessageStatusSource {
  LOCAL = 1,
  PARTNER = 2
}

export interface QueueMessageStatus {
  messageId: string;
  applicationMessageId: string;
  applicationId: Application;
  status: MESSAGE_STATUS;
  date: number;
  extraData: Record<string, unknown>;
  deliveryStatus?: string,
  jobOpt?: JobsOptions,
  source: QueueMessageStatusSource
}


