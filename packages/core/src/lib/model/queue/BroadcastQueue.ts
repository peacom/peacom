/**
 * Define QUEUE by partner and service, for guarantee the limit rate
 */
export enum BULK_BROADCAST_QUEUE {
  RCS_GOOGLE = "BROADCAST_RCS_GOOGLE",
  VIBER_GMS = "BROADCAST_VIBER_GMS",
  VIBER_VIETGUY = "VIBER_VIETGUY",
  VIBER = "BROADCAST_VIBER",
  WHATSAPP_FACEBOOK = "BROADCAST_WHATSAPP_FACEBOOK",
  WHATSAPP_SINCH = "BROADCAST_WHATSAPP_SINCH",
  ZALO = "BROADCAST_ZALO",
  SMS = "BROADCAST_SMS",
  PEACOM = "BROADCAST_PEACOM"
}
