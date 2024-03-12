/**
 * Define Some Default Permission for basic ROLE
 */

import {AclActionType, PERMISSION} from "./Permission";

/**
 * Default permission for Agent, the user who can manage their own customer, live chat, ticket resolve
 * @type {(number)[]}
 */
export const LIST_AGENT_PERMISSION = [
  // Bulk Campaign
  {permission: PERMISSION.BULK_CAMPAIGN.READ, type: AclActionType.FULL},
  // Company ROLE
  {permission: PERMISSION.COMPANY_ROLE.READ, type: AclActionType.FULL},
  // Company BRANCH
  {permission: PERMISSION.BRANCH.READ, type: AclActionType.FULL},
  // TEMPLATE
  {permission: PERMISSION.TEMPLATE.READ, type: AclActionType.FULL},
  // BILLING
  // CONTACT
  {permission: PERMISSION.CONTACT.CREATE, type: AclActionType.OWNER},
  {permission: PERMISSION.CONTACT.READ, type: AclActionType.OWNER},
  {permission: PERMISSION.CONTACT.UPDATE, type: AclActionType.OWNER},
  {permission: PERMISSION.CONTACT.DELETE, type: AclActionType.OWNER},
  // OA CHANNEL
  {permission: PERMISSION.OFFICIAL_ACCOUNT.READ, type: AclActionType.FULL},
  // BOT
  {permission: PERMISSION.BOT.READ, type: AclActionType.FULL},
  // DASHBOARD
  {permission: PERMISSION.DASHBOARD.REPORT_OFFICIAL_ACCOUNT, type: AclActionType.FULL},
  {permission: PERMISSION.DASHBOARD.REPORT_BALANCE_CHANNEL, type: AclActionType.FULL},
  {permission: PERMISSION.DASHBOARD.REPORT_BULK_CAMPAIGN, type: AclActionType.FULL},
  {permission: PERMISSION.DASHBOARD.REPORT_COMPANY, type: AclActionType.FULL},
  {permission: PERMISSION.LABEL.CREATE, type: AclActionType.FULL},
  {permission: PERMISSION.LABEL.READ, type: AclActionType.FULL},
  {permission: PERMISSION.LABEL.UPDATE, type: AclActionType.FULL},
  {permission: PERMISSION.LABEL.DELETE, type: AclActionType.FULL},
  /* CRM */
  {permission: PERMISSION.CUSTOMER.CREATE, type: AclActionType.FULL},
  {permission: PERMISSION.CUSTOMER.READ, type: AclActionType.FULL},
  {permission: PERMISSION.CUSTOMER.UPDATE, type: AclActionType.FULL},
  /* TICKET */
  {permission: PERMISSION.TICKET.READ, type: AclActionType.OWNER},
  {permission: PERMISSION.TICKET.UPDATE, type: AclActionType.OWNER},
  {permission: PERMISSION.TICKET.TRANSFER, type: AclActionType.OWNER},
  {permission: PERMISSION.TICKET.DELETE_PIN, type: AclActionType.OWNER},
  {permission: PERMISSION.TICKET.CREATE_PIN, type: AclActionType.OWNER},
  {permission: PERMISSION.TICKET_CATEGORY.READ, type: AclActionType.FULL},
  /* SEGMENT */
  {permission: PERMISSION.PRODUCT.READ, type: AclActionType.FULL},
  {permission: PERMISSION.PRODUCT_CATEGORY.READ, type: AclActionType.FULL},
  {permission: PERMISSION.INVOICE.CREATE, type: AclActionType.OWNER},
  {permission: PERMISSION.INVOICE.READ, type: AclActionType.OWNER},
  {permission: PERMISSION.INVOICE.UPDATE, type: AclActionType.OWNER},
  {permission: PERMISSION.INVOICE.DELETE, type: AclActionType.OWNER},
  {permission: PERMISSION.REPLY_TEMPLATE.CREATE, type: AclActionType.OWNER},
  {permission: PERMISSION.REPLY_TEMPLATE.READ, type: AclActionType.FULL},
  {permission: PERMISSION.REPLY_TEMPLATE.UPDATE, type: AclActionType.OWNER},
  {permission: PERMISSION.REPLY_TEMPLATE.DELETE, type: AclActionType.OWNER},
  /* PAYMENT */
  /* */
  {permission: PERMISSION.BLACK_LIST.READ, type: AclActionType.FULL},
  /* Audit: Master can read all user audit, user normal can read their own audit */
  {permission: PERMISSION.AUDIT.READ, type: AclActionType.OWNER},
];
