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
