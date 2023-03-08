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
  it('isValidPhoneRegion', () => {
    const canada = '+1-416-750-9999'
    const us = '+1-406-750-9999'
    console.log(isPhoneValid(us))
    expect(isPhoneValid(us)).toEqual({
      countryCode: 1,
      nationalNumber: '04067509999',
      e164: '14067509999',
      network: 0,
      region: 'US'
    })
    expect(isPhoneValid(canada)).toEqual({
      countryCode: 1,
      nationalNumber: '04167509999',
      e164: '14167509999',
      network: 0,
      region: 'CA'
    })
  });
});
