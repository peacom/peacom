import {AclActionType} from './acl';

export enum NotificationPriority {
  HIGH = 1,
  NORMAL = 2,
}

export enum MessageEvent {
  CHANNEL_OA_STATUS = 'channel.oa.status',
  CHANNEL_INFO = 'channel.info',
  CHANNEL_REQUEST = 'channel.request',
  CHANNEL_RCS_CARRIER_STATUS = 'channel.rcs.carrier.status',
  TEMPLATE_REQUEST = 'template.request',
  TEMPLATE_APPROVE = 'template.approve',
  TEMPLATE_REJECT = 'template.reject',
  TEMPLATE_DELETE = 'template.delete',
  TEMPLATE_UPDATE = 'template.update',
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
  TICKET_ASSIGN = 'ticket.assign',
  TICKET_NO_AGENT = 'ticket.no_agent',
  TICKET_TRANSFER = 'ticket.transfer',
  USER_INVITE = 'user.invite',
  ORDER_CREATE = 'order.create',
  ORDER_SIM_INFO = 'order.sim_info',
  ORDER_STATUS = 'order.status',
  MONITOR_ALERT = 'monitor.alert',
  EMAIL_REGISTER = 'email.register',
  RESET_PASSWORD = 'reset.password',
  RESEND_EMAIL = 'resend.email',
  CREATE_USER = 'create.user',
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
  BULK_DONE,
  BULK_FINISHED,
  WEBHOOK,
  VNA_SUMMARY_CHECK_IN_REPORT,
  CONVERSATION_MESSAGE,
  CONVERSATION_LIVE_AGENT,
  TICKET_ASSIGN,
  USER_INVITE,
  ORDER_CREATE,
  ORDER_STATUS,
  MONITOR_ALERT,
  CHANNEL_INFO,
  TICKET_NO_AGENT,
  TICKET_TRANSFER,
  TEMPLATE_UPDATE,
  CHANNEL_RCS_CARRIER_STATUS,
  EMAIL_REGISTER,
  RESET_PASSWORD,
  RESEND_EMAIL,
  CREATE_USER,
  ORDER_SIM_INFO,
}

export const mappingNotificationMessageToType = (messageEvent: MessageEvent): NotificationType => {
  switch (messageEvent) {
    case MessageEvent.CREATE_USER:
      return NotificationType.CREATE_USER;
    case MessageEvent.RESEND_EMAIL:
      return NotificationType.RESEND_EMAIL;
    case MessageEvent.RESET_PASSWORD:
      return NotificationType.RESET_PASSWORD;
    case MessageEvent.EMAIL_REGISTER:
      return NotificationType.EMAIL_REGISTER;
    case MessageEvent.MONITOR_ALERT:
      return NotificationType.MONITOR_ALERT;
    case MessageEvent.ORDER_CREATE:
      return NotificationType.ORDER_CREATE;
    case MessageEvent.ORDER_STATUS:
      return NotificationType.ORDER_STATUS;
    case MessageEvent.ORDER_SIM_INFO:
      return NotificationType.ORDER_SIM_INFO;
    case MessageEvent.USER_INVITE:
      return NotificationType.USER_INVITE;
    case MessageEvent.BACKGROUND_TASK:
      return NotificationType.BACKGROUND_TASK;
    case MessageEvent.BALANCE_ALERT:
      return NotificationType.BALANCE_ALERT;
    case MessageEvent.CONVERSATION_MESSAGE:
      return NotificationType.CONVERSATION_MESSAGE;
    case MessageEvent.CONVERSATION_LIVE_AGENT:
      return NotificationType.CONVERSATION_LIVE_AGENT;
    case MessageEvent.BULK_DONE:
      return NotificationType.BULK_DONE;
    case MessageEvent.BULK_FINISHED:
      return NotificationType.BULK_FINISHED;
    case MessageEvent.CHANNEL_REQUEST:
      return NotificationType.CHANNEL_REQUEST;
    case MessageEvent.CHANNEL_OA_STATUS:
      return NotificationType.CHANNEL_OA_STATUS;
    case MessageEvent.TEMPLATE_APPROVE:
      return NotificationType.TEMPLATE_APPROVE;
    case MessageEvent.TEMPLATE_DELETE:
      return NotificationType.TEMPLATE_DELETE;
    case MessageEvent.TEMPLATE_REJECT:
      return NotificationType.TEMPLATE_REJECT;
    case MessageEvent.TEMPLATE_REQUEST:
      return NotificationType.TEMPLATE_REQUEST;
    case MessageEvent.WEBHOOK:
      return NotificationType.WEBHOOK;
    case MessageEvent.VNA_SUMMARY_CHECK_IN_REPORT:
      return NotificationType.VNA_SUMMARY_CHECK_IN_REPORT;
    case MessageEvent.TICKET_ASSIGN:
      return NotificationType.TICKET_ASSIGN;
    case MessageEvent.COMPANY_KYC_REQUEST:
      return NotificationType.COMPANY_KYC_REQUEST;
    case MessageEvent.COMPANY_SUSPEND:
      return NotificationType.COMPANY_SUSPEND;
    case MessageEvent.COMPANY_KYC_APPROVE:
      return NotificationType.COMPANY_KYC_APPROVE;
    case MessageEvent.COMPANY_KYC_REJECT:
      return NotificationType.COMPANY_KYC_REJECT;
    case MessageEvent.COMPANY_SUSPEND_BO_SA:
      return NotificationType.COMPANY_SUSPEND_BO_SA;
    case MessageEvent.CHANNEL_INFO:
      return NotificationType.CHANNEL_INFO;
    case MessageEvent.TICKET_NO_AGENT:
      return NotificationType.TICKET_NO_AGENT;
    case MessageEvent.TICKET_TRANSFER:
      return NotificationType.TICKET_TRANSFER;
    case MessageEvent.TEMPLATE_UPDATE:
      return NotificationType.TEMPLATE_UPDATE;
    case MessageEvent.CHANNEL_RCS_CARRIER_STATUS:
      return NotificationType.CHANNEL_RCS_CARRIER_STATUS;
  }
}

export interface ReceiverPermission {
  permission: number;
  aclType: AclActionType;
  isInclude?: boolean
  userId?: number; // In case of owner, we will send to userId, no need to query from AclGroupAction
  companyId?: number; // In case of PARTIAL, MASTER, we will base on companyId, BO
}

export enum NotificationChannel {
  WEB = 'WEB',
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export enum NotificationConversationStatus {
  PENDING,
  SUCCESS,
  FAIL
}

export interface Receiver {
  fullName: string
  email: string
  phone: string
}

export interface NotificationMessage {
  message: MessageEvent;
  type?: NotificationType
  priority: NotificationPriority;
  excludeUser?: Array<number>;
  includeReceiver?: Array<Receiver>;
  companyId: number // Notification belong to which company
  params?: any;
  receiver: Array<ReceiverPermission>;
  channels?: Array<NotificationChannel>;
}
