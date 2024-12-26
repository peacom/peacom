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
  CANCEL_CONFIRM = 67 /* Confirm escrow for cancel */
}

export enum COMPANY_BILLING_TYPE {
  POSTPAID = 1,
  PREPAID = 2
}

export enum TARIFF_TYPE {
  PER_BROADCAST_MESSAGE = 1,
  PER_CONVERSATION_MESSAGE,
  PER_CONVERSATION,
  PER_CONVERSATION_BROADCAST_INITIAL
}


export enum SETTING_TIME_TARIFF {
  HOUR = 1,
  DAY = 2,
  MONTH = 3
}
