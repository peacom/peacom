import { Application } from '../Application';

export enum AUTH_REQUEST_STATUS {
  PENDING = 0,
  CONFIRMED = 1,
  CLAIMED = 2,
}

export enum AUTH_CHANNEL {
  WHATSAPP = Application.WHATSAPP,
  TELEGRAM = Application.TELEGRAM,
  EMAIL = Application.EMAIL,
}
