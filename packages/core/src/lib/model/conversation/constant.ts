export enum LIVE_AGENT_STATUS {
  REQUEST = 1,
  JOINED = 2,
  LEAVED = 3
}

export interface Conversation {
  id?: number // Local Conversation ID
  partnerId?: string | null // Partner conversation ID
}
