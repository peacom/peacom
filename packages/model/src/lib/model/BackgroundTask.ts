export enum BACKGROUND_TASK {
  CONTACT_IMPORT_FROM_DATALYTIC = 1,
  CONTACT_IMPORT_FROM_FILE = 2,
  BULK_CAMPAIGN_IMPORT = 3,
  BULK_CAMPAIGN_OPTIMIZE = 4,
  GENERATE_CDR_FILE = 5,
  BULK_CAMPAIGN_REPORT = 6,
  VNA_REPORT = 7,
  IMPORT_PRODUCT = 8,
  IMPORT_CUSTOMER = 9
}

export enum BACKGROUND_TASK_STATUS {
  PENDING = 1,
  PROCESSING = 2,
  DONE,
  FAIL
}

export enum BACKGROUND_TASK_FILE_TYPE {
  INPUT_PARAM = 1,
  RESULT_UNIQUE,
  RESULT_DUPLICATION,
  RESULT_ERROR,
  RESULT_REPORT
}
