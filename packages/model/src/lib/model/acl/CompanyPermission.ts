import { AclActionType, PERMISSION } from './Permission';

/**
 * Default permission for Company Master
 * @type {(number)[]}
 */
export const LIST_MASTER_COMPANY_PERMISSION = [
  // Bulk Campaign
  { permission: PERMISSION.BULK_CAMPAIGN.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.BULK_CAMPAIGN.READ, type: AclActionType.FULL },
  { permission: PERMISSION.BULK_CAMPAIGN.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.BULK_CAMPAIGN.DELETE, type: AclActionType.FULL },
  {
    permission: PERMISSION.BULK_CAMPAIGN.DELETE_CONTACT,
    type: AclActionType.FULL,
  },
  // Company Member
  { permission: PERMISSION.COMPANY_MEMBER.READ, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_MEMBER.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_MEMBER.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_MEMBER.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_MEMBER.DISABLE, type: AclActionType.FULL },
  // Company ROLE
  { permission: PERMISSION.COMPANY_ROLE.READ, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_ROLE.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_ROLE.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.COMPANY_ROLE.DELETE, type: AclActionType.FULL },
  // Company BRANCH
  { permission: PERMISSION.BRANCH.READ, type: AclActionType.FULL },
  { permission: PERMISSION.BRANCH.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.BRANCH.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.BRANCH.DELETE, type: AclActionType.FULL },
  // TEMPLATE
  { permission: PERMISSION.TEMPLATE.READ, type: AclActionType.FULL },
  { permission: PERMISSION.TEMPLATE.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.TEMPLATE.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.TEMPLATE.DELETE, type: AclActionType.FULL },
  // BILLING
  { permission: PERMISSION.BILLING_CDR.READ, type: AclActionType.FULL },
  { permission: PERMISSION.BILLING_CDR.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.BILLING_CDR.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.BILLING_CDR.SETTING, type: AclActionType.FULL },
  // CONTACT
  { permission: PERMISSION.CONTACT.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.CONTACT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.CONTACT.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.CONTACT.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.OFFICIAL_ACCOUNT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.CHANNEL.REQUEST, type: AclActionType.FULL },
  { permission: PERMISSION.CHANNEL.READ, type: AclActionType.FULL },
  { permission: PERMISSION.OFFICIAL_ACCOUNT.SETTING, type: AclActionType.FULL },
  // OWN COMPANY
  { permission: PERMISSION.OWN_COMPANY.PROFILE, type: AclActionType.FULL },
  // BOT
  { permission: PERMISSION.BOT.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.BOT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.BOT.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.BOT.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.BOT.SETTING, type: AclActionType.FULL },
  // DASHBOARD
  {
    permission: PERMISSION.DASHBOARD.REPORT_OFFICIAL_ACCOUNT,
    type: AclActionType.FULL,
  },
  {
    permission: PERMISSION.DASHBOARD.REPORT_BALANCE_CHANNEL,
    type: AclActionType.FULL,
  },
  {
    permission: PERMISSION.DASHBOARD.REPORT_BULK_CAMPAIGN,
    type: AclActionType.FULL,
  },
  { permission: PERMISSION.DASHBOARD.REPORT_COMPANY, type: AclActionType.FULL },
  { permission: PERMISSION.LABEL.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.LABEL.READ, type: AclActionType.FULL },
  { permission: PERMISSION.LABEL.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.LABEL.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.API_KEY.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.API_KEY.READ, type: AclActionType.FULL },
  { permission: PERMISSION.API_KEY.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.API_KEY.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.SLA.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.SLA.READ, type: AclActionType.FULL },
  { permission: PERMISSION.SLA.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.SLA.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.SLA.SETTING, type: AclActionType.FULL },
  /* CRM */
  { permission: PERMISSION.CUSTOMER.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.CUSTOMER.READ, type: AclActionType.FULL },
  { permission: PERMISSION.CUSTOMER.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.CUSTOMER.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.READ, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.ASSIGN, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.TRANSFER, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.DASHBOARD, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.CREATE_PIN, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET.DELETE_PIN, type: AclActionType.FULL },
  { permission: PERMISSION.AGENT_GROUP.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.AGENT_GROUP.READ, type: AclActionType.FULL },
  { permission: PERMISSION.AGENT_GROUP.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.AGENT_GROUP.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET_CATEGORY.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET_CATEGORY.READ, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET_CATEGORY.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.TICKET_CATEGORY.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.SEGMENT.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.SEGMENT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.SEGMENT.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.SEGMENT.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT_CATEGORY.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT_CATEGORY.READ, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT_CATEGORY.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.PRODUCT_CATEGORY.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.INVOICE.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.INVOICE.READ, type: AclActionType.FULL },
  { permission: PERMISSION.INVOICE.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.INVOICE.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.REPLY_TEMPLATE.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.REPLY_TEMPLATE.READ, type: AclActionType.FULL },
  { permission: PERMISSION.REPLY_TEMPLATE.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.REPLY_TEMPLATE.DELETE, type: AclActionType.FULL },
  /* LEAD */
  { permission: PERMISSION.LEAD.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.LEAD.READ, type: AclActionType.FULL },
  { permission: PERMISSION.LEAD.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.LEAD.DELETE, type: AclActionType.FULL },
  /* PAYMENT */
  { permission: PERMISSION.PAYMENT.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.PAYMENT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.PAYMENT.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.PAYMENT.DELETE, type: AclActionType.FULL },
  { permission: PERMISSION.PAYMENT.SETTING, type: AclActionType.FULL },
  /* */
  { permission: PERMISSION.BLACK_LIST.READ, type: AclActionType.FULL },
  /* Audit: Master can read all user audit, user normal can read their own audit */
  { permission: PERMISSION.AUDIT.READ, type: AclActionType.FULL },
  /* Broadcast */
  { permission: PERMISSION.BROADCAST.READ, type: AclActionType.FULL },
  { permission: PERMISSION.BROADCAST.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.BROADCAST.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.BROADCAST.DELETE, type: AclActionType.FULL },
  /* ORDER */
  { permission: PERMISSION.ORDER.CREATE, type: AclActionType.FULL },
  { permission: PERMISSION.ORDER.READ, type: AclActionType.FULL },
  { permission: PERMISSION.ORDER.UPDATE, type: AclActionType.FULL },
  { permission: PERMISSION.ORDER.DELETE, type: AclActionType.FULL },
  /* COMPANY_FUNCTION */
  { permission: PERMISSION.COMPANY_FUNCTION.READ, type: AclActionType.FULL },
  /* CHAT */
  { permission: PERMISSION.CHAT.READ, type: AclActionType.FULL },
  { permission: PERMISSION.CHAT.LIVE_AGENT, type: AclActionType.FULL },
  { permission: PERMISSION.CHAT.DASHBOARD, type: AclActionType.FULL }
];
