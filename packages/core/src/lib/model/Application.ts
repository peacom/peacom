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
  GOOGLE_BUSINESS = 12
}

export const ApplicationString = {
  [Application.VIBER]: "VIBER",
  [Application.RCS]: "RCS",
  [Application.SMS]: "SMS",
  [Application.APPLE]: "APPLE",
  [Application.TELEGRAM]: "TELEGRAM",
  [Application.FACEBOOK]: "FACEBOOK",
  [Application.ZALO]: "ZALO",
  [Application.ZALO_ZNS]: "ZALO ZNS",
  [Application.VIBER_BUSINESS]: "VIBER BUSINESS",
  [Application.VIBER_BOT]: "VIBER BOT",
  [Application.WHATSAPP]: "WHATSAPP",
  [Application.GOOGLE_BUSINESS]: "GOOGLE BUSINESS",
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
  MOBIFONE_GLOBAL = 14
}

export const PartnerString = (id: PARTNER | null) => {
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
    case PARTNER.MOBIFONE_GLOBAL:
      return "MOBIFONE GLOBAL"
    default:
      return ""
  }
}

export const isBotApplication = (appId: string | number) => {
  return [Application.VIBER_BOT, Application.APPLE, Application.TELEGRAM, Application.FACEBOOK, Application.ZALO, Application.GOOGLE_BUSINESS].includes(Number(appId))
}

export const isOAApplication = (appId: string | number) => {
  return [Application.RCS, Application.SMS, Application.ZALO_ZNS,
    Application.WHATSAPP,
    Application.VIBER_BUSINESS, Application.VIBER].includes(Number(appId))
}

export interface ApplicationInfo {
  setting?: Record<string, unknown>,
  applicationId: Application,
  id: string // Official Account username - Mapping with Partner OfficialAccount ID
  publicId?: string // Public ID of Application Channel
  partnerId: PARTNER
}
