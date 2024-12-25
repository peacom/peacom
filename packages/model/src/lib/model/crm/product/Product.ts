/**
 * https://faisalkhan.com/learn/payments-wiki/what-is-a-top-up/
 *  - What is topup
 *  - Bill ==> POSTPAID
 */
export enum PRODUCT_TYPE {
  PHYSICAL, DIGITAL, MOBILE_E_SIM_TOPUP
}

export enum PRODUCT_PARTNER {
  AIRALO = 1,
  ESIM_ACCESS = 2
}

export enum SERIAL_STATUS {
  PENDING = 0,
  REDEEMED = 1,
  REDEEMED_FAIL = 2,
  CANCEL = 3
}
