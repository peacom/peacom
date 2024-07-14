export enum API_PARTNER {
  PEACOM = 1,
  VNA, K_PLUS, OpenAI, GeminiAI, GoogleGeocoding
}

export enum API {
  GET = 'get', POST = 'post',
  K_PLUS_VALIDATE_SMART_CARD = 'kplusValidateSmartCard',
  K_PLUS_GET_SMART_CARD = 'kplusGetSmartCard',
  SET_VARIABLE = 'setVariable',
  OPEN_AI_GET_MESSAGE = 'getMessageByOpenAICompletion',
  OPEN_AI_GET_IMAGE = 'getImageByOpenAI',
  TICKET_TAG = 'ticketTagByTemplateApi',
  TICKET_TAG_AND_ASSIGN = 'ticketAssignAndTagByTemplateApi',
  TICKET_CLOSE = 'closeTicketByTemplateApi'
}
