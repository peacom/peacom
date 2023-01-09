import {QueueMessageStatus, QueueOutgoingMessage} from "../../model";
import {Queue} from "bullmq";
import {v4} from 'uuid'

const toBullQueueMessage = (message: QueueMessageStatus) => {
  const jobId = `${message.applicationId}_${message.applicationMessageId}_${message.status}_${message.date}`
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
