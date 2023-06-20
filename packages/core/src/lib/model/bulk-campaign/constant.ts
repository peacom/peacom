/**
 * Cycle
 * PENDING ==> OPTIMIZING => OPTIMIZED ==> STARTED ==> PROCESSING ==> DONE
 *  - only allow update bulk campaign when STATUS in (PENDING, OPTIMIZE, DONE)
 *    1. Any change relative to channel ==> Not allow
 *    2. Other change is ok.
 *  - only broadcast BULK CAMPAIGN WHEN STATUS OPTIMIZE
 * @type {{DONE: number, OPTIMIZE: number, STARTED: number, PROCESSING: number, PENDING: number}}
 */
export enum BULK_CAMPAIGN_RUN_STATUS {
  PENDING = 1,
  STARTED,
  PROCESSING,
  DONE,
  OPTIMIZING,
  OPTIMIZED
}

export enum BULK_CAMPAIGN_TYPE {
  BROADCAST_ONLY = 1,
  CONVERSATION = 2
}
