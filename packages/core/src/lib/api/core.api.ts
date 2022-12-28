import {ApiCoreHandleParams, ApiCoreHandleResponse, LOG_FUNCTION} from "./api.constant";
import {FormError} from "../error/FormError";


export const handleCoreMessage = async (CORE_URL: string, params: ApiCoreHandleParams, log: LOG_FUNCTION = null): Promise<ApiCoreHandleResponse> => {
  const url = `${CORE_URL}/message`
  if (log) {
    log(`CORE REQUEST: ${url} - ${JSON.stringify(params)}`)
  }

  const rs = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "content-type": "application/json"
    }
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`CORE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}

