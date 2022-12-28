import {ApiChannelMessageParams, LOG_FUNCTION} from "./api.constant";
import {FormError} from "../error/FormError";

export const sendChannelMessage = async (MICROSERVICE_URL: string, params: ApiChannelMessageParams, log: LOG_FUNCTION = null) => {
  const url = `${MICROSERVICE_URL}/message`
  if (log) {
    log(`SERVICE REQUEST: ${url} - ${JSON.stringify(params)}`)
  }

  const rs = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params)
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`SERVICE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}
