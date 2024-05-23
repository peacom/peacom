export enum Application {
  VIBER = 1,
  RCS = 2,
  SMS = 3,
  APPLE = 4,
  TELEGRAM = 5,
  FACEBOOK = 6,
  ZALO = 7,
  ZALO_ZNS = 8,
  VIBER_BUSINESS = 9, // Not use now
  VIBER_BOT = 10, // Not use now
  WHATSAPP = 11,
  GOOGLE_BUSINESS = 12,
  LIVE_CHAT = 14
}

export const applicationStr = (id?: number) => {
  switch (id) {
    case Application.RCS:
      return "RCS"
    case Application.SMS:
      return "SMS"
    case Application.VIBER:
      return "VIBER"
    case Application.VIBER_BOT:
      return "VIBER BOT"
    case Application.VIBER_BUSINESS:
      return "VIBER BUSINESS"
    case Application.APPLE:
      return "APPLE"
    case Application.TELEGRAM:
      return "TELEGRAM"
    case Application.FACEBOOK:
      return "FACEBOOK"
    case Application.GOOGLE_BUSINESS:
      return "Google Business Message"
    case Application.ZALO:
      return "Zalo Official Account"
    case Application.ZALO_ZNS:
      return "Zalo ZNS"
    case Application.WHATSAPP:
      return "WHATSAPP"
    case Application.LIVE_CHAT:
      return "LIVE CHAT"
    default:
      return `${id || ""}`
  }
}

export enum PARTNER {
  PEACOM = 1,
  GOOGLE = 2,
  GMS = 3,
  VIBER = 4,
  APPLE = 5,
  SINCH = 6,
  ZALO = 7,
  FACEBOOK = 8,
  TELEGRAM = 9,
  DATALYTIS = 10,
  CM = 11,
  BRAND_SMS = 12,
  VIET_GUY = 13,
  INFO_BIP = 14,
  CHATWOOT = 15,
  TILEDESK = 16,
  TSEL = 17
}

export const partnerStr = (id: PARTNER | null) => {
  switch (id) {
    case PARTNER.PEACOM:
      return "PEACOM"
    case PARTNER.GOOGLE:
      return "GOOGLE"
    case PARTNER.GMS:
      return "GMS"
    case PARTNER.VIBER:
      return "VIBER"
    case PARTNER.APPLE:
      return "APPLE"
    case PARTNER.SINCH:
      return "SINCH"
    case PARTNER.ZALO:
      return "ZALO"
    case PARTNER.FACEBOOK:
      return "FACEBOOK"
    case PARTNER.TELEGRAM:
      return "TELEGRAM"
    case PARTNER.CM:
      return "CM"
    case PARTNER.BRAND_SMS:
      return "BRAND SMS (VMG)"
    case PARTNER.VIET_GUY:
      return "VIET GUY"
    case PARTNER.INFO_BIP:
      return "INFOBIP"
    case PARTNER.CHATWOOT:
      return "CHATWOOT"
    case PARTNER.TILEDESK:
      return "TILEDESK"
    case PARTNER.TSEL:
      return "TSEL"
    default:
      return ""
  }
}

export const isBotApplication = (appId: string | number) => {
  return [Application.VIBER_BOT, Application.APPLE, Application.TELEGRAM, Application.FACEBOOK, Application.ZALO, Application.GOOGLE_BUSINESS, Application.LIVE_CHAT].includes(Number(appId))
}

export const isOAApplication = (appId: string | number) => {
  return [Application.RCS, Application.SMS, Application.ZALO_ZNS,
    Application.WHATSAPP,
    Application.VIBER_BUSINESS, Application.VIBER].includes(Number(appId))
}

export interface ApplicationInfo {
  setting?: Record<string, unknown>,
  applicationId: Application,
  id: string // Official Account username - Mapping with Partner OfficialAccount ID, or bot uri
  publicId?: string // Public ID of Application Channel
  partnerId: PARTNER
}
