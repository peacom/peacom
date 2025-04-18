import { AclActionType } from './acl';

export enum NotificationPriority {
  HIGH = 1,
  NORMAL = 2,
}

export enum MessageEvent {
  CHANNEL_OA_STATUS = 'channel.oa.status',
  CHANNEL_REQUEST = 'channel.request',
  TEMPLATE_REQUEST = 'template.request',
  TEMPLATE_APPROVE = 'template.approve',
  TEMPLATE_REJECT = 'template.reject',
  TEMPLATE_DELETE = 'template.delete',
  COMPANY_KYC_REQUEST = 'company.kyc.request',
  COMPANY_KYC_REJECT = 'company.kyc.reject',
  COMPANY_KYC_APPROVE = 'company.kyc.approve',
  COMPANY_SUSPEND = 'company.suspend',
  COMPANY_SUSPEND_BO_SA = 'company.suspend.BO_SA',
  BACKGROUND_TASK = 'background.task',
  BALANCE_ALERT = 'balance.alert',
  BULK_DONE = 'bulk.done',
  BULK_FINISHED = 'bulk.finished',
  WEBHOOK = 'webhook',
  VNA_SUMMARY_CHECK_IN_REPORT = 'VNA_SUMMARY_CHECK_IN_REPORT',
  CONVERSATION_MESSAGE = 'conversation.message',
  CONVERSATION_LIVE_AGENT = 'conversation.live_agent',
  TICKET_ASSIGN = 'ticket.assign'
}

// We're migrating using MessageEvent to NotificationType (number) for faster index
export enum NotificationType {
  CHANNEL_OA_STATUS = 1,
  CHANNEL_REQUEST,
  TEMPLATE_REQUEST,
  TEMPLATE_APPROVE,
  TEMPLATE_REJECT,
  TEMPLATE_DELETE,
  COMPANY_KYC_REQUEST,
  COMPANY_KYC_REJECT,
  COMPANY_KYC_APPROVE,
  COMPANY_SUSPEND,
  COMPANY_SUSPEND_BO_SA,
  BACKGROUND_TASK,
  BALANCE_ALERT,
  BULK_DONE ,
  BULK_FINISHED,
  WEBHOOK,
  VNA_SUMMARY_CHECK_IN_REPORT,
  CONVERSATION_MESSAGE,
  CONVERSATION_LIVE_AGENT,
  TICKET_ASSIGN
}

export interface ReceiverPermission {
  permission: number;
  aclType: AclActionType;
  userId?: number; // In case of owner, we will send to userId, no need to query from AclGroupAction
  companyId?: number; // In case of PARTIAL, MASTER, we will base on companyId, BO
}

export enum NotificationChannel {
  WEB = 'WEB',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export interface NotificationMessage {
  message: MessageEvent;
  priority: NotificationPriority;
  excludeUser?: Array<number>;
  params?: any;
  receiver: Array<ReceiverPermission>;
  channels?: Array<NotificationChannel>;
}
