import {ApiCoreHandleParams, ApiCoreHandleResponse, LOG_FUNCTION} from "./api.constant";
import {FormError} from "../error/FormError";


export const handleCoreMessage = async (CORE_URL: string, params: ApiCoreHandleParams, log: LOG_FUNCTION = null): Promise<ApiCoreHandleResponse> => {
  if (log) {
    log(`CORE REQUEST: ${CORE_URL} - ${JSON.stringify(params)}`)
  }

  const rs = await fetch(CORE_URL, {
    method: "POST",
    body: JSON.stringify(params)
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`CORE RESPONSE: ${CORE_URL} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}

