import { Application } from './Application';

/**
 * This is store on DB with tinyint (1byte), so the value must below 255
 * 01000010 => 66
 * 01000011 => 67
 */
export enum BILLING_STATUS {
  NONE = 0,
  PENDING = 1,
  BILLED = 2,
  CANCEL = 3,
  BILLED_CONFIRM = 66, /* Confirm escrow for success */
  CANCEL_CONFIRM = 67, /* Confirm escrow for cancel */
  FAIL_CONFIRM = 68 /* In case can not confirm the message (can not confirm cancel or confirm bill), we mark it fail or manual update again */
}

export enum COMPANY_BILLING_TYPE {
  POSTPAID = 1,
  PREPAID = 2
}

export enum TARIFF_TYPE {
  PER_BROADCAST_MESSAGE = 1,
  PER_CONVERSATION_MESSAGE,
  PER_CONVERSATION,
  PER_CONVERSATION_BROADCAST_INITIAL,
  PER_BROADCAST_MARKETING,
  PER_BROADCAST_UTILITY,
  PER_BROADCAST_AUTHENTICATION,
  PER_BROADCAST_BASIC_MESSAGE,
  PER_BROADCAST_CALL_CONSENT,
  PER_TRANSACTIONAL_MESSAGE,
  PER_TRANSACTION_BASIC_MESSAGE
}

export const tariffTypeStr = (tariffType: TARIFF_TYPE) => {
  switch (tariffType){
    case TARIFF_TYPE.PER_BROADCAST_MESSAGE:
      return 'BROADCAST MESSAGE'
    case TARIFF_TYPE.PER_BROADCAST_BASIC_MESSAGE:
      return 'BROADCAST BASIC MESSAGE'
    case TARIFF_TYPE.PER_BROADCAST_MARKETING:
      return 'BROADCAST MARKETING MESSAGE'
    case TARIFF_TYPE.PER_BROADCAST_UTILITY:
      return 'BROADCAST UTILITY MESSAGE'
    case TARIFF_TYPE.PER_BROADCAST_AUTHENTICATION:
      return 'BROADCAST AUTHENTICATION MESSAGE';
    case TARIFF_TYPE.PER_CONVERSATION_MESSAGE:
      return 'CONVERSATION MESSAGE'
    case TARIFF_TYPE.PER_CONVERSATION:
      return 'CONVERSATION'
    case TARIFF_TYPE.PER_CONVERSATION_BROADCAST_INITIAL:
      return 'CONVERSATION INITIAL BY BROADCAST'
    case TARIFF_TYPE.PER_BROADCAST_CALL_CONSENT:
      return 'BROADCAST CALL CONSENT'
    case TARIFF_TYPE.PER_TRANSACTIONAL_MESSAGE:
      return 'TRANSACTIONAL MESSAGE'
    case TARIFF_TYPE.PER_TRANSACTION_BASIC_MESSAGE:
      return 'TRANSACTIONAL BASIC MESSAGE'
    default:
      return `UNKNOWN ${tariffType}`
  }
}

export enum  CHANNEL_TARIFF_TYPE {
  PROVIDER = 1,
  SELLING
}

export const ChannelTariffTypeStr = (channelTariffType: CHANNEL_TARIFF_TYPE) =>{
  switch (channelTariffType) {
    case CHANNEL_TARIFF_TYPE.PROVIDER:
      return "PROVIDER"
    case CHANNEL_TARIFF_TYPE.SELLING:
      return "SELLING"
    default:
      return `UNKNOWN ${channelTariffType}`
  }
}

export enum SETTING_TIME_TARIFF {
  HOUR = 1,
  DAY = 2,
  MONTH = 3
}

export enum COMPANY_TRANSACTION_TYPE {
  CASH_IN = 1,
  CASH_OUT = 2
}

export const companyTransactionTypeStr = (type: COMPANY_TRANSACTION_TYPE) => {
  switch (type){
    case COMPANY_TRANSACTION_TYPE.CASH_IN:
      return 'Cash In'
    case COMPANY_TRANSACTION_TYPE.CASH_OUT:
      return 'Cash Out'
    default:
      return `UNKNOWN ${type}`
  }
}

export enum COMPANY_TRANSACTION_PURPOSE {
  BILLING = 1,
  TOPUP = 2,
  ESCROW_BULK_BROADCAST = 3,
  ESCROW_CONVERSATION = 4,
  ESCROW_API_BROADCAST = 5,
  ESCROW_API_CONVERSATION = 6,
  ESCROW_CONFIRM = 7,
  FALLBACK = 8,
  ORDER = 9,
  ESCROW_CONVERSATION_MESSAGE,
  CALL_CONSENT,
  TOP_UP_VOUCHER = 12,
  ESCROW_GENERATE_VIDEO,
  TRIAL_ONBOARD,
}

export const companyTransactionPurposeStr = (purpose: COMPANY_TRANSACTION_PURPOSE) => {
  switch (purpose) {
    case COMPANY_TRANSACTION_PURPOSE.BILLING:
      return 'Billing';
    case COMPANY_TRANSACTION_PURPOSE.TOPUP:
      return 'Top Up';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_BULK_BROADCAST:
      return 'Escrow Bulk Broadcast';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_CONVERSATION:
      return 'Escrow Conversation';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_CONVERSATION_MESSAGE:
      return 'Escrow Conversation Message';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_API_BROADCAST:
      return 'Escrow API Broadcast';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_API_CONVERSATION:
      return 'Escrow API Conversation';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_CONFIRM:
      return 'Escrow Confirm';
    case COMPANY_TRANSACTION_PURPOSE.FALLBACK:
      return 'Fallback';
    case COMPANY_TRANSACTION_PURPOSE.ORDER:
      return 'Order';
    case COMPANY_TRANSACTION_PURPOSE.TOP_UP_VOUCHER:
      return 'Top Up Voucher';
    case COMPANY_TRANSACTION_PURPOSE.ESCROW_GENERATE_VIDEO:
      return 'Escrow Generate Video'
    default:
      return `UNKNOWN ${purpose}`;
  }
}


export enum TRANSACTION_ESCROW_TYPE {
  ACCEPT = 1,
  RETURN = 2
}

export const isChannelSupportTemplateTariff = (applicationId: number) => {
  return [Application.WHATSAPP, Application.RCS].includes(applicationId);
};

export enum BILLING_CDR_TYPE {
  BROADCAST = 1,
  CONVERSATION = 2,
  MONTHLY = 3
}
