import {AclActionType, ActionDescription, PERMISSION} from './Permission';

const BoAdminTypeList = [AclActionType.BACK_OFFICE, AclActionType.SYSTEM_ADMIN];
const BoAdminCompanyTypeList = [
  AclActionType.FULL,
  AclActionType.BACK_OFFICE,
  AclActionType.SYSTEM_ADMIN,
];
const CompanyTypeList = [
  AclActionType.FULL,
  AclActionType.PARTIAL,
  AclActionType.OWNER,
];
const OwnerTypeList = [AclActionType.OWNER];
const OwnerOrCompanyTypeList = [AclActionType.OWNER, AclActionType.FULL];

/**
 * TODO: Note
 * NOTE 1: 1 ACTION ONLY using for 1 business.
 * NOTE 2: if 1 ACTION can using for 2 business, then read NOTE 1 again.
 *
 * enableType: false ==> mean that action is not support for ACL (only where with user.companyId),
 * and we set it default is listType[0] or AclActionType.FULL
 * enableType: true ==> UNION of user permission type and (listType or ALL)
 */
export const PERMISSION_COMPANY_LIST: Record<number, ActionDescription> = {
  [PERMISSION.COMPANY.CREATE]: {
    actionId: PERMISSION.COMPANY.CREATE,
    name: 'Create',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.READ]: {
    actionId: PERMISSION.COMPANY.READ,
    name: 'Read',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.UPDATE]: {
    actionId: PERMISSION.COMPANY.UPDATE,
    name: 'Update',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.DELETE]: {
    actionId: PERMISSION.COMPANY.DELETE,
    name: 'Delete',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.TOPUP]: {
    actionId: PERMISSION.COMPANY.TOPUP,
    name: 'Top up',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.EDIT_BILLING]: {
    actionId: PERMISSION.COMPANY.EDIT_BILLING,
    name: 'Billing, Tariff Update',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.TRANSACTION_HISTORY]: {
    actionId: PERMISSION.COMPANY.TRANSACTION_HISTORY,
    name: 'Topup transaction',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.VERIFY_KYC]: {
    actionId: PERMISSION.COMPANY.VERIFY_KYC,
    name: 'Verify Kyc',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPANY.SETTING]: {
    actionId: PERMISSION.COMPANY.SETTING,
    name: 'Setting',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_OWN_COMPANY_LIST: Record<number, ActionDescription> = {
  [PERMISSION.OWN_COMPANY.PROFILE]: {
    actionId: PERMISSION.OWN_COMPANY.PROFILE,
    name: 'Profile View & Update',
    enableType: false,
  },
};

export const PERMISSION_CONTACT_LIST: Record<number, ActionDescription> = {
  [PERMISSION.CONTACT.CREATE]: {
    actionId: PERMISSION.CONTACT.CREATE,
    name: 'Create',
    enableType: true,
    listType: OwnerTypeList,
  },
  [PERMISSION.CONTACT.READ]: {
    actionId: PERMISSION.CONTACT.READ,
    name: 'Read',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.CONTACT.UPDATE]: {
    actionId: PERMISSION.CONTACT.UPDATE,
    name: 'Update',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.CONTACT.DELETE]: {
    actionId: PERMISSION.CONTACT.DELETE,
    name: 'Delete',
    enableType: true,
    listType: CompanyTypeList,
  },
};

export const PERMISSION_BOT_LIST: Record<number, ActionDescription> = {
  [PERMISSION.BOT.CREATE]: {
    actionId: PERMISSION.BOT.CREATE,
    name: 'Create',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.BOT.READ]: {
    actionId: PERMISSION.BOT.READ,
    name: 'Read',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.BOT.UPDATE]: {
    actionId: PERMISSION.BOT.UPDATE,
    name: 'Update',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.BOT.DELETE]: {
    actionId: PERMISSION.BOT.DELETE,
    name: 'Delete',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.BOT.SETTING]: {
    actionId: PERMISSION.BOT.SETTING,
    name: 'Setting',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.BOT.START_STOP]: {
    actionId: PERMISSION.BOT.START_STOP,
    name: 'Start, stop channel',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.BOT.SYNC_CONVERSATION]: {
    actionId: PERMISSION.BOT.SYNC_CONVERSATION,
    name: 'Sync bot conversation (messages, contacts)',
    enableType: true,
    listType: CompanyTypeList,
  },
};

export const PERMISSION_OA_LIST: Record<number, ActionDescription> = {
  [PERMISSION.OFFICIAL_ACCOUNT.CREATE]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.CREATE,
    name: 'Create',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.OFFICIAL_ACCOUNT.READ]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.READ,
    name: 'Read',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.OFFICIAL_ACCOUNT.UPDATE]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.UPDATE,
    name: 'Update',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.OFFICIAL_ACCOUNT.DELETE]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.DELETE,
    name: 'Delete',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.OFFICIAL_ACCOUNT.SETTING]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.SETTING,
    name: 'Setting',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.OFFICIAL_ACCOUNT.START_STOP]: {
    actionId: PERMISSION.OFFICIAL_ACCOUNT.START_STOP,
    name: 'Start, stop channel',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_AIRLINE_LIST: Record<number, ActionDescription> = {
  [PERMISSION.AIRLINE_DASHBOARD.GENERAL]: {
    actionId: PERMISSION.AIRLINE_DASHBOARD.GENERAL,
    name: 'Dashboard General',
    description: 'View Dashboard General',
    enableType: false,
  },
  [PERMISSION.INTERNAL_AIRLINE.READ]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.READ,
    name: 'Read',
    description: 'View information about flight, passenger',
    enableType: false,
  },
  [PERMISSION.INTERNAL_AIRLINE.IMPORT]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.IMPORT,
    name: 'Import Flight, Passenger',
    enableType: false,
  },
  [PERMISSION.INTERNAL_AIRLINE.SEND_MESSAGE]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.SEND_MESSAGE,
    name: 'Send Message',
    description: 'Broadcast message to each passenger.',
    enableType: false,
  },
  [PERMISSION.INTERNAL_AIRLINE.EDIT_PASSENGER]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.EDIT_PASSENGER,
    name: 'Update passenger',
    enableType: false,
    description:
      'Update passenger information in MMP, not effect to airline system',
  },
  [PERMISSION.INTERNAL_AIRLINE.BROADCAST]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.BROADCAST,
    name: 'Broadcast Message',
    enableType: false,
    description: 'Broadcast message to all passenger of one flight.',
  },
  [PERMISSION.INTERNAL_AIRLINE.SETTING]: {
    actionId: PERMISSION.INTERNAL_AIRLINE.SETTING,
    name: 'Setting',
    enableType: false,
    description: 'Configuration for airline',
  },
};

