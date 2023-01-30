export enum Application {
  VIBER = 1,
  RCS = 2,
  SMS = 3,
  APPLE = 4,
  TELEGRAM = 5,
  FACEBOOK = 6,
  ZALO = 7,
  ZALO_ZNS = 8,
  VIBER_BUSINESS = 9,
  VIBER_BOT = 10,
  WHATSAPP = 12
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
}

export const isBotApplication = (appId: string | number) => {
  return [Application.VIBER, Application.APPLE, Application.TELEGRAM, Application.FACEBOOK, Application.ZALO].includes(Number(appId))
}

export const isOAApplication = (appId: string | number) => {
  return [Application.RCS, Application.SMS, Application.ZALO_ZNS, Application.VIBER_BUSINESS].includes(Number(appId))
}

export interface ApplicationInfo {
  setting?: Record<string, unknown>,
  application: Application,
  id: string
  partnerId: PARTNER
}
