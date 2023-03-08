import {sendChannelMessage} from "./micro-service.api";
import {Application, MESSAGE_TYPE, PARTNER} from "../model";

require('isomorphic-fetch');

describe('micro-service.spec', () => {
  it('sendChannelMessage', async () => {
    try {
      console.log(await sendChannelMessage('http://localhost:4001/eip/viber/business', {
        rawMessage: {
          type: MESSAGE_TYPE.TEXT,
          message: 'testing'
        }, receiverId: "84938130683",
        applicationInfo: {
          application: Application.VIBER_BUSINESS,
          setting: {},
          partnerId: PARTNER.VIBER,
          id: '001'
        }
      }))
    } catch (e) {
      console.error(e)
    }
  });
});
