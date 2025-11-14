export enum ChannelStatus {
  REQUEST = 1,
  PROCESSING,
  LAUNCH,
  SUSPEND,
  REJECT,
  ACCEPT = 6,
}

/**
 * Support for mapping to Official Account and Bot
 * In future we will use only Channel
 */
export enum ChannelType {
  OA = 1,
  BOT
}

export enum ChannelSummaryType {
  HOUR = 1,
  MINUTE_15
}

export enum ChannelRCSLaunchStatus {
  REQUEST = 1,
  APPROVE = 2,
  REJECT = 3 ,
  CLIENT_REQUEST
}
