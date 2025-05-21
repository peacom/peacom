import {Application, applicationStr, PARTNER} from '@peacom/model';

/**
 * Define QUEUE by partner and service, for guarantee the limit rate
 */
export enum CONVERSATION_QUEUE {
  TELEGRAM_IN = 'TELEGRAM_IN',
  TELEGRAM_OUT = 'TELEGRAM_OUT',
  VIBER_IN = 'VIBER_IN',
  VIBER_OUT = 'VIBER_OUT',
  RCS_IN = 'RCS_IN',
  RCS_OUT = 'RCS_OUT',
  RCS_DOTGO_IN = 'RCS_DOTGO_IN',
  RCS_DOTGO_OUT = 'RCS_DOTGO_OUT',
  APPLE_IN = 'APPLE_IN',
  APPLE_OUT = 'APPLE_OUT',
  FACEBOOK_IN = 'FACEBOOK_IN',
  FACEBOOK_OUT = 'FACEBOOK_OUT',
  ZALO_OA_IN = 'ZALO_OA_IN',
  ZALO_OA_OUT = 'ZALO_OA_OUT',
  WHATSAPP_IN = 'WHATSAPP_IN',
  WHATSAPP_OUT = 'WHATSAPP_OUT',
  MMP_IN = 'MMP_IN',
  MMP_OUT = 'MMP_OUT',
  LIVE_CHAT_IN = 'LIVE_CHAT_IN',
  LIVE_CHAT_OUT = 'LIVE_CHAT_OUT',
  INSTAGRAM_IN = 'INSTAGRAM_IN',
  INSTAGRAM_OUT = 'INSTAGRAM_OUT',
  WECOM_CUSTOMER = 'WECOM_CUSTOMER',
  WECOM_CUSTOMER_GROUP = 'WECOM_CUSTOMER_GROUP',
}

export const getApplicationConversationQueueOutName = (
  applicationId: Application,
  partnerId: PARTNER | null = null
) => {
  if (partnerId === PARTNER.MMP) {
    return CONVERSATION_QUEUE.MMP_OUT;
  }
  switch (applicationId) {
    case Application.APPLE:
      return CONVERSATION_QUEUE.APPLE_OUT;
    case Application.RCS:
      if (PARTNER.DOTGO === Number(partnerId)) {
        return CONVERSATION_QUEUE.RCS_DOTGO_OUT;
      }
      return CONVERSATION_QUEUE.RCS_OUT;
    case Application.WHATSAPP:
      return CONVERSATION_QUEUE.WHATSAPP_OUT;
    case Application.VIBER_BOT:
      return CONVERSATION_QUEUE.VIBER_OUT;
    case Application.FACEBOOK:
      return CONVERSATION_QUEUE.FACEBOOK_OUT;
    case Application.TELEGRAM:
      return CONVERSATION_QUEUE.TELEGRAM_OUT;
    case Application.ZALO:
      return CONVERSATION_QUEUE.ZALO_OA_OUT;
    case Application.LIVE_CHAT:
      return CONVERSATION_QUEUE.LIVE_CHAT_OUT;
    case Application.INSTAGRAM:
      return CONVERSATION_QUEUE.INSTAGRAM_OUT;
    case Application.WECOM_CUSTOMER_GROUP:
      return CONVERSATION_QUEUE.WECOM_CUSTOMER_GROUP;
    case Application.WECOM_CUSTOMER:
      return CONVERSATION_QUEUE.WECOM_CUSTOMER;
    default:
      throw new Error(
        `Not support conversation for application ${applicationStr(
          applicationId
        )}`
      );
  }
};
