import {ApiChannelMessageParams, ApiChannelMessageResponse, LOG_FUNCTION} from "./api.constant";
import {myFetch} from "./fetch";

export const sendChannelMessage = async (MICROSERVICE_URL: string, params: ApiChannelMessageParams, log: LOG_FUNCTION = null): Promise<ApiChannelMessageResponse> => {
  const url = `${MICROSERVICE_URL}/message`
  if (log) {
    log(`SERVICE REQUEST: ${url} - ${JSON.stringify(params)}`)
  }

  const rs = await myFetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json"
    }
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`SERVICE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    let errorMessage = ''
    try {
      const errors = JSON.parse(bodyStr)
      if (errors.length) {
        errorMessage = errors[0]?.message
      }
    } catch (e) {
      errorMessage = bodyStr
    }

    throw new Error(errorMessage)
  }
  return JSON.parse(bodyStr)
}
