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
  GOOGLE_BUSINESS
}

export enum PARTNER {
  PEACOM = 1,
  GOOGLE = 2,
  GMS = 3,
  VIBER = 4,
  APPLE,
  SINCH,
  ZALO,
  FACEBOOK,
  TELEGRAM,
  DATALYTIS = 10,
  CM = 11
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
  application: Application,
  id: string // Official Account username - Mapping with Partner OfficialAccount ID
  partnerId: PARTNER
}
