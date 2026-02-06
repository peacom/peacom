import { Application, applicationStr, PARTNER } from '@peacom/model';

/**
 * Define QUEUE by partner and service, for guarantee the limit rate
 */
export enum CONVERSATION_QUEUE {
  TELEGRAM_IN = 'TELEGRAM_IN',
  TELEGRAM_OUT = 'TELEGRAM_OUT',
  VIBER_IN = 'VIBER_IN', // VIBER ==> viber-bot
  VIBER_OUT = 'VIBER_OUT', // viber-bot
  RCS_IN = 'RCS_IN',
  RCS_OUT = 'RCS_OUT',
  RCS_DOTGO_IN = 'RCS_DOTGO_IN',
  RCS_DOTGO_OUT = 'RCS_DOTGO_OUT',
  RCS_TANLA_IN = 'RCS_TANLA_IN',
  RCS_TANLA_OUT = 'RCS_TANLA_OUT',
  RCS_IOH_IN = 'RCS_IOH_IN',
  RCS_IOH_OUT = 'RCS_IOH_OUT',
  APPLE_IN = 'APPLE_IN',
  APPLE_OUT = 'APPLE_OUT',
  FACEBOOK_IN = 'FACEBOOK_IN',
  FACEBOOK_OUT = 'FACEBOOK_OUT',
  ZALO_OA_IN = 'ZALO_OA_IN',
  ZALO_OA_OUT = 'ZALO_OA_OUT',
  WHATSAPP_IN = 'WHATSAPP_IN',
  WHATSAPP_OUT = 'WHATSAPP_OUT',
  PEACOM_IN = 'MMP_IN',
  PEACOM_OUT = 'MMP_OUT',
  LIVE_CHAT_IN = 'LIVE_CHAT_IN',
  LIVE_CHAT_OUT = 'LIVE_CHAT_OUT',
  INSTAGRAM_IN = 'INSTAGRAM_IN',
  INSTAGRAM_OUT = 'INSTAGRAM_OUT',
  WECOM_CUSTOMER = 'WECOM_CUSTOMER',
  WECOM_CUSTOMER_GROUP = 'WECOM_CUSTOMER_GROUP',
  WECOM_INTERNAL_IN = 'WECOM_INTERNAL_IN',
  WECOM_INTERNAL_OUT = 'WECOM_INTERNAL_OUT',
  VIBER_BUSINESS_IN = 'VIBER_BUSINESS_IN',
  VIBER_BUSINESS_OUT = 'VIBER_BUSINESS_OUT',
  WECHAT_IN = 'WECHAT_IN',
  WECHAT_OUT = 'WECHAT_OUT',
  LINE_IN = 'LINE_IN',
  LINE_OUT = 'LINE_OUT',
}

export const getApplicationConversationQueueOutName = (
  applicationId: Application,
  partnerId: PARTNER | null = null
) => {
  if (partnerId === PARTNER.PEACOM) {
    return CONVERSATION_QUEUE.PEACOM_OUT;
  }
  switch (applicationId) {
    case Application.APPLE:
      return CONVERSATION_QUEUE.APPLE_OUT;
    case Application.RCS:
      if (PARTNER.DOTGO === Number(partnerId)) {
        return CONVERSATION_QUEUE.RCS_DOTGO_OUT;
      }
      if (PARTNER.TANLA === Number(partnerId)) {
        return CONVERSATION_QUEUE.RCS_TANLA_OUT;
      }
      if (PARTNER.IOH === Number(partnerId)) {
        return CONVERSATION_QUEUE.RCS_IOH_OUT;
      }
      return CONVERSATION_QUEUE.RCS_OUT;
    case Application.WHATSAPP:
      return CONVERSATION_QUEUE.WHATSAPP_OUT;
    case Application.VIBER:
      return CONVERSATION_QUEUE.VIBER_BUSINESS_OUT;
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
    case Application.WECOM_INTERNAL:
      return CONVERSATION_QUEUE.WECOM_INTERNAL_OUT;
    case Application.WECHAT:
      return CONVERSATION_QUEUE.WECHAT_OUT;
    case Application.LINE:
      return CONVERSATION_QUEUE.LINE_OUT;
    default:
      throw new Error(
        `Not support conversation for application ${applicationStr(
          applicationId
        )}`
      );
  }
};
