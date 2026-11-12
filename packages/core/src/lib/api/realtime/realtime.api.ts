import {
  REALTIME_EVENT,
  REALTIME_EVENT_VERSION,
  REALTIME_MAX_USER_IDS,
  RealtimeEvent,
  RealtimeId,
} from '@peacom/model';

const REDIS_STATUS_READY = 'ready';

export interface RealtimeConnection {
  status?: string;
  publish: (channel: string, message: string) => unknown;
}

export interface RealtimeLog {
  error: (message: string) => unknown;
}

export interface RealtimePublisherOptions {
  getChannel: () => string | null | undefined;
  getConnection: () => RealtimeConnection | null | undefined;
  log: RealtimeLog;
}

export type RealtimePublisher = (
  event: RealtimeEvent | null | undefined
) => boolean;

export interface RealtimeConversationRef {
  id: RealtimeId;
  companyId: RealtimeId;
}

export interface RealtimeTicketRef {
  id: RealtimeId;
  companyId: RealtimeId;
  conversationId?: RealtimeId | null;
}

export interface RealtimeActorRef {
  id?: RealtimeId | null;
}

export interface RealtimeReceiver {
  userId?: RealtimeId | null;
  companyId?: RealtimeId | null;
}

const toErrorMessage = (e: unknown): string =>
  e instanceof Error ? e.message : `${e}`;

export const buildRealtimeMessage = (
  event: RealtimeEvent,
  now: Date = new Date()
): string =>
  JSON.stringify({
    ...event,
    v: REALTIME_EVENT_VERSION,
    at: now.toISOString(),
  });

export const createRealtimePublisher =
  ({
    getChannel,
    getConnection,
    log,
  }: RealtimePublisherOptions): RealtimePublisher =>
  (event) => {
    try {
      const channel = `${getChannel() || ''}`.trim();
      if (!channel) {
        return false;
      }
      if (!event || !event.type || !event.companyId) {
        log.error(`Realtime event ignored: ${JSON.stringify(event)}`);
        return false;
      }
      const connection = getConnection();
      if (!connection || connection.status !== REDIS_STATUS_READY) {
        return false;
      }
      Promise.resolve(
        connection.publish(channel, buildRealtimeMessage(event))
      ).catch((e) => log.error(`Realtime publish error: ${toErrorMessage(e)}`));
      return true;
    } catch (e) {
      log.error(`Realtime publish error: ${toErrorMessage(e)}`);
      return false;
    }
  };

export const toConversationUpdatedEvent = (
  conversation: RealtimeConversationRef,
  action: string,
  {
    user = null,
    ticket = null,
  }: { user?: RealtimeActorRef | null; ticket?: RealtimeActorRef | null } = {}
): RealtimeEvent => ({
  type: REALTIME_EVENT.CONVERSATION_UPDATED,
  companyId: conversation.companyId,
  conversationId: conversation.id,
  ticketId: ticket?.id,
  action,
  actorId: user?.id,
});

export const toTicketUpdatedEvent = (
  ticket: RealtimeTicketRef,
  action: string,
  { user = null }: { user?: RealtimeActorRef | null } = {}
): RealtimeEvent => ({
  type: REALTIME_EVENT.TICKET_UPDATED,
  companyId: ticket.companyId,
  ticketId: ticket.id,
  conversationId: ticket.conversationId,
  action,
  actorId: user?.id,
});

export const toNotificationEvents = (
  receivers: Array<RealtimeReceiver | null | undefined> | null | undefined,
  fields: Partial<RealtimeEvent> = {}
): RealtimeEvent[] => {
  const userIdsByCompany = new Map<number, Set<number>>();
  (receivers || []).forEach((receiver) => {
    const companyId = Number(receiver?.companyId);
    const userId = Number(receiver?.userId);
    if (!(companyId > 0) || !(userId > 0)) {
      return;
    }
    const userIds = userIdsByCompany.get(companyId) || new Set<number>();
    userIds.add(userId);
    userIdsByCompany.set(companyId, userIds);
  });
  const events: RealtimeEvent[] = [];
  userIdsByCompany.forEach((userIds, companyId) => {
    const ids = [...userIds];
    for (let i = 0; i < ids.length; i += REALTIME_MAX_USER_IDS) {
      events.push({
        ...fields,
        type: REALTIME_EVENT.NOTIFICATION_NEW,
        companyId,
        userIds: ids.slice(i, i + REALTIME_MAX_USER_IDS),
      });
    }
  });
  return events;
};
