import {QueueMessageStatus} from "../model/queue/QueueMessage";

type addQueue = (
  name: string,
  data: unknown,
  opts?: unknown,
) => Promise<unknown>

type Queue = {
  add: addQueue
}

export const queueAddMessageStatus = (queue: Queue, params: QueueMessageStatus, jobOpts: Record<string, unknown>) => {
  const jobId = `${params.applicationId}_${params.applicationMessageId}_${params.status}_${params.date}`
  return queue.add(jobId, params, {
    ...jobOpts, jobId
  })
}
