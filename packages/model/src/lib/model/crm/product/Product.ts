/**
 * https://faisalkhan.com/learn/payments-wiki/what-is-a-top-up/
 *  - What is topup
 *  - Bill ==> POSTPAID
 */
export enum PRODUCT_TYPE {
  PHYSICAL = 0,
  ESIM = 1,
  MOBILE_E_SIM_TOPUP = 2,
  ESIM_PACKAGE = 3,
  SIM = 4,
  COUPON = 5,
  INSURANCE = 6,
  DIGITAL = 7,
  INSURANCE_ESIM = 8,
}

export enum PRODUCT_PARTNER {
  AIRALO = 1,
  ESIM_ACCESS = 2,
  JOYTEL = 3,
  OSP = 4,
  PVI = 5,
}

export enum SERIAL_STATUS {
  PENDING = 0,
  REDEEMED = 1,
  REDEEMED_FAIL = 2,
  CANCEL = 3,
  PROCESSING = 4
}
