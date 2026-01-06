import {getSmsPartsInfo} from "./gsm.util";

describe('gsm.util', () => {
  it('gsm', () => {
    const data = 'Ma OTP cua Quy khach la 482913. Ma co hieu luc trong 5 phut. Khong chia se ma nay cho bat ky ai de tranh mat an toan.'
    const parts = getSmsPartsInfo(data);

    console.log("Number of SMSes needed: ", parts, data.length);
  });
  it('gsm latin', () => {
    const data = 'Тестирование коротких сообщений через систему SMS ровно на семьдесят символов.'
    console.log("data length", data.length);
    const parts = getSmsPartsInfo(data);
    console.log("Number of SMSes needed: ", parts);
  })
  it('gsm unicode', () => {
    const data = `Huỳnh Minh Quân!`
    const parts = getSmsPartsInfo(data);
    console.log("Number of SMSes needed: ", parts, data.length);
  })
});
