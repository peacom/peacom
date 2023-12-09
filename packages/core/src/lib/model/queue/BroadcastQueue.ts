import {Application, PARTNER} from "../Application";

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

export const getApplicationBroadcastQueueName = (applicationId: Application, partnerId: PARTNER | null = null) => {
  if (partnerId === PARTNER.PEACOM) {
    return BULK_BROADCAST_QUEUE.PEACOM
  }
  switch (applicationId) {
    case Application.RCS:
      return BULK_BROADCAST_QUEUE.RCS_GOOGLE
    case Application.VIBER: {
      switch (partnerId) {
        case PARTNER.GMS:
          return BULK_BROADCAST_QUEUE.VIBER_GMS;
        case PARTNER.VIBER:
          return BULK_BROADCAST_QUEUE.VIBER;
        case PARTNER.VIET_GUY:
          return BULK_BROADCAST_QUEUE.VIBER_VIETGUY;
      }
      throw new Error(`Not support for Application (${applicationId}) - Partner (${partnerId})`)
    }
    case Application.ZALO_ZNS:
      return BULK_BROADCAST_QUEUE.ZALO
    case Application.SMS:
      return BULK_BROADCAST_QUEUE.SMS
    case Application.WHATSAPP: {
      switch (partnerId) {
        case PARTNER.INFO_BIP:
          return BULK_BROADCAST_QUEUE.WHATSAPP_INFOBIP;
        case PARTNER.SINCH:
          return BULK_BROADCAST_QUEUE.WHATSAPP_SINCH;
        default:
          return BULK_BROADCAST_QUEUE.WHATSAPP_FACEBOOK;
      }
    }

    default:
      throw new Error(`Not support for Application (${applicationId}) - Partner (${partnerId})`)
  }
}
