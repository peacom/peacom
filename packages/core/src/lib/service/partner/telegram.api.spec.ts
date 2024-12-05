import {sendMessage} from "./";

describe('telegram.api.specs.ts', () => {
  it('sendMessage', async () => {
    const perf = sendMessage('6476144885:AAHo5ywFVa8l_rWhKEKOSyUzuIu-O6XvdcQ', {
      chat_id: '-4063433321',
      text: '<strong>test</strong> test',
      parse_mode: 'HTML'
    })
  })
})
