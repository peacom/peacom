export enum LIVE_AGENT_STATUS {
  REQUEST = 1,
  JOINED = 2,
  LEAVED = 3
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