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

export enum SearchOP {
  or = 'or',
  and = 'and',
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  range = 'range',
  not = 'not',
}

export interface SearchObject {
  value: string | number | Array<string | number>;
  op: SearchOP;
}

export interface SearchDomainQuery {
  search: string;
  page: number; // start from 0
  size: number;
  sorts: string[]; // [field:asc|desc]
  filters: {
    [field: string]: string | number | SearchObject;
  };
}
