import {
  ApiCoreHandleParams,
  ApiCoreHandleResponse,
  ApiCoreLiveAgentParams,
  ApiCoreLiveAgentResponse,
  LOG_FUNCTION
} from "./api.constant";
import {FormError} from "../error/FormError";

export enum CORE_API_PATH {
  MESSAGE = "/message",
  LIVE_AGENT = "/conversation/live-agent",
  CONVERSATION_CLOSE = "/conversation/close"
}

export const handleCoreMessage = async (CORE_URL: string, params: ApiCoreHandleParams, log: LOG_FUNCTION = null): Promise<ApiCoreHandleResponse> => {
  const url = `${CORE_URL}/${CORE_API_PATH.MESSAGE}`
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
  const url = `${CORE_URL}/${CORE_API_PATH.LIVE_AGENT}`
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

export const handleCoreConversationClose = async (CORE_URL: string, params: ApiCoreLiveAgentParams, log: LOG_FUNCTION = null): Promise<ApiCoreLiveAgentResponse> => {
  const url = `${CORE_URL}/${CORE_API_PATH.CONVERSATION_CLOSE}`
  if (log) {
    log(`CORE CONVERSATION CLOSE REQUEST: ${url} - ${JSON.stringify(params)}`)
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
    log(`CORE CONVERSATION CLOSE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}
