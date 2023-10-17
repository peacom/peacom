import {JobsOptions} from "bullmq";

export const LIVE_AGENT_QUEUE = "LIVE_AGENT_QUEUE"

/**
 * One queue can handle multiple task, base on task
 */
export enum LIVE_AGENT_TASK {
  RESPONSE_TIMEOUT,
  AUTO_LEAVE
}

export const liveAgentTaskStr = (task: LIVE_AGENT_TASK) => {
  switch (task) {
    case LIVE_AGENT_TASK.AUTO_LEAVE:
      return 'AutoLeave'
    case LIVE_AGENT_TASK.RESPONSE_TIMEOUT:
      return 'ResponseTimeout'
    default:
      return 'Unknown'
  }
}

export interface LiveAgentTask {
  conversationId: number
  task: LIVE_AGENT_TASK,
  jobOpt?: JobsOptions
}
