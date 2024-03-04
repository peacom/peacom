export enum ZaloActionType {
  OPEN_URL = 'oa.open.url',
  REPLY_SHOW = 'oa.query.show',
  REPLY_HIDE = 'oa.query.hide',
  OPEN_SMS = 'oa.open.sms',
  OPEN_PHONE = 'oa.open.phone'
}

export interface ZaloActionPayLoad {
  content?: string
  phone_code: string
}

export interface ZaloAction {
  type: ZaloActionType
  payload: string | ZaloActionPayLoad
}

export interface ZaloElement {
  title: string // 100 ký tự
  subtitle?: string // Nếu đây là element đầu tiên trong danh sách elements thì tham số này là bắt buộc. Nếu đây không phải là action đầu tiên thì thược tính này là tùy chọn
  image_url?: string
  default_action: ZaloAction // Nếu đây là element đầu tiên thì tham số này là không bắt buộc.
}
