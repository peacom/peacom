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

export enum FieldIndexType {
  DATE = 'date',
  DATE_ARRAY = 'date-array',
  STRING = 'string',
  STRING_ARRAY = 'string-array',
  DOUBLE = 'double',
  INTEGER = 'integer',
  INTEGER_ARRAY = 'integer-array',
}
