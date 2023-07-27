/**
 * Define QUEUE by partner and service, for guarantee the limit rate
 */
export enum BULK_BROADCAST_QUEUE {
  RCS_GOOGLE = "BROADCAST_RCS_GOOGLE",
  VIBER_GMS = "BROADCAST_VIBER_GMS",
  VIBER_VIETGUY = "BROADCAST_VIBER_VIETGUY",
  VIBER = "BROADCAST_VIBER",
  WHATSAPP_FACEBOOK = "BROADCAST_WHATSAPP_FACEBOOK",
  WHATSAPP_SINCH = "BROADCAST_WHATSAPP_SINCH",
  WHATSAPP_INFOBIP = "BROADCAST_WHATSAPP_INFOBIP",
  ZALO = "BROADCAST_ZALO",
  SMS = "BROADCAST_SMS",
  PEACOM = "BROADCAST_PEACOM",
  FALLBACK = "BROADCAST_FALL_BACK"
}
