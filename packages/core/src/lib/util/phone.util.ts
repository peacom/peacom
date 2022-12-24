import {PhoneNumberUtil} from "google-libphonenumber";
import {hasText} from "@peacom/core";

const phoneUtil = PhoneNumberUtil.getInstance();

export const DEFAULT_PHONE_COUNTRY = "VN";

export const PHONE_COUNTRY_SUPPORT = {
  84: {
    code: "VN"
  }
};

export function isPhoneValid(phone: string, country = DEFAULT_PHONE_COUNTRY) {
  if (!phone || !hasText(phone)) {
    throw new Error(`Invalid phone ${phone}`);
  }
  let _phone = phone;
  const phone2Prefix = phone.substring(0, 2);
  if (phone2Prefix !== "00") {
    const phone1Prefix = phone[0];
    if (phone1Prefix !== "0") {
      _phone = `+${phone}`;
    }
  }
  const number = phoneUtil.parse(_phone, country);
  const existPhone = phoneUtil.isValidNumber(number);
  if (!existPhone) {
    throw new Error(`Invalid phone ${phone}`);
  }

  return {
    countryCode: number.getCountryCode(),
    nationalNumber: `0${number.getNationalNumber()}`,
    e164: `${number.getCountryCode()}${number.getNationalNumber()}`,
    network: number.preferredDomesticCarrierCodeCount()
  };
}
