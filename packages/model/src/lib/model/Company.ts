

export enum COMPANY_STATUS {
  BLOCKED = 0,
  ACTIVE = 1
}

export const companyStatusStr = (status: COMPANY_STATUS) => {
  switch (status){
    case COMPANY_STATUS.BLOCKED:
      return 'Blocked'
    case COMPANY_STATUS.ACTIVE:
      return 'Active'
    default:
      return `UNKNOWN ${status}`
  }
}


export enum COMPANY_KYC_STATUS {
  PENDING = 0,
  REQUEST = 1,
  REJECT = 2,
  APPROVE = 3
}

export const companyKycStatusStr = (status: COMPANY_KYC_STATUS) => {
  switch (status){
    case COMPANY_KYC_STATUS.PENDING:
      return 'Pending'
    case COMPANY_KYC_STATUS.REQUEST:
      return 'Request'
    case COMPANY_KYC_STATUS.REJECT:
      return 'Reject'
    case COMPANY_KYC_STATUS.APPROVE:
      return 'Approve'
    default:
      return `UNKNOWN ${status}`
  }
}


export enum COMPANY_TYPE {
  NORMAL = 1,
  PARTNER = 2
}

export const companyTypeStr = (type: COMPANY_TYPE) => {
  switch (type){
    case COMPANY_TYPE.NORMAL:
      return 'Normal'
    case COMPANY_TYPE.PARTNER:
      return 'Partner'
    default:
      return `UNKNOWN ${type}`
  }
}

export enum COMPANY_CATEGORY {
  PERFORMANCE_BASED = 1,
  NON_PERFORMANCE_BASED = 2
}

