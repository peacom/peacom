import {
  ApiCoreHandleParams,
  ApiCoreHandleResponse,
  ApiCoreLiveAgentParams,
  ApiCoreLiveAgentResponse,
  LOG_FUNCTION
} from "./api.constant";
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

export const handleCoreLiveAgent = async (CORE_URL: string, params: ApiCoreLiveAgentParams, log: LOG_FUNCTION = null): Promise<ApiCoreLiveAgentResponse> => {
  const url = `${CORE_URL}/live-agent`
  if (log) {
    log(`CORE LIVE AGENT REQUEST: ${url} - ${JSON.stringify(params)}`)
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
    log(`CORE LIVE AGENT RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}

