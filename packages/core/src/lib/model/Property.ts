
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
      return "NUMBER"
    case TYPE_PROPERTY.TEXT:
      return "TEXT"
    case TYPE_PROPERTY.DATE:
      return "DATE"
    case TYPE_PROPERTY.SELECT:
      return "SELECT"
    default:
      return ""
  }
}

export enum CONDITION {
  AND = "1",
  OR = "2",
}

export enum SegmentType {
  GROUP,
  FIELD,
}

export enum PROPERTY_OPERATION {
  IS_EQUAL,
  IS_NOT_EQUAL,
  CONTAINS,
  DOES_NOT_CONTAIN,
  BEGINS_WITH,
  DOES_NOT_BEGIN_WITH,
  ENDS_WITH,
  DOES_NOT_AND_WITH,
  NO_VALUE_SET,
  VALUE_IS_SET,
  IS_LESS,
  IS_LESS_OR_EQUAL,
  IS_GREATER,
  IS_GREATER_OR_EQUAL
}
