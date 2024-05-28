import {AclActionType} from "./acl";

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
  COMPANY_KYC_REQUEST = 'company.kyc.request',
  COMPANY_KYC_REJECT = 'company.kyc.reject',
  COMPANY_KYC_APPROVE = 'company.kyc.approve',
  COMPANY_SUSPEND = 'company.suspend',
  COMPANY_SUSPEND_BO_SA = 'company.suspend.BO_SA',
  BACKGROUND_TASK = 'background.task'
}

export interface ReceiverPermission {
  permission: number,
  aclType: AclActionType
}

export interface NotificationMessage {
  message: MessageEvent,
  priority: NotificationPriority,
  excludeUser?: Array<number>,
  params?: any,
  receiver: Array<ReceiverPermission>
}
