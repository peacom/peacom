/**
 * Cycle
 * PENDING ==> OPTIMIZING => OPTIMIZED ==> STARTED ==> PROCESSING ==> DONE
 *  - only allow update bulk campaign when STATUS in (PENDING, OPTIMIZE, DONE)
 *    1. Any change relative to channel ==> Not allow
 *    2. Other change is ok.
 *  - only broadcast BULK CAMPAIGN WHEN STATUS OPTIMIZE, OR DONE
 * @type {{DONE: number, OPTIMIZE: number, STARTED: number, PROCESSING: number, PENDING: number}}
 */
export enum BULK_CAMPAIGN_RUN_STATUS {
  PENDING = 1,
  STARTED,
  PROCESSING,
  DONE,
  OPTIMIZING,
  OPTIMIZED,
  FINISHED
}

export enum BULK_CAMPAIGN_TYPE {
  BROADCAST_ONLY = 1,
  CONVERSATION = 2
}

export enum BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS {
  DRAFT = -1,
  NOT_SEND = 0,
  PROCESSING = 1,
  DONE = 2,
  FAIL = 3,
  SENT = 4,
  DELIVERED = 5,
  READ = 6,
  BLACK_LIST = 7,
  COMPLIANCE = 8,
  IN_QUEUE = 9
}

export enum BULK_CAMPAIGN_STATUS {
  STOP,
  START,
}

export enum BULK_CAMPAIGN_CONTACT_ORIGIN {
  IMPORT_FROM_FILE = 1,
  ADD_FROM_CONTACT = 2,
  USER_AUTO_JOIN = 3,
  FROM_APPLICATION = 4,
  FROM_SEGMENT = 5
}

export const getBulkCampaignContactProcessStatus = (status: BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS) => {
  switch (status) {
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.DRAFT:
      return 'DRAFT';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.NOT_SEND:
      return 'NOT SEND';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.PROCESSING:
      return 'PROCESSING';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.DONE:
      return 'DONE';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.FAIL:
      return 'FAIL';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.SENT:
      return 'SENT';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.DELIVERED:
      return 'DELIVERED';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.READ:
      return 'READ';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.BLACK_LIST:
      return 'BLACK LIST';
    case BULK_CAMPAIGN_CONTACT_PROCESSING_STATUS.COMPLIANCE:
      return 'COMPLIANCE';
    default:
      return 'UNKNOWN';
  }
};

export enum BulkBroadcastType {
  SCHEDULER = 1,
  SEND_NOW,
}


