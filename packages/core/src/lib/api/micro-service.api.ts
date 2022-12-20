import {ApiChannelMessageParams, LOG_FUNCTION} from "./api.constant";
import {FormError} from "../error/FormError";

export const sendChannelMessage = async (MICROSERVICE_URL: string, params: ApiChannelMessageParams, log: LOG_FUNCTION = null) => {
  if (log) {
    log(`SERVICE REQUEST: ${MICROSERVICE_URL} - ${JSON.stringify(params)}`)
  }

  const rs = await fetch(MICROSERVICE_URL, {
    method: "POST",
    body: JSON.stringify(params)
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`SERVICE RESPONSE: ${MICROSERVICE_URL} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}
