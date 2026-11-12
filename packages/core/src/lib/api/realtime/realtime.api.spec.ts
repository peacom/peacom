import {
  buildRealtimeMessage,
  createRealtimePublisher,
  RealtimeConnection,
  toConversationUpdatedEvent,
  toNotificationEvents,
  toTicketUpdatedEvent,
} from './realtime.api';

const CHANNEL = 'mmp:test:realtime';
const EVENT = { type: 'message.new', companyId: 32, conversationId: 1001 };

const nextTick = () => new Promise((resolve) => setImmediate(resolve));

const createFakes = ({
  getChannel = () => CHANNEL as string | null | undefined,
  status = 'ready',
  publish,
}: {
  getChannel?: () => string | null | undefined;
  status?: string;
  publish?: RealtimeConnection['publish'];
} = {}) => {
  const published: Array<{ channel: string; message: string }> = [];
  const errors: string[] = [];
  const connection: RealtimeConnection = {
    status,
    publish:
      publish ||
      (async (channel: string, message: string) => {
        published.push({ channel, message });
        return 1;
      }),
  };
  const publishRealtimeEvent = createRealtimePublisher({
    getChannel,
    getConnection: () => connection,
    log: { error: (message: string) => errors.push(message) },
  });
  return { publishRealtimeEvent, published, errors };
};

