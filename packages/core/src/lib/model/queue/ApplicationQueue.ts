import { Application } from '@peacom/model';

export const getApplicationQueueName = (applicationId: Application) => {
  switch (applicationId) {
    case Application.RCS:
      return 'RCS';
    case Application.SMS:
      return 'SMS';
    case Application.VIBER:
      return 'VIBER';
    case Application.VIBER_BOT:
      return 'VIBER_BOT';
    case Application.VIBER_BUSINESS:
      return 'VIBER_BUSINESS';
    case Application.APPLE:
      return 'APPLE';
    case Application.TELEGRAM:
      return 'TELEGRAM';
    case Application.FACEBOOK:
      return 'FACEBOOK';
    case Application.GOOGLE_BUSINESS:
      return 'GOOGLE_BUSINESS_MESSAGE';
    case Application.ZALO:
      return 'ZALO_OFFICIAL_ACCOUNT';
    case Application.ZALO_ZNS:
      return 'Zalo_ZNS';
    case Application.WHATSAPP:
      return 'WHATSAPP';
    case Application.LIVE_CHAT:
      return 'LIVE_CHAT';
    case Application.MMS:
      return 'MMS';
    case Application.TELEGRAM_GATEWAY:
      return 'TELEGRAM_GATEWAY';
    case Application.INSTAGRAM:
      return 'INSTAGRAM';
    case Application.WECOM_CUSTOMER:
      return 'WECOM_CUSTOMER';
    case Application.WECOM_CUSTOMER_GROUP:
      return 'WECOM_CUSTOMER_GROUP'
    case Application.WECOM_INTERNAL:
      return 'WECOM_INTERNAL'
    case Application.WECHAT:
      return 'WECHAT';
    case Application.WECOM_COMPANY:
      return 'WECOM_COMPANY'
    case Application.LINE:
      return 'LINE'
    default:
      return '';
  }
};
