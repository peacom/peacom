export enum PURPOSE_PROPERTY {
  CUSTOMER = 1,
}


export enum TYPE_PROPERTY {
  NUMBER = 1,
  TEXT = 2,
  DATE = 3,
  SELECT = 4
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
  DOES_NOT_AND_WITH = 8,
  NO_VALUE_SET = 9,
  VALUE_IS_SET = 10,
  IS_LESS = 11,
  IS_LESS_OR_EQUAL = 12,
  IS_GREATER = 13,
  IS_GREATER_OR_EQUAL = 14
}
