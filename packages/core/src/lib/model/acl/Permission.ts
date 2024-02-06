export enum AclActionType {
  OWNER = 1,
  PARTIAL = 2,
  FULL = 3,
  BACK_OFFICE = 4,
  SYSTEM_ADMIN = 5,
}

// max=186

export const PERMISSION = {
  COMPANY: {
    READ: 1,
    CREATE: 2,
    UPDATE: 3,
    DELETE: 4,
    TOPUP: 23,
    EDIT_BILLING: 24,
    TRANSACTION_HISTORY: 25,
    VERIFY_KYC: 73,
    SETTING: 146,
  },
  OWN_COMPANY: {
    PROFILE: 161,
  },
  CONTACT: {
    READ: 5,
    CREATE: 6,
    UPDATE: 7,
    DELETE: 8,
  },
  BOT: {
    READ: 15,
    CREATE: 16,
    UPDATE: 17,
    DELETE: 18,
    START_STOP: 44,
    SETTING: 159,
    SYNC_CONVERSATION: 177,
  },
  OFFICIAL_ACCOUNT: {
    READ: 19,
    CREATE: 20,
    UPDATE: 21,
    DELETE: 22,
    START_STOP: 39,
    SETTING: 160,
  },
  AIRLINE_DASHBOARD: {
    GENERAL: 26,
  },
  INTERNAL_AIRLINE: {
    READ: 27,
    CREATE: 28, // NOT USED
    UPDATE: 29, // NOT USED
    DELETE: 30, // NOT USED
    IMPORT: 62,
    SEND_MESSAGE: 63,
    SETTING: 64,
    EDIT_PASSENGER: 65,
    BROADCAST: 72,
  },
  PHONE_BULK_CHECK: {
    READ: 31,
    CREATE: 32,
  },
  TEMPLATE: {
    READ: 33,
    CREATE: 34,
    UPDATE: 35,
    DELETE: 36,
    BACK_OFFICE_REVIEW: 37,
    BACK_OFFICE_APPROVE: 38, // TODO: NO NEED, because BO only approve when they have review
  },
  USER_MANAGEMENT: {
    READ: 40,
    CREATE: 41,
    INVITE: 41,
    UPDATE: 42,
    DISABLE: 43,
    DELETE: 82,
  },
  BULK_CAMPAIGN: {
    READ: 45,
    CREATE: 46,
    UPDATE: 47,
    DELETE: 48,
    DELETE_CONTACT: 83,
  },
  BLACK_LIST: {
    READ: 52,
    CREATE: 53,
    UPDATE: 54,
    DELETE: 55,
    GLOBAL: 57,
  },
  LABEL: {
    READ: 58,
    CREATE: 59,
    UPDATE: 60,
    DELETE: 61,
  },
  CHAT: {
    READ: 66,
    LIVE_AGENT: 67, // Join and Leave,
    DASHBOARD: 186
  },
  COMPLIANCE: {
    READ: 68,
    CREATE: 69,
    UPDATE: 70,
    DELETE: 71,
  },
  LEAD: {
    READ: 74,
    CREATE: 75,
    UPDATE: 76,
    DELETE: 77,
  },
  TEMPLATE_LIBRARY: {
    READ: 78, // NOT USE, because everyone can show this page
    CREATE: 79,
    UPDATE: 80,
    DELETE: 81,
  },
  DASHBOARD: {
    REPORT_BALANCE_CHANNEL: 49, // Show company balance, and detail cost of each channel
    REPORT_OFFICIAL_ACCOUNT: 50, // Show summary information of each channel like last send, delivery, receive
    REPORT_COMPANY: 51,
    REPORT_BULK_CAMPAIGN: 56,
  },
  SYSTEM_SETTING: {
    RESET: 84,
    LADING_PAGE: 112,
  },
  ONBOARDING_MANAGEMENT: {
    // Not use now for onboarding
    READ: 85,
    BACK_OFFICE_REVIEW: 86,
    BACK_OFFICE_APPROVE: 87,
  },
  BILLING_CDR: {
    READ: 88,
    CREATE: 89,
    DELETE: 90,
    SETTING: 145,
  },
  API_KEY: {
    READ: 91,
    CREATE: 92,
    UPDATE: 93,
    DELETE: 94,
  },
  CUSTOMER: {
    READ: 95,
    CREATE: 96,
    UPDATE: 97,
    DELETE: 98,
    SETTING: 111,
  },
  TICKET: {
    READ: 99,
    CREATE: 100,
    UPDATE: 101,
    DELETE: 102,
    ASSIGN: 147,
    TRANSFER: 148,
    DASHBOARD: 185
  },
  AGENT_GROUP: {
    READ: 103,
    CREATE: 104,
    UPDATE: 105,
    DELETE: 106,
  },
  TICKET_CATEGORY: {
    READ: 107,
    CREATE: 108,
    UPDATE: 109,
    DELETE: 110,
  },
  SEGMENT: {
    READ: 113,
    CREATE: 114,
    UPDATE: 115,
    DELETE: 116,
  },
  PRODUCT: {
    READ: 117,
    CREATE: 118,
    UPDATE: 119,
    DELETE: 120,
    SETTING: 176,
  },
  INVOICE: {
    READ: 121,
    CREATE: 122,
    UPDATE: 123,
    DELETE: 124,
  },
  BRANCH: {
    READ: 125,
    CREATE: 126,
    UPDATE: 127,
    DELETE: 128,
  },
  REPLY_TEMPLATE: {
    READ: 129,
    CREATE: 130,
    UPDATE: 131,
    DELETE: 132,
  },
  COMPANY_ROLE: {
    READ: 133,
    CREATE: 134,
    UPDATE: 135,
    DELETE: 136,
  },
  PRODUCT_CATEGORY: {
    READ: 137,
    CREATE: 138,
    UPDATE: 139,
    DELETE: 140,
  },
  COMPANY_MEMBER: {
    READ: 141,
    CREATE: 142,
    UPDATE: 143,
    DELETE: 144,
    SETTING: 153,
  },
  CRM_PROFILE: {
    READ: 149,
    CREATE: 150,
    UPDATE: 151,
    DELETE: 152,
  },
  SLA: {
    READ: 154,
    CREATE: 155,
    UPDATE: 156,
    DELETE: 157,
    SETTING: 158,
  },
  PAYMENT: {
    READ: 162,
    SETTING: 163,
    CREATE: 168,
    UPDATE: 169,
    DELETE: 170,
  },
  BROADCAST: {
    CREATE: 164,
    UPDATE: 166,
    DELETE: 167,
    READ: 165,
  },
  AUDIT: {
    READ: 171,
  },
  ORDER: {
    READ: 172,
    CREATE: 173,
    UPDATE: 174,
    DELETE: 175,
  },
  FUNCTION_TARIFF: {
    READ: 178,
    CREATE: 179,
    DELETE: 180,
  },
  COMPANY_FUNCTION: {
    READ: 181,
    CREATE: 182,
    UPDATE: 183,
    DELETE: 184,
  },
};

// MAX= 184
export interface ActionDescription {
  actionId: number;
  name: string;
  enableType: boolean;
  maxType?: number;
  listType?: Array<AclActionType>;
  description?: string;
}
