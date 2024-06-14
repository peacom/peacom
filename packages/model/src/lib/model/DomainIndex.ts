export enum DomainIndexType {
  Customer = 'Customer',
  Ticket = 'Ticket',
  Conversation = 'Conversation',
  ConversationMessage = 'ConversationMessage',
}

export enum DomainIndexAction {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface SearchDomainQuery {
  search: string;
  page: number; // start from 0
  size: number;
  sort: string[]; // [field:asc|desc]
  filters: {
    [field: string]: string | number | object; // if value = object then use or operator
  };
}
