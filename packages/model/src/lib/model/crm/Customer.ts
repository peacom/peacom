import {TYPE_PROPERTY} from "../Property";

export enum CUSTOMER_GENDER {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3
}

export enum CUSTOMER_SOURCE_TYPE {
  CHANNEL = 1,
  WEB = 2,
  IMPORT = 3
}

export enum CUSTOMER_ATTRIBUTE_PROPERTY_ID {
  AGE = -1,
  GENDER = -2,
  BIRTHDAY = -3,
  EMAIL = -4,
  PHONE = -5,
  COUNTRY = -6,
  LABEL = -7,
  NAME = -8,
  APPLICATION = -9,
  CHANNEL = -10
}

export const CUSTOMER_PROPERTY_LABEL_BLACK_LIST = [
  'gender', 'age', 'birthday', 'channel', 'label', 'email', 'phone', 'country', 'application'
]

export const CUSTOMER_PROPERTY_DEFAULT_LIST = [
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.GENDER, name: 'Gender',
    priority: 0,
    label: 'gender',
    type: TYPE_PROPERTY.NUMBER,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.BIRTHDAY, name: 'Birthday',
    priority: 0,
    label: 'birthday',
    type: TYPE_PROPERTY.DATE,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.EMAIL, name: 'Email',
    priority: 0,
    label: 'email',
    type: TYPE_PROPERTY.TEXT,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.PHONE, name: 'Phone',
    priority: 0,
    label: 'phone',
    type: TYPE_PROPERTY.TEXT,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.COUNTRY, name: 'Country',
    priority: 0,
    label: 'country',
    type: TYPE_PROPERTY.NUMBER,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.LABEL, name: 'Label',
    priority: 0,
    label: 'label',
    type: TYPE_PROPERTY.SELECT,
    setting: {
      isMulti: true
    }
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.NAME, name: 'Name',
    priority: 0,
    label: 'name',
    type: TYPE_PROPERTY.TEXT,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.APPLICATION, name: 'Application',
    priority: 0,
    label: 'application',
    type: TYPE_PROPERTY.NUMBER,
    setting: null
  },
  {
    id: CUSTOMER_ATTRIBUTE_PROPERTY_ID.CHANNEL, name: 'Channel',
    priority: 0,
    label: 'channel',
    type: TYPE_PROPERTY.NUMBER,
    setting: null
  }
]
