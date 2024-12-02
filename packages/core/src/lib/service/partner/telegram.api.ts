export interface TelegramMessageParam {
  chat_id: string
  text: string
  parse_mode: string

  [key: string]: any
}

export const sendTelegramMessage = (token: string, {chat_id, text, parse_mode}: TelegramMessageParam) => {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      chat_id,
      text,
      parse_mode
    })
  });
};

