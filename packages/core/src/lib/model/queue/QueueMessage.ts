import {Application} from "../";
import {MESSAGE_STATUS} from "../Message";


export interface QueueMessageStatus {
  applicationMessageId: string;
  applicationId: Application;
  status: MESSAGE_STATUS;
  date: number;
  extraData: Record<string, unknown>;
  deliveryStatus?: string
}


