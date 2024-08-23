export enum PURPOSE_PROPERTY {
  CUSTOMER = 1,
  PRODUCT = 2,
  BROADCAST = 3,
  ORDER = 4,
  ORDER_DETAIL = 5
}

export enum TYPE_PROPERTY {
  NUMBER = 1,
  TEXT = 2,
  DATE = 3,
  SELECT = 4,
  SELECT_SINGLE
}

export const typePropertyStr = (id: TYPE_PROPERTY | null) => {
  switch (id) {
    case TYPE_PROPERTY.NUMBER:
      return "NUMBER";
    case TYPE_PROPERTY.TEXT:
      return "TEXT";
    case TYPE_PROPERTY.DATE:
      return "DATE";
    case TYPE_PROPERTY.SELECT:
      return "SELECT";
    default:
      return "";
  }
};

export enum CONDITION {
  AND = 1,
  OR = 2,
}

export enum SegmentType {
  GROUP = 1,
  FIELD = 2,
}

export enum PROPERTY_OPERATION {
  IS_EQUAL = 1,
  IS_NOT_EQUAL = 2,
  CONTAINS = 3,
  DOES_NOT_CONTAIN = 4,
  BEGINS_WITH = 5,
  DOES_NOT_BEGIN_WITH = 6,
  ENDS_WITH = 7,
  DOES_NOT_END_WITH = 8,
  NO_VALUE_SET = 9,
  VALUE_IS_SET = 10,
  IS_LESS = 11,
  IS_LESS_OR_EQUAL = 12,
  IS_GREATER = 13,
  IS_GREATER_OR_EQUAL = 14
}

export const PROPERTY_TYPE_OPERATION: Record<TYPE_PROPERTY, Array<PROPERTY_OPERATION>> = {
  [TYPE_PROPERTY.TEXT]: [
    PROPERTY_OPERATION.IS_EQUAL,
    PROPERTY_OPERATION.IS_NOT_EQUAL,
    PROPERTY_OPERATION.CONTAINS,
    PROPERTY_OPERATION.DOES_NOT_CONTAIN,
    PROPERTY_OPERATION.BEGINS_WITH,
    PROPERTY_OPERATION.DOES_NOT_BEGIN_WITH,
    PROPERTY_OPERATION.ENDS_WITH,
    PROPERTY_OPERATION.DOES_NOT_END_WITH,
    PROPERTY_OPERATION.NO_VALUE_SET,
    PROPERTY_OPERATION.VALUE_IS_SET
  ],
  [TYPE_PROPERTY.NUMBER]: [
    PROPERTY_OPERATION.IS_EQUAL,
    PROPERTY_OPERATION.IS_NOT_EQUAL,
    PROPERTY_OPERATION.NO_VALUE_SET,
    PROPERTY_OPERATION.VALUE_IS_SET,
    PROPERTY_OPERATION.IS_GREATER,
    PROPERTY_OPERATION.IS_GREATER_OR_EQUAL,
    PROPERTY_OPERATION.IS_LESS,
    PROPERTY_OPERATION.IS_LESS_OR_EQUAL,
  ],
  [TYPE_PROPERTY.DATE]: [
    PROPERTY_OPERATION.IS_EQUAL,
    PROPERTY_OPERATION.IS_NOT_EQUAL,
    PROPERTY_OPERATION.NO_VALUE_SET,
    PROPERTY_OPERATION.VALUE_IS_SET,
    PROPERTY_OPERATION.IS_GREATER,
    PROPERTY_OPERATION.IS_GREATER_OR_EQUAL,
    PROPERTY_OPERATION.IS_LESS,
    PROPERTY_OPERATION.IS_LESS_OR_EQUAL
  ],
  [TYPE_PROPERTY.SELECT]: [
    PROPERTY_OPERATION.CONTAINS,
    PROPERTY_OPERATION.DOES_NOT_CONTAIN,
    PROPERTY_OPERATION.NO_VALUE_SET,
    PROPERTY_OPERATION.VALUE_IS_SET
  ],
  [TYPE_PROPERTY.SELECT_SINGLE]: [
    PROPERTY_OPERATION.IS_EQUAL,
    PROPERTY_OPERATION.IS_NOT_EQUAL,
    PROPERTY_OPERATION.NO_VALUE_SET,
    PROPERTY_OPERATION.VALUE_IS_SET
  ]
}
