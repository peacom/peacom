import {QueueMessageStatus, QueueOutgoingMessage} from "../../model";
import {Queue} from "bullmq";
import {v4} from 'uuid'
import {QueuePartnerEventParam} from "../../model/partner/PartnerEvent";
import {PARTNER_MESSAGE_TYPE} from "../../model/partner";
import {LiveAgentTask, liveAgentTaskStr} from "../../model/queue/crm/LiveAgentQueue";

const toBullQueueMessage = (message: QueueMessageStatus) => {
  const jobId = `${message.applicationInfo.applicationId}_${message.applicationMessageId || message.messageId}_${message.status}_${message.sentTime}`
  return {
    name: jobId, data: message, opts: {
      ...(message.jobOpt || {}), jobId
    }
  }
}

export const queueAddMessageStatus = (queue: Queue, message: QueueMessageStatus) => {
  const queueMessage = toBullQueueMessage(message)
  return queue.add(queueMessage.name, queueMessage.data, queueMessage.opts)
}

export const queueAddBulkMessageStatus = (queue: Queue, messages: Array<QueueMessageStatus>) => {
  return queue.addBulk(messages.map(t => toBullQueueMessage(t)))
}

export const queueAddOutgoingMessage = (queue: Queue, message: QueueOutgoingMessage) => {
  return queue.add(message.name || v4(), message, message.jobOpt)
}

export const queueAddPartnerEvent = (queue: Queue, message: QueuePartnerEventParam) => {
  let jobId = ''
  switch (message.event.type) {
    case PARTNER_MESSAGE_TYPE.EVENT:
      jobId = `${message.event.messageId}_${message.event.status}`
      break;
    case PARTNER_MESSAGE_TYPE.MESSAGE:
      jobId = message.event.messageId
  }
  return queue.add(jobId, message, {jobId, ...(message.jobOpt || {})})
}

export const queueAddLiveAgentTask = (queue: Queue, message: LiveAgentTask, delayTime: number) => {
  const id = `Task_${message.conversationId}_${liveAgentTaskStr(message.task)}`
  return queue.add(id, message, {...(message.jobOpt || {}), jobId: id, delay: delayTime * 60000})
}
