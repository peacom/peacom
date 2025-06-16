
export enum COUPON_USAGE_TYPE {
  SINGLE = 1,
  MULTIPLE
}

export enum COUPON_EXPIRE_TYPE {
  DATE = 1,
  TIME = 2
}

export enum COUPON_DISCOUNT_TYPE {
  AMOUNT = 1,
  PERCENT = 2
}

export enum COUPON_ORIGIN {
  WEB = 1,
  FILE = 2
}

export enum COUPON_STATUS {
  ACCEPT = 1,
  READY = 2,
  DISABLED = 3,
}

export enum COUPON_CODE_ORIGIN {
  BULK = 1, CONVERSATION, OTHER
}

export enum COUPON_CODE_STATUS {
  AVAILABLE = 1,
  DISTRIBUTED,
  VIEWED,
  CLAIMED
}

export enum COUPON_CODE_ACTION {
  DISTRIBUTE = 1,
  VIEW,
  CLAIM
}

export enum COUPON_ITEM_TYPE {
  TEXT = 1,
  QRCODE,
  BARCODE
}

export enum COUPON_CHARACTER_LIST {
  AUTO = 1,
  FIX
}
