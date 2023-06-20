export enum TemplateMessageStatus {
  NORMAL = 0,
  START = 1,
  COMPLETE = 2,
  ERROR,
}

export enum TEMPLATE_TYPE {
  BROADCAST_ONLY = 1,
  CONVERSATION
}

export enum TemplateMessageScriptOP {
  GREATER = 1,
  GREATER_EQ = 2,
  SMALLER = 3,
  SMALLER_EQ = 4,
  EQUAL = 5,
  UNEQUAL = 6,
  HAS_TEXT = 7,
  EMPTY = 8,
  IS_NUMBER = 9,
  IS_PHONE = 10,
  IS_NOT_NUMBER = 11,
  IS_NOT_PHONE,
  LENGTH,
  IS_ARRAY_INDEX,
  IS_NOT_ARRAY_INDEX,
  CUSTOM = 100,
}

export enum TEMPLATE_MESSAGE_SCRIPT_DATA_TYPE {
  TEXT = 1,
  NUMBER
}

export enum TemplateApiEventPosition {
  BEFORE = 1,
  AFTER
}

export enum TemplateApiFailActionType {
  ShowErrorMessage = 1,
  NextQuestion
}

export enum OperatorType {
  FUNCTION = 1,
  COMPARISON = 2,
  FUNCTION_MULTIPLE_ARGS
}

export const MAPPING_OPERATOR_TYPE: Record<TemplateMessageScriptOP, OperatorType> = {
  [TemplateMessageScriptOP.EQUAL]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.UNEQUAL]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.GREATER]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.GREATER_EQ]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.SMALLER]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.SMALLER_EQ]: OperatorType.COMPARISON,
  [TemplateMessageScriptOP.HAS_TEXT]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.EMPTY]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.IS_NUMBER]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.IS_NOT_NUMBER]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.IS_PHONE]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.IS_NOT_PHONE]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.CUSTOM]: OperatorType.FUNCTION,
  [TemplateMessageScriptOP.LENGTH]: OperatorType.FUNCTION_MULTIPLE_ARGS,
  [TemplateMessageScriptOP.IS_ARRAY_INDEX]: OperatorType.FUNCTION_MULTIPLE_ARGS,
  [TemplateMessageScriptOP.IS_NOT_ARRAY_INDEX]: OperatorType.FUNCTION_MULTIPLE_ARGS
}

export const MAPPING_OPERATOR: Record<TemplateMessageScriptOP, string> = {
  [TemplateMessageScriptOP.EQUAL]: "===",
  [TemplateMessageScriptOP.UNEQUAL]: "!==",
  [TemplateMessageScriptOP.GREATER]: ">",
  [TemplateMessageScriptOP.GREATER_EQ]: ">=",
  [TemplateMessageScriptOP.SMALLER]: "<",
  [TemplateMessageScriptOP.SMALLER_EQ]: "<=",
  [TemplateMessageScriptOP.HAS_TEXT]: "hasText",
  [TemplateMessageScriptOP.EMPTY]: "isEmpty",
  [TemplateMessageScriptOP.IS_NUMBER]: "isNumber",
  [TemplateMessageScriptOP.IS_PHONE]: "isPhone",
  [TemplateMessageScriptOP.IS_NUMBER]: "isNumber",
  [TemplateMessageScriptOP.IS_PHONE]: "isPhone",
  [TemplateMessageScriptOP.CUSTOM]: "script",
  [TemplateMessageScriptOP.IS_NOT_NUMBER]: "isNotNumber",
  [TemplateMessageScriptOP.IS_NOT_PHONE]: "isNotPhone",
  [TemplateMessageScriptOP.LENGTH]: "length",
  [TemplateMessageScriptOP.IS_ARRAY_INDEX]: "isArrayItem",
  [TemplateMessageScriptOP.IS_NOT_ARRAY_INDEX]: "isNotArrayItem"
}
