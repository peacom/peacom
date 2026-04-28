
export enum CURRENCY {
  VND = 1,
  LAK = 2,
  USD = 3,
  IDR = 4,
  EUR = 5,
  SGD = 6,
  HKD = 7,
  INR = 8,
  MYR = 9,
  KHR = 10,
  TKN = 11,
  CRD = 12,
}

export const DEFAULT_CURRENCY_ID = CURRENCY.VND
export const DEFAULT_COUNTRY_CODE = "VN"

export const currencyStr = (id: CURRENCY | null | undefined) => {
  switch (id) {
    case CURRENCY.VND:
      return "VND";
    case CURRENCY.LAK:
      return "LAK";
    case CURRENCY.USD:
      return "USD";
    case CURRENCY.IDR:
      return "IDR";
    case CURRENCY.EUR:
      return "EUR";
    case CURRENCY.SGD:
      return "SGD";
    case CURRENCY.HKD:
      return "HKD";
    case CURRENCY.INR:
      return "INR";
    case CURRENCY.MYR:
      return "MYR"
    case CURRENCY.KHR:
      return "KHR"
    case CURRENCY.TKN:
      return "TKN"
    case CURRENCY.CRD:
      return "CRD"
    default:
      return "VND";
  }
};
