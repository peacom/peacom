import {Application, PARTNER} from "@peacom/model";

export const BULK_BROADCAST_JOB_QUEUE = 'BULK_BROADCAST_JOB_QUEUE'

export const BULK_QUEUE = {
  BROADCAST_DISTRIBUTE: 'BULK_BROADCAST_DISTRIBUTE',
  BROADCAST_MESSAGE: 'BULK_BROADCAST_MESSAGE',
  FALLBACK_DISTRIBUTE: 'BULK_FALLBACK_DISTRIBUTE',
  FALLBACK_MESSAGE: 'BULK_FALLBACK_MESSAGE'
}

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
  ZALO_IRIS = "BROADCAST_ZALO_IRIS",
  SMS = "BROADCAST_SMS",
  SMS_GMS = "BROADCAST_SMS_GMS",
  SMS_TSEL = "BROADCAST_SMS_TSEL",
  MMS_TSEL = "BROADCAST_MMS_TSEL",
  SMS_IRIS = "BROADCAST_SMS_IRIS",
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
      switch (partnerId) {
        case PARTNER.ZALO:
          return BULK_BROADCAST_QUEUE.ZALO
        case PARTNER.IRIS :
          return BULK_BROADCAST_QUEUE.ZALO_IRIS
      }
      throw new Error(`Not support for Application (${applicationId}) - Partner (${partnerId})`)
    case Application.SMS: {
      switch (partnerId) {
        case PARTNER.GMS:
          return BULK_BROADCAST_QUEUE.SMS_GMS;
        case PARTNER.TSEL:
          return BULK_BROADCAST_QUEUE.SMS_TSEL;
        case PARTNER.IRIS:
          return BULK_BROADCAST_QUEUE.SMS_IRIS;
        default:
          return BULK_BROADCAST_QUEUE.SMS
      }
    }
    case Application.MMS: {
      switch (partnerId) {
        case PARTNER.TSEL:
          return BULK_BROADCAST_QUEUE.MMS_TSEL;
        default:
          return BULK_BROADCAST_QUEUE.MMS_TSEL;
      }
    }
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
