
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
