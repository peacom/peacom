// AUTO (SUBSCRIBED) ==> REQUEST ==> JOINED  ==> AUTO
// AUTO ==> UNSUBSCRIBED
// REQUEST ==> UNSUBSCRIBED

import { SuggestionActionType } from "../message"

// JOINED ==> UNSUBSCRIBED
export enum LIVE_AGENT_STATUS {
  REQUEST = 1,
  JOINED = 2,
  LEAVED = 3
}

export enum CONVERSATION_STATUS {
  SUBSCRIBED = 1,
  UNSUBSCRIBED
}

export const LIVE_AGENT_REQUEST_MESSAGE = 'LIVE_AGENT_REQUEST'

export enum RepresentativeType {
  BOT = "BOT",
  HUMAN = "HUMAN"
}

export interface Representative {
  avatar?: string,
  name: string,
  type: RepresentativeType
}

export interface Conversation {
  id?: number // Local Conversation ID
  partnerId?: string | null // Partner conversation ID
  status?: LIVE_AGENT_STATUS
  representative?: Representative
}

export const LIVE_AGENT_REQUEST_MESSAGES = {
  [SuggestionActionType.LIVE_AGENT_REQUEST]: "Live Agent Request",
  [SuggestionActionType.LIVE_AGENT_REQUEST_EN]: "Live Agent Request",
  [SuggestionActionType.LIVE_AGENT_REQUEST_VN]: "Lien He Ho Tro",
}

export const LIVE_AGENT_REQUEST_POSTBACK_DATA = {
  [SuggestionActionType.LIVE_AGENT_REQUEST]: "LIVE_AGENT_REQUEST",
  [SuggestionActionType.LIVE_AGENT_REQUEST_EN]: "LIVE_AGENT_REQUEST",
  [SuggestionActionType.LIVE_AGENT_REQUEST_VN]: "LIEN_HE_HO_TRO",
}
