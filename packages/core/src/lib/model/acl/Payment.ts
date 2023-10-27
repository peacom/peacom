import {ActionDescription, PERMISSION} from "@peacom/core";

export const PERMISSION_PAYMENT: Record<number, ActionDescription> = {
  [PERMISSION.PAYMENT.READ]: {
    actionId: PERMISSION.PAYMENT.READ,
    name: "Read",
    enableType: false
  },
  [PERMISSION.PAYMENT.UPDATE]: {
    actionId: PERMISSION.PAYMENT.UPDATE,
    name: "Update",
    enableType: false
  },
  [PERMISSION.PAYMENT.DELETE]: {
    actionId: PERMISSION.PAYMENT.DELETE,
    name: "Delete",
    enableType: false
  },
  [PERMISSION.PAYMENT.SETTING]: {
    actionId: PERMISSION.PAYMENT.SETTING,
    name: "Setting",
    enableType: false
  },
}