describe('realtime.api', () => {
  describe('buildRealtimeMessage', () => {
    it('adds v and at and keeps the fields of the event', () => {
      const message = buildRealtimeMessage(
        { ...EVENT, messageId: 5 },
        new Date('2026-11-12T09:00:00.000Z')
      );
      expect(JSON.parse(message)).toEqual({
        type: 'message.new',
        companyId: 32,
        conversationId: 1001,
        messageId: 5,
        v: 1,
        at: '2026-11-12T09:00:00.000Z',
      });
    });

    it('does not let the caller override v and at', () => {
      const event = { ...EVENT, v: 9, at: 'yesterday' };
      const data = JSON.parse(
        buildRealtimeMessage(event, new Date('2026-11-12T09:00:00.000Z'))
      );
      expect(data.v).toBe(1);
      expect(data.at).toBe('2026-11-12T09:00:00.000Z');
    });

    it('leaves out undefined fields', () => {
      const data = JSON.parse(
        buildRealtimeMessage({ ...EVENT, ticketId: undefined })
      );
      expect(data).not.toHaveProperty('ticketId');
    });
  });

  describe('createRealtimePublisher', () => {
    it('publishes the event to the configured channel', () => {
      const { publishRealtimeEvent, published, errors } = createFakes();
      expect(publishRealtimeEvent(EVENT)).toBe(true);
      expect(published).toHaveLength(1);
      expect(published[0].channel).toBe(CHANNEL);
      const data = JSON.parse(published[0].message);
      expect(data.type).toBe('message.new');
      expect(data.companyId).toBe(32);
      expect(data.v).toBe(1);
      expect(Number.isNaN(Date.parse(data.at))).toBe(false);
      expect(errors).toEqual([]);
    });

    it('does nothing when REALTIME_CHANNEL is not set', () => {
      [undefined, null, '', '   '].forEach((channel) => {
        const { publishRealtimeEvent, published, errors } = createFakes({
          getChannel: () => channel,
        });
        expect(publishRealtimeEvent(EVENT)).toBe(false);
        expect(published).toEqual([]);
        expect(errors).toEqual([]);
      });
    });

    it('ignores an event without type or companyId and logs it', () => {
      const events = [
        null,
        {},
        { type: 'message.new' },
        { companyId: 32 },
      ] as Array<Parameters<ReturnType<typeof createRealtimePublisher>>[0]>;
      events.forEach((event) => {
        const { publishRealtimeEvent, published, errors } = createFakes();
        expect(publishRealtimeEvent(event)).toBe(false);
        expect(published).toEqual([]);
        expect(errors).toHaveLength(1);
      });
    });

    it('does not publish while Redis is not ready', () => {
      const { publishRealtimeEvent, published, errors } = createFakes({
        status: 'reconnecting',
      });
      expect(publishRealtimeEvent(EVENT)).toBe(false);
      expect(published).toEqual([]);
      expect(errors).toEqual([]);
    });

    it('does not throw when Redis rejects the publish', async () => {
      const { publishRealtimeEvent, errors } = createFakes({
        publish: async () => {
          throw new Error('boom');
        },
      });
      expect(publishRealtimeEvent(EVENT)).toBe(true);
      await nextTick();
      expect(errors).toEqual(['Realtime publish error: boom']);
    });

    it('does not throw when the publish call itself throws', () => {
      const { publishRealtimeEvent, errors } = createFakes({
        publish: () => {
          throw new Error('sync boom');
        },
      });
      expect(publishRealtimeEvent(EVENT)).toBe(false);
      expect(errors).toEqual(['Realtime publish error: sync boom']);
    });

    it('does not throw when the connection can not be read', () => {
      const errors: string[] = [];
      const publishRealtimeEvent = createRealtimePublisher({
        getChannel: () => CHANNEL,
        getConnection: () => {
          throw new Error('no connection');
        },
        log: { error: (message: string) => errors.push(message) },
      });
      expect(publishRealtimeEvent(EVENT)).toBe(false);
      expect(errors).toEqual(['Realtime publish error: no connection']);
    });
  });

  describe('toConversationUpdatedEvent', () => {
    it('takes the ids from the conversation', () => {
      expect(
        toConversationUpdatedEvent({ id: 1001, companyId: 32 }, 'join', {
          user: { id: 133 },
          ticket: { id: 77 },
        })
      ).toEqual({
        type: 'conversation.updated',
        companyId: 32,
        conversationId: 1001,
        ticketId: 77,
        action: 'join',
        actorId: 133,
      });
    });

    it('works without user and ticket', () => {
      const data = JSON.parse(
        buildRealtimeMessage(
          toConversationUpdatedEvent({ id: 1001, companyId: 32 }, 'request')
        )
      );
      expect(data).toMatchObject({
        type: 'conversation.updated',
        companyId: 32,
        conversationId: 1001,
        action: 'request',
      });
      expect(data).not.toHaveProperty('ticketId');
      expect(data).not.toHaveProperty('actorId');
    });
  });

  describe('toTicketUpdatedEvent', () => {
    it('takes the ids from the ticket', () => {
      expect(
        toTicketUpdatedEvent(
          { id: 77, companyId: 32, conversationId: 1001 },
          'assigned',
          { user: { id: 133 } }
        )
      ).toEqual({
        type: 'ticket.updated',
        companyId: 32,
        ticketId: 77,
        conversationId: 1001,
        action: 'assigned',
        actorId: 133,
      });
    });

    it('works without user', () => {
      const event = toTicketUpdatedEvent(
        { id: 77, companyId: 32, conversationId: null },
        'transferred'
      );
      expect(event.actorId).toBeUndefined();
      expect(event.ticketId).toBe(77);
    });
  });

  describe('toNotificationEvents', () => {
    it('makes one event per company with the users of that company', () => {
      const events = toNotificationEvents(
        [
          { userId: 1, companyId: 32 },
          { userId: 2, companyId: 32 },
          { userId: 3, companyId: 99 },
          { userId: '2', companyId: '32' },
        ],
        { conversationId: 1001 }
      );
      expect(events).toEqual([
        {
          conversationId: 1001,
          type: 'notification.new',
          companyId: 32,
          userIds: [1, 2],
        },
        {
          conversationId: 1001,
          type: 'notification.new',
          companyId: 99,
          userIds: [3],
        },
      ]);
    });

    it('skips receivers without user or company', () => {
      expect(
        toNotificationEvents([
          { userId: 1 },
          { companyId: 32 },
          { userId: 0, companyId: 32 },
          null,
        ])
      ).toEqual([]);
      expect(toNotificationEvents(null)).toEqual([]);
    });

    it('never puts more than 500 users in one event', () => {
      const receivers = Array.from({ length: 1201 }, (unused, index) => ({
        userId: index + 1,
        companyId: 32,
      }));
      const events = toNotificationEvents(receivers);
      expect(events.map((t) => t.userIds?.length)).toEqual([500, 500, 201]);
      expect(events.every((t) => t.companyId === 32)).toBe(true);
    });

    it('does not let the extra fields override type, companyId or userIds', () => {
      const [event] = toNotificationEvents([{ userId: 1, companyId: 32 }], {
        type: 'message.new',
        companyId: 1,
        userIds: [9],
      });
      expect(event).toEqual({
        type: 'notification.new',
        companyId: 32,
        userIds: [1],
      });
    });
  });
});