export const PERMISSION_PHONE_BULK_CHECK: Record<number, ActionDescription> = {
  [PERMISSION.PHONE_BULK_CHECK.READ]: {
    actionId: PERMISSION.PHONE_BULK_CHECK.READ,
    name: 'Read',
    description: 'View list file for check phone number',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.PHONE_BULK_CHECK.CREATE]: {
    actionId: PERMISSION.PHONE_BULK_CHECK.CREATE,
    name: 'Create',
    description: 'Upload and check phone is valid for channel',
    enableType: true,
    listType: OwnerTypeList,
  },
};

export const PERMISSION_TEMPLATE: Record<number, ActionDescription> = {
  [PERMISSION.TEMPLATE.READ]: {
    actionId: PERMISSION.TEMPLATE.READ,
    name: 'Read',
    description: 'View list of template',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TEMPLATE.CREATE]: {
    actionId: PERMISSION.TEMPLATE.CREATE,
    name: 'Create',
    description: 'Create and request review template',
    enableType: true,
    listType: OwnerTypeList,
  },
  [PERMISSION.TEMPLATE.UPDATE]: {
    actionId: PERMISSION.TEMPLATE.UPDATE,
    name: 'Update',
    description: 'Update and request review template',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TEMPLATE.DELETE]: {
    actionId: PERMISSION.TEMPLATE.DELETE,
    name: 'Delete',
    description: 'Delete template',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TEMPLATE.BACK_OFFICE_REVIEW]: {
    actionId: PERMISSION.TEMPLATE.BACK_OFFICE_REVIEW,
    name: 'Review & Approve',
    description:
      'This action using only for Back Office approve or reject template.',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_USER_MANAGEMENT: Record<number, ActionDescription> = {
  [PERMISSION.USER_MANAGEMENT.READ]: {
    actionId: PERMISSION.USER_MANAGEMENT.READ,
    name: 'Read',
    description: 'View list users.',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.USER_MANAGEMENT.CREATE]: {
    actionId: PERMISSION.USER_MANAGEMENT.CREATE,
    name: 'Invite user',
    description: 'Invite user join to company system',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.USER_MANAGEMENT.UPDATE]: {
    actionId: PERMISSION.USER_MANAGEMENT.UPDATE,
    name: 'Update',
    description: 'Update user information',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.USER_MANAGEMENT.DELETE]: {
    actionId: PERMISSION.USER_MANAGEMENT.DELETE,
    name: 'Delete',
    description: 'Delete user',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.USER_MANAGEMENT.DISABLE]: {
    actionId: PERMISSION.USER_MANAGEMENT.DISABLE,
    name: 'Active or disable User',
    description: '',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_BULK_CAMPAIGN: Record<number, ActionDescription> = {
  [PERMISSION.BULK_CAMPAIGN.READ]: {
    actionId: PERMISSION.BULK_CAMPAIGN.READ,
    name: 'Read',
    description:
      'View list bulk campaign, admin or BO can user all bulk campaign of other company for support.',
    enableType: true,
  },
  [PERMISSION.BULK_CAMPAIGN.CREATE]: {
    actionId: PERMISSION.BULK_CAMPAIGN.CREATE,
    name: 'Create',
    description: 'Only owner can create their own bulk campaign',
    enableType: true,
    listType: OwnerTypeList,
  },
  [PERMISSION.BULK_CAMPAIGN.UPDATE]: {
    actionId: PERMISSION.BULK_CAMPAIGN.UPDATE,
    name: 'Update',
    description: 'Update bulk campaign',
    enableType: true,
  },
  [PERMISSION.BULK_CAMPAIGN.DELETE]: {
    actionId: PERMISSION.BULK_CAMPAIGN.DELETE,
    name: 'Delete',
    description: 'Delete bulk campaign',
    enableType: true,
  },
  [PERMISSION.BULK_CAMPAIGN.DELETE_CONTACT]: {
    actionId: PERMISSION.BULK_CAMPAIGN.DELETE_CONTACT,
    name: 'Delete Bulk Contact',
    description: 'Delete bulk contact with different condition',
    enableType: true,
  },
};

export const PERMISSION_BLACK_LIST: Record<number, ActionDescription> = {
  [PERMISSION.BLACK_LIST.READ]: {
    actionId: PERMISSION.BLACK_LIST.READ,
    name: 'Read',
    description: 'View list black phone of all channel.',
    enableType: true,
  },
  [PERMISSION.BLACK_LIST.CREATE]: {
    actionId: PERMISSION.BLACK_LIST.CREATE,
    name: 'Create',
    enableType: true,
  },
  [PERMISSION.BLACK_LIST.UPDATE]: {
    actionId: PERMISSION.BLACK_LIST.UPDATE,
    name: 'Update',
    enableType: true,
  },
  [PERMISSION.BLACK_LIST.DELETE]: {
    actionId: PERMISSION.BLACK_LIST.DELETE,
    name: 'Delete',
    enableType: true,
  },
  [PERMISSION.BLACK_LIST.GLOBAL]: {
    actionId: PERMISSION.BLACK_LIST.GLOBAL,
    name: 'Manage Global Blacklist',
    description:
      'Create, Update, Delete global black list, apply for whole system, only for BO or Admin',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_LABEL_LIST: Record<number, ActionDescription> = {
  [PERMISSION.LABEL.READ]: {
    actionId: PERMISSION.LABEL.READ,
    name: 'Read',
    description: 'Read all Label of company.',
    enableType: false,
  },
  [PERMISSION.LABEL.CREATE]: {
    actionId: PERMISSION.LABEL.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.LABEL.UPDATE]: {
    actionId: PERMISSION.LABEL.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.LABEL.DELETE]: {
    actionId: PERMISSION.LABEL.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_CHAT_LIST: Record<number, ActionDescription> = {
  [PERMISSION.CHAT.READ]: {
    actionId: PERMISSION.CHAT.READ,
    name: 'Read',
    description: 'Read all Conversation of company.',
    enableType: false,
  },
  [PERMISSION.CHAT.LIVE_AGENT]: {
    actionId: PERMISSION.CHAT.LIVE_AGENT,
    name: 'Join or Leave conversation',
    enableType: false,
  },
  [PERMISSION.CHAT.DASHBOARD]: {
    actionId: PERMISSION.CHAT.DASHBOARD,
    name: 'View summary about conversation',
    enableType: false,
  },
};

export const PERMISSION_COMPLIANCE_LIST: Record<number, ActionDescription> = {
  [PERMISSION.COMPLIANCE.READ]: {
    actionId: PERMISSION.COMPLIANCE.READ,
    name: 'Read',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPLIANCE.CREATE]: {
    actionId: PERMISSION.COMPLIANCE.CREATE,
    name: 'Create',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPLIANCE.UPDATE]: {
    actionId: PERMISSION.COMPLIANCE.UPDATE,
    name: 'Update',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.COMPLIANCE.DELETE]: {
    actionId: PERMISSION.COMPLIANCE.DELETE,
    name: 'Delete',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_LEAD_LIST: Record<number, ActionDescription> = {
  [PERMISSION.LEAD.READ]: {
    actionId: PERMISSION.LEAD.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.LEAD.CREATE]: {
    actionId: PERMISSION.LEAD.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.LEAD.UPDATE]: {
    actionId: PERMISSION.LEAD.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.LEAD.DELETE]: {
    actionId: PERMISSION.LEAD.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

/**
 * Manage Template Library using for whole system. Only for BO or Admin
 */
export const PERMISSION_TEMPLATE_LIBRARY_LIST: Record<
  number,
  ActionDescription
> = {
  [PERMISSION.TEMPLATE_LIBRARY.CREATE]: {
    actionId: PERMISSION.TEMPLATE_LIBRARY.CREATE,
    name: 'Create',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.TEMPLATE_LIBRARY.UPDATE]: {
    actionId: PERMISSION.TEMPLATE_LIBRARY.UPDATE,
    name: 'Update',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.TEMPLATE_LIBRARY.DELETE]: {
    actionId: PERMISSION.TEMPLATE_LIBRARY.DELETE,
    name: 'Delete',
    enableType: true,
    listType: BoAdminTypeList,
  },
};

export const PERMISSION_DASHBOARD_LIST: Record<number, ActionDescription> = {
  [PERMISSION.DASHBOARD.REPORT_BALANCE_CHANNEL]: {
    actionId: PERMISSION.DASHBOARD.REPORT_BALANCE_CHANNEL,
    name: 'Summary of Company balance and channel',
    description: 'This is using only for company, not for BO or Admin',
    enableType: false,
  },
  [PERMISSION.DASHBOARD.REPORT_OFFICIAL_ACCOUNT]: {
    actionId: PERMISSION.DASHBOARD.REPORT_OFFICIAL_ACCOUNT,
    name: 'Summary of each Official Account',
    description: 'View OA information like last send, receive, delivered',
    enableType: true,
    listType: BoAdminCompanyTypeList,
  },
  [PERMISSION.DASHBOARD.REPORT_COMPANY]: {
    actionId: PERMISSION.DASHBOARD.REPORT_COMPANY,
    name: 'Tracking company activities',
    enableType: true,
    listType: BoAdminTypeList,
  },
  [PERMISSION.DASHBOARD.REPORT_BULK_CAMPAIGN]: {
    actionId: PERMISSION.DASHBOARD.REPORT_BULK_CAMPAIGN,
    name: 'View bulk campaign report detail on dashboard',
    enableType: true,
  },
};

export const PERMISSION_BILLING_CDR_LIST: Record<number, ActionDescription> = {
  [PERMISSION.BILLING_CDR.CREATE]: {
    actionId: PERMISSION.BILLING_CDR.CREATE,
    name: 'Create',
    enableType: true,
    listType: [...OwnerTypeList, ...BoAdminTypeList],
  },
  [PERMISSION.BILLING_CDR.READ]: {
    actionId: PERMISSION.BILLING_CDR.READ,
    name: 'Read',
    enableType: true,
  },
  [PERMISSION.BILLING_CDR.DELETE]: {
    actionId: PERMISSION.BILLING_CDR.DELETE,
    name: 'Delete',
    enableType: true,
  },
  [PERMISSION.BILLING_CDR.SETTING]: {
    actionId: PERMISSION.BILLING_CDR.SETTING,
    name: 'Setting',
    enableType: false,
  },
};

export const PERMISSION_API_KEY_LIST: Record<number, ActionDescription> = {
  [PERMISSION.API_KEY.CREATE]: {
    actionId: PERMISSION.API_KEY.CREATE,
    name: 'Create',
    enableType: true,
    listType: OwnerTypeList,
  },
  [PERMISSION.API_KEY.READ]: {
    actionId: PERMISSION.API_KEY.READ,
    name: 'Read',
    enableType: true,
    listType: OwnerOrCompanyTypeList,
  },
  [PERMISSION.API_KEY.DELETE]: {
    actionId: PERMISSION.API_KEY.DELETE,
    name: 'Delete',
    enableType: true,
    listType: OwnerOrCompanyTypeList,
  },
  [PERMISSION.API_KEY.UPDATE]: {
    actionId: PERMISSION.API_KEY.UPDATE,
    name: 'Update',
    enableType: true,
    listType: OwnerOrCompanyTypeList,
  },
};

/**
 * Customer is created by conversation.
 * At the moment, we not yet allow manage by ACL, but in future can be.
 * If allowed, we will do similar ticket
 */
export const PERMISSION_CUSTOMER_LIST: Record<number, ActionDescription> = {
  [PERMISSION.CUSTOMER.CREATE]: {
    actionId: PERMISSION.CUSTOMER.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.CUSTOMER.READ]: {
    actionId: PERMISSION.CUSTOMER.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.CUSTOMER.DELETE]: {
    actionId: PERMISSION.CUSTOMER.DELETE,
    name: 'Delete',
    enableType: false,
  },
  [PERMISSION.CUSTOMER.UPDATE]: {
    actionId: PERMISSION.CUSTOMER.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.CUSTOMER.SETTING]: {
    actionId: PERMISSION.CUSTOMER.SETTING,
    name: 'Setting',
    enableType: false,
  },
};

export const PERMISSION_TICKET_LIST: Record<number, ActionDescription> = {
  [PERMISSION.TICKET.CREATE]: {
    actionId: PERMISSION.TICKET.CREATE,
    name: 'Create',
    enableType: true,
    description: 'Now not yet support any place for create ticket',
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.READ]: {
    actionId: PERMISSION.TICKET.READ,
    name: 'Read',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.UPDATE]: {
    actionId: PERMISSION.TICKET.UPDATE,
    name: 'Update',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.DELETE]: {
    actionId: PERMISSION.TICKET.DELETE,
    name: 'Delete',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.ASSIGN]: {
    actionId: PERMISSION.TICKET.ASSIGN,
    name: 'Assign',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.TRANSFER]: {
    actionId: PERMISSION.TICKET.TRANSFER,
    name: 'Transfer',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.DASHBOARD]: {
    actionId: PERMISSION.TICKET.DASHBOARD,
    name: 'Summary of ticket, and agent',
    enableType: false,
  },
  [PERMISSION.TICKET.CREATE_PIN]: {
    actionId: PERMISSION.TICKET.CREATE_PIN,
    name: 'Create Pin',
    enableType: true,
    description: 'Create ticket pin',
    listType: CompanyTypeList,
  },
  [PERMISSION.TICKET.DELETE_PIN]: {
    actionId: PERMISSION.TICKET.DELETE_PIN,
    name: 'Delete Pin',
    enableType: true,
    description: 'Delete ticket pin',
    listType: CompanyTypeList,
  },
};

export const PERMISSION_AGENT_GROUP_LIST: Record<number, ActionDescription> = {
  [PERMISSION.AGENT_GROUP.CREATE]: {
    actionId: PERMISSION.AGENT_GROUP.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.AGENT_GROUP.READ]: {
    actionId: PERMISSION.AGENT_GROUP.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.AGENT_GROUP.UPDATE]: {
    actionId: PERMISSION.AGENT_GROUP.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.AGENT_GROUP.DELETE]: {
    actionId: PERMISSION.AGENT_GROUP.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_TICKET_CATEGORY_LIST: Record<
  number,
  ActionDescription
> = {
  [PERMISSION.TICKET_CATEGORY.CREATE]: {
    actionId: PERMISSION.TICKET_CATEGORY.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.TICKET_CATEGORY.READ]: {
    actionId: PERMISSION.TICKET_CATEGORY.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.TICKET_CATEGORY.UPDATE]: {
    actionId: PERMISSION.TICKET_CATEGORY.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.TICKET_CATEGORY.DELETE]: {
    actionId: PERMISSION.TICKET_CATEGORY.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_SEGMENT_LIST: Record<number, ActionDescription> = {
  [PERMISSION.SEGMENT.CREATE]: {
    actionId: PERMISSION.SEGMENT.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.SEGMENT.READ]: {
    actionId: PERMISSION.SEGMENT.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.SEGMENT.UPDATE]: {
    actionId: PERMISSION.SEGMENT.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.SEGMENT.DELETE]: {
    actionId: PERMISSION.SEGMENT.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_PRODUCT_LIST: Record<number, ActionDescription> = {
  [PERMISSION.PRODUCT.CREATE]: {
    actionId: PERMISSION.PRODUCT.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.PRODUCT.READ]: {
    actionId: PERMISSION.PRODUCT.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.PRODUCT.UPDATE]: {
    actionId: PERMISSION.PRODUCT.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.PRODUCT.DELETE]: {
    actionId: PERMISSION.PRODUCT.DELETE,
    name: 'Delete',
    enableType: false,
  },
  [PERMISSION.PRODUCT.SETTING]: {
    actionId: PERMISSION.PRODUCT.SETTING,
    name: 'Setting',
    enableType: false,
  },
};

export const PERMISSION_PRODUCT_CATEGORY_LIST: Record<
  number,
  ActionDescription
> = {
  [PERMISSION.PRODUCT_CATEGORY.CREATE]: {
    actionId: PERMISSION.PRODUCT_CATEGORY.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.PRODUCT_CATEGORY.READ]: {
    actionId: PERMISSION.PRODUCT_CATEGORY.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.PRODUCT_CATEGORY.UPDATE]: {
    actionId: PERMISSION.PRODUCT_CATEGORY.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.PRODUCT_CATEGORY.DELETE]: {
    actionId: PERMISSION.PRODUCT_CATEGORY.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_INVOICE_LIST: Record<number, ActionDescription> = {
  [PERMISSION.INVOICE.CREATE]: {
    actionId: PERMISSION.INVOICE.CREATE,
    name: 'Create',
    enableType: true,
    listType: OwnerTypeList,
  },
  [PERMISSION.INVOICE.READ]: {
    actionId: PERMISSION.INVOICE.READ,
    name: 'Read',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.INVOICE.UPDATE]: {
    actionId: PERMISSION.INVOICE.UPDATE,
    name: 'Update',
    enableType: true,
    listType: CompanyTypeList,
  },
  [PERMISSION.INVOICE.DELETE]: {
    actionId: PERMISSION.INVOICE.DELETE,
    name: 'Delete',
    enableType: true,
    listType: CompanyTypeList,
  },
};

export const PERMISSION_BRANCH_LIST: Record<number, ActionDescription> = {
  [PERMISSION.BRANCH.CREATE]: {
    actionId: PERMISSION.BRANCH.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.BRANCH.READ]: {
    actionId: PERMISSION.BRANCH.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.BRANCH.UPDATE]: {
    actionId: PERMISSION.BRANCH.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.BRANCH.DELETE]: {
    actionId: PERMISSION.BRANCH.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_REPLY_TEMPLATE_LIST: Record<number, ActionDescription> =
  {
    [PERMISSION.REPLY_TEMPLATE.CREATE]: {
      actionId: PERMISSION.REPLY_TEMPLATE.CREATE,
      name: 'Create',
      enableType: true,
      listType: OwnerTypeList,
    },
    [PERMISSION.REPLY_TEMPLATE.READ]: {
      actionId: PERMISSION.REPLY_TEMPLATE.READ,
      name: 'Read',
      enableType: true,
      listType: OwnerOrCompanyTypeList,
    },
    [PERMISSION.REPLY_TEMPLATE.UPDATE]: {
      actionId: PERMISSION.REPLY_TEMPLATE.UPDATE,
      name: 'Update',
      enableType: true,
      listType: OwnerOrCompanyTypeList,
    },
    [PERMISSION.REPLY_TEMPLATE.DELETE]: {
      actionId: PERMISSION.REPLY_TEMPLATE.DELETE,
      name: 'Delete',
      enableType: true,
      listType: OwnerOrCompanyTypeList,
    },
  };

export const PERMISSION_COMPANY_ROLE_LIST: Record<number, ActionDescription> = {
  [PERMISSION.COMPANY_ROLE.CREATE]: {
    actionId: PERMISSION.COMPANY_ROLE.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.COMPANY_ROLE.READ]: {
    actionId: PERMISSION.COMPANY_ROLE.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.COMPANY_ROLE.UPDATE]: {
    actionId: PERMISSION.COMPANY_ROLE.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.COMPANY_ROLE.DELETE]: {
    actionId: PERMISSION.COMPANY_ROLE.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_COMPANY_MEMBER_LIST: Record<number, ActionDescription> =
  {
    [PERMISSION.COMPANY_MEMBER.CREATE]: {
      actionId: PERMISSION.COMPANY_MEMBER.CREATE,
      name: 'Create',
      enableType: false,
    },
    [PERMISSION.COMPANY_MEMBER.READ]: {
      actionId: PERMISSION.COMPANY_MEMBER.READ,
      name: 'Read',
      enableType: false,
    },
    [PERMISSION.COMPANY_MEMBER.UPDATE]: {
      actionId: PERMISSION.COMPANY_MEMBER.UPDATE,
      name: 'Update',
      enableType: false,
    },
    [PERMISSION.COMPANY_MEMBER.DELETE]: {
      actionId: PERMISSION.COMPANY_MEMBER.DELETE,
      name: 'Delete',
      enableType: false,
    },
    [PERMISSION.COMPANY_MEMBER.SETTING]: {
      actionId: PERMISSION.COMPANY_MEMBER.SETTING,
      name: 'Setting',
      enableType: false,
    },
    [PERMISSION.COMPANY_MEMBER.DISABLE]: {
      actionId: PERMISSION.COMPANY_MEMBER.DISABLE,
      name: 'Disable',
      enableType: false,
    },
  };

export const PERMISSION_CRM_PROFILE_LIST: Record<number, ActionDescription> = {
  [PERMISSION.CRM_PROFILE.CREATE]: {
    actionId: PERMISSION.CRM_PROFILE.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.CRM_PROFILE.READ]: {
    actionId: PERMISSION.CRM_PROFILE.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.CRM_PROFILE.UPDATE]: {
    actionId: PERMISSION.CRM_PROFILE.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.CRM_PROFILE.DELETE]: {
    actionId: PERMISSION.CRM_PROFILE.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_SLA_LIST: Record<number, ActionDescription> = {
  [PERMISSION.SLA.CREATE]: {
    actionId: PERMISSION.SLA.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.SLA.READ]: {
    actionId: PERMISSION.SLA.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.SLA.UPDATE]: {
    actionId: PERMISSION.SLA.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.SLA.DELETE]: {
    actionId: PERMISSION.SLA.DELETE,
    name: 'Delete',
    enableType: false,
  },
  [PERMISSION.SLA.SETTING]: {
    actionId: PERMISSION.SLA.SETTING,
    name: 'Setting',
    enableType: false,
  },
};

export const PERMISSION_CRM_BROADCAST: Record<number, ActionDescription> = {
  [PERMISSION.BROADCAST.CREATE]: {
    actionId: PERMISSION.BROADCAST.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.BROADCAST.READ]: {
    actionId: PERMISSION.BROADCAST.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.BROADCAST.UPDATE]: {
    actionId: PERMISSION.BROADCAST.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.BROADCAST.DELETE]: {
    actionId: PERMISSION.BROADCAST.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_AUDIT: Record<number, ActionDescription> = {
  [PERMISSION.AUDIT.READ]: {
    actionId: PERMISSION.AUDIT.READ,
    name: 'Audit',
    enableType: true,
    listType: [AclActionType.OWNER, AclActionType.FULL],
  },
};

export const PERMISSION_CRM_ORDER: Record<number, ActionDescription> = {
  [PERMISSION.ORDER.CREATE]: {
    actionId: PERMISSION.ORDER.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.ORDER.READ]: {
    actionId: PERMISSION.ORDER.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.ORDER.UPDATE]: {
    actionId: PERMISSION.ORDER.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.ORDER.DELETE]: {
    actionId: PERMISSION.ORDER.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_FUNCTION_TARIFF: Record<number, ActionDescription> = {
  [PERMISSION.FUNCTION_TARIFF.CREATE]: {
    actionId: PERMISSION.FUNCTION_TARIFF.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.FUNCTION_TARIFF.READ]: {
    actionId: PERMISSION.FUNCTION_TARIFF.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.FUNCTION_TARIFF.DELETE]: {
    actionId: PERMISSION.FUNCTION_TARIFF.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_COMPANY_FUNCTION: Record<number, ActionDescription> = {
  [PERMISSION.COMPANY_FUNCTION.CREATE]: {
    actionId: PERMISSION.COMPANY_FUNCTION.CREATE,
    name: 'Create',
    enableType: false,
  },
  [PERMISSION.COMPANY_FUNCTION.READ]: {
    actionId: PERMISSION.COMPANY_FUNCTION.READ,
    name: 'Read',
    enableType: false,
  },
  [PERMISSION.COMPANY_FUNCTION.UPDATE]: {
    actionId: PERMISSION.COMPANY_FUNCTION.UPDATE,
    name: 'Update',
    enableType: false,
  },
  [PERMISSION.COMPANY_FUNCTION.DELETE]: {
    actionId: PERMISSION.COMPANY_FUNCTION.DELETE,
    name: 'Delete',
    enableType: false,
  },
};

export const PERMISSION_CHANNEL: Record<number, ActionDescription> = {
  [PERMISSION.CHANNEL.REQUEST]: {
    actionId: PERMISSION.CHANNEL.REQUEST,
    name: 'Request',
    enableType: false,
  },
  [PERMISSION.CHANNEL.READ]: {
    actionId: PERMISSION.CHANNEL.READ,
    name: 'Channel READ',
    enableType: true,
    listType: BoAdminCompanyTypeList
  },
  [PERMISSION.CHANNEL.UPDATE]: {
    actionId: PERMISSION.CHANNEL.UPDATE,
    name: 'Channel READ',
    enableType: true,
    listType: BoAdminCompanyTypeList
  },
  [PERMISSION.CHANNEL.DELETE]: {
    actionId: PERMISSION.CHANNEL.UPDATE,
    name: 'Channel READ',
    enableType: true,
    listType: BoAdminCompanyTypeList
  },
  [PERMISSION.CHANNEL.LIVE_MESSAGE]: {
    actionId: PERMISSION.CHANNEL.UPDATE,
    name: 'View live message',
    enableType: true,
    listType: BoAdminCompanyTypeList
  },
};

export const PERMISSION_SYSTEM: Record<number, ActionDescription> = {
  [PERMISSION.SYSTEM_SETTING.LADING_PAGE]: {
    actionId: PERMISSION.SYSTEM_SETTING.LADING_PAGE,
    name: 'Setting and update landing page',
    enableType: true,
    listType: [AclActionType.SYSTEM_ADMIN],
  },
  [PERMISSION.SYSTEM_SETTING.CDR]: {
    actionId: PERMISSION.SYSTEM_SETTING.CDR,
    name: 'View and download carrier CDR',
    enableType: true,
    listType: [AclActionType.SYSTEM_ADMIN],
  }
}
