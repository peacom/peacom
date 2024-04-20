export enum NotificationPriority {
  HIGH = 1,
  NORMAL = 2,
}

export enum MessageEvent {
  CHANNEL_OA_STATUS = 'channel.oa.status',
  CHANNEL_REQUEST = 'channel.request',
  TEMPLATE_REQUEST = 'template.request',
  COMPANY_KYC_REQUEST = 'company.kyc.request',
  COMPANY_KYC_REJECT = 'company.kyc.reject',
  COMPANY_KYC_APPROVE = 'company.kyc.approve',
}
