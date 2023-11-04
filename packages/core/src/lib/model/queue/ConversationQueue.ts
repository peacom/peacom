import {Application, applicationStr} from "../Application";

/**
 * Define QUEUE by partner and service, for guarantee the limit rate
 */
export enum CONVERSATION_QUEUE {
  TELEGRAM_IN = "TELEGRAM_IN",
  TELEGRAM_OUT = "TELEGRAM_OUT",
  VIBER_IN = "VIBER_IN",
  VIBER_OUT = "VIBER_OUT",
  RCS_IN = "RCS_IN",
  RCS_OUT = "RCS_OUT",
  APPLE_IN = "APPLE_IN",
  APPLE_OUT = "APPLE_OUT",
  FACEBOOK_IN = "FACEBOOK_IN",
  FACEBOOK_OUT = "FACEBOOK_OUT",
  ZALO_OA_IN = "ZALO_OA_IN",
  ZALO_OA_OUT = "ZALO_OA_OUT",
  WHATSAPP_IN = "WHATSAPP_IN",
  WHATSAPP_OUT = "WHATSAPP_OUT",
  GOOGLE_BUSINESS_IN = "GOOGLE_BUSINESS_IN",
  GOOGLE_BUSINESS_OUT = "GOOGLE_BUSINESS_OUT"
}

export const getApplicationQueueOutName = (applicationId: Application) => {
  switch (applicationId) {
    case Application.APPLE:
      return CONVERSATION_QUEUE.APPLE_OUT
    case Application.RCS:
      return CONVERSATION_QUEUE.RCS_OUT
    case Application.WHATSAPP:
      return CONVERSATION_QUEUE.WHATSAPP_OUT
    case Application.VIBER_BOT:
      return CONVERSATION_QUEUE.VIBER_OUT
    case Application.FACEBOOK:
      return CONVERSATION_QUEUE.FACEBOOK_OUT;
    case Application.GOOGLE_BUSINESS:
      return CONVERSATION_QUEUE.GOOGLE_BUSINESS_OUT;
    case Application.TELEGRAM:
      return CONVERSATION_QUEUE.TELEGRAM_OUT;
    case Application.ZALO:
      return CONVERSATION_QUEUE.ZALO_OA_OUT
    default:
      throw new Error(`Not support conversation for application ${applicationStr(applicationId)}`)
  }
}
