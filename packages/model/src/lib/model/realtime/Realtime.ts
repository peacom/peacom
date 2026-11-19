export const REALTIME_EVENT_VERSION = 1;
export const REALTIME_MAX_USER_IDS = 500;

export enum REALTIME_EVENT {
  MESSAGE_NEW = 'message.new',
  CONVERSATION_UPDATED = 'conversation.updated',
  TICKET_UPDATED = 'ticket.updated',
  NOTIFICATION_NEW = 'notification.new',
  MESSAGE_STATUS = 'message.status',
  // Visitor typing in a conversation (Live Chat), action START / STOP
  CONVERSATION_TYPING = 'conversation.typing',
}

export enum REALTIME_ACTION {
  REQUEST = 'request',
  JOIN = 'join',
  LEAVE = 'leave',
  READ = 'read',
  MEMBER = 'member',
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  NOTE = 'note',
  STATUS = 'status',
  ASSIGNED = 'assigned',
  TRANSFERRED = 'transferred',
  JOINED = 'joined',
  LEFT = 'left',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  START = 'start',
  STOP = 'stop',
}

export type RealtimeId = number | string;

export interface RealtimeEvent {
  type: REALTIME_EVENT | string;
  companyId: RealtimeId;
  conversationId?: RealtimeId | null;
  ticketId?: RealtimeId | null;
  messageId?: RealtimeId | null;
  actorId?: RealtimeId | null;
  action?: REALTIME_ACTION | string;
  userIds?: number[];
}
