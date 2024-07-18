export enum BACKGROUND_TASK {
  EXPORT_CUSTOMER_FROM_SEGMENT = 1,
  CONTACT_IMPORT_FROM_FILE = 2,
  BULK_CAMPAIGN_IMPORT = 3,
  BULK_CAMPAIGN_OPTIMIZE = 4,
  GENERATE_CDR_FILE = 5,
  BULK_CAMPAIGN_REPORT = 6,
  VNA_REPORT = 7,
  IMPORT_PRODUCT = 8,
  IMPORT_CUSTOMER = 9,
  CHANNEL_SYNC = 10,
  IMPORT_BULK_CONTACT_FROM_SEGMENT = 11,
  EXPORT_CUSTOMER = 12,
  IMPORT_BACK_LIST = 13,
  EXPORT_BACK_LIST = 14,
  IMPORT_BACK_LIST_GLOBAL = 15,
  EXPORT_BACK_LIST_GLOBAL = 16,
  EXPORT_AGENT_CUSTOMER = 17,
  REMOVE_USER = 18,
  REMOVE_COMPANY = 19
}

export enum BACKGROUND_TASK_STATUS {
  PENDING = 1,
  PROCESSING = 2,
  DONE,
  FAIL,
}

export enum BACKGROUND_TASK_FILE_TYPE {
  INPUT_PARAM = 1,
  RESULT_UNIQUE,
  RESULT_DUPLICATION,
  RESULT_ERROR,
  RESULT_REPORT,
}
