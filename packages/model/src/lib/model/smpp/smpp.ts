import {MESSAGE_STATUS} from "../message";

export enum SMPP_MESSAGE_STATUS {
  REJECTD = "REJECTD",
  DELIVRD = "DELIVRD",
  EXPIRED = "EXPIRED",
  DELETED = "DELETED",
  UNDELIV = "UNDELIV",
  ACCEPTD = "ACCEPTD",
  UNKNOWN = "UNKNOWN"
}

export const smppStatusMapToMessageStatus = (status: any) => {
  switch (status) {
    case SMPP_MESSAGE_STATUS.REJECTD:
    case SMPP_MESSAGE_STATUS.DELETED:
    case SMPP_MESSAGE_STATUS.UNDELIV:
    case SMPP_MESSAGE_STATUS.UNKNOWN:
    case SMPP_MESSAGE_STATUS.EXPIRED:
      return MESSAGE_STATUS.FAIL;
    case SMPP_MESSAGE_STATUS.ACCEPTD:
      return MESSAGE_STATUS.SUCCESS;
    case SMPP_MESSAGE_STATUS.DELIVRD:
      return MESSAGE_STATUS.DELIVERED;
    default:
      throw new Error(`Invalid SMPP status: ${status}`)
  }
};

export const messageStatusToSmppStatus = (status: any) => {
  switch (status) {
    case MESSAGE_STATUS.PENDING:
      return SMPP_MESSAGE_STATUS.UNKNOWN;
    case MESSAGE_STATUS.SUCCESS:
      return SMPP_MESSAGE_STATUS.ACCEPTD;
    case MESSAGE_STATUS.FAIL:
      return SMPP_MESSAGE_STATUS.UNDELIV;
    case MESSAGE_STATUS.READ:
    case MESSAGE_STATUS.DELIVERED:
      return SMPP_MESSAGE_STATUS.DELIVRD;
    default:
      throw new Error(`Invalid Message status: ${status}`)
  }
}
