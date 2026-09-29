export enum TICKET_PRIORITY {
  LOW = 1,
  NORMAL = 2,
  HIGH = 3,
  URGENT = 4
}

export enum TICKET_STATUS {
  PENDING = 1,
  OPEN = 2,
  RESOLVE = 3,
  CLOSE,
  FORCE_CLOSE
}

export enum TICKET_REQUEST_TYPE {
  AGENT = 1,
  CUSTOMER = 2
}

/**
 * ticket_agent.role
 * Separate enum, NOT the same numbers as company_role.level.
 */
export enum TICKET_AGENT_ROLE {
  OWNER = 1,
  SUPPORT = 2, // Member
  TEAM_MANAGER = 3, // Team Manager of an agent group, assigned to the ticket by the owner
}

/** Support and Team Manager are both supporters: view, chat, reply to customer, leave */
export const isSupporterRole = (role?: number | null): boolean =>
  Number(role) === TICKET_AGENT_ROLE.SUPPORT || Number(role) === TICKET_AGENT_ROLE.TEAM_MANAGER;
