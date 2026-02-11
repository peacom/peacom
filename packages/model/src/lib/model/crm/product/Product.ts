/**
 * https://faisalkhan.com/learn/payments-wiki/what-is-a-top-up/
 *  - What is topup
 *  - Bill ==> POSTPAID
 */
export enum PRODUCT_TYPE {
  PHYSICAL = 1,
  ESIM = 2,
  MOBILE_E_SIM_TOPUP = 3,
  ESIM_PACKAGE = 4,
  SIM = 5,
  COUPON = 6,
  INSURANCE = 7,
  DIGITAL = 8
}

export enum PRODUCT_PARTNER {
  AIRALO = 1,
  ESIM_ACCESS = 2,
  JOYTEL = 3,
  OSP = 4
}

export enum SERIAL_STATUS {
  PENDING = 0,
  REDEEMED = 1,
  REDEEMED_FAIL = 2,
  CANCEL = 3
}
