import {
  ApiCoreBulkCampaignMessageRequest, ApiCoreBulkCampaignMessageResponse,
  ApiCoreHandleParams,
  ApiCoreHandleResponse,
  ApiCoreLiveAgentParams,
  ApiCoreLiveAgentResponse,
  ApiReactionParams,
  LOG_FUNCTION
} from "./api.constant";
import {FormError} from "../error/FormError";

export enum CORE_API_PATH {
  MESSAGE = "/message",
  LIVE_AGENT = "/conversation/live-agent",
  UNSUBSCRIBE = "/unsubscribe",
  SUBSCRIBE = "/subscribe",
  REACTION = "/message/reaction",
  CONVERSATION_MESSAGE = "/bulk-campaign/message"
}

export const handleCoreMessage = async (CORE_URL: string, params: ApiCoreHandleParams, log: LOG_FUNCTION = null): Promise<ApiCoreHandleResponse> => {
  const url = `${CORE_URL}${CORE_API_PATH.MESSAGE}`
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
  const url = `${CORE_URL}${CORE_API_PATH.LIVE_AGENT}`
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

export const handleUnsubscribe = async (CORE_URL: string, params: ApiCoreLiveAgentParams, log: LOG_FUNCTION = null): Promise<ApiCoreLiveAgentResponse> => {
  const url = `${CORE_URL}${CORE_API_PATH.UNSUBSCRIBE}`
  if (log) {
    log(`CORE UNSUBSCRIBE REQUEST: ${url} - ${JSON.stringify(params)}`)
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
    log(`CORE UNSUBSCRIBE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}

export const handleSubscribe = async (CORE_URL: string, params: ApiCoreLiveAgentParams, log: LOG_FUNCTION = null): Promise<ApiCoreLiveAgentResponse> => {
  const url = `${CORE_URL}${CORE_API_PATH.SUBSCRIBE}`
  if (log) {
    log(`CORE SUBSCRIBE REQUEST: ${url} - ${JSON.stringify(params)}`)
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
    log(`CORE SUBSCRIBE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}

export const handleReaction = async (
  CORE_URL: string,
  params: ApiReactionParams,
  log: LOG_FUNCTION = null
): Promise<ApiCoreHandleResponse> => {
  const url = `${CORE_URL}${CORE_API_PATH.REACTION}`;
  if (log) {
    log(`CORE REQUEST: ${url} - ${JSON.stringify(params)}`);
  }

  const rs = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
    },
  });
  const bodyStr = await rs.text();
  if (log) {
    log(`CORE RESPONSE: ${url} - ${bodyStr}`);
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr));
  }
  return JSON.parse(bodyStr);
};

export const sendBulkCampaignMessage = async (CORE_URL: string, param: ApiCoreBulkCampaignMessageRequest, log: LOG_FUNCTION = null): Promise<ApiCoreBulkCampaignMessageResponse> => {
  const url = `${CORE_URL}${CORE_API_PATH.CONVERSATION_MESSAGE}`
  if (log) {
    log(`CORE BULK CAMPAIGN MESSAGE REQUEST: ${url} - ${JSON.stringify(param)}`)
  }

  const rs = await fetch(url, {
    method: "POST",
    body: JSON.stringify(param),
    headers: {
      "content-type": "application/json"
    }
  })
  const bodyStr = await rs.text();
  if (log) {
    log(`CORE BULK CAMPAIGN MESSAGE RESPONSE: ${url} - ${bodyStr}`)
  }

  if (!rs.ok) {
    throw new FormError(JSON.parse(bodyStr))
  }
  return JSON.parse(bodyStr)
}
