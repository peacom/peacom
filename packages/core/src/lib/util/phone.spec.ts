import {isPhoneValid} from "./phone.util";

describe('phone.util', () => {
  it('isValidPhone', () => {
    const phoneStr = '0938130683'
    const phone1 = '212649080802'
    console.log(isPhoneValid(phoneStr))
    expect(isPhoneValid(phoneStr)).toEqual({
      countryCode: 84,
      nationalNumber: '0938130683',
      e164: '84938130683',
      network: 0
    })
    expect(isPhoneValid(phone1)).toEqual({
      countryCode: 212,
      nationalNumber: '0649080802',
      e164: '212649080802',
      network: 0
    })
  });
});
