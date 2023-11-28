import {HttpError} from "./HttpError";
import {FieldError} from "./FieldError";

export enum HTTP_ERROR {
  ACCESS_DENIED = 403,
  NOT_FOUND = 404,
  TIME_OUT = 402,
  BAD_REQUEST = 400,
  NOT_AUTHENTICATE = 401,
  INTERNAL_SERVER_ERROR = 500
}

export class FormError extends HttpError {
  errors: Array<FieldError>

  constructor(_errors: FieldError | Array<FieldError>) {
    super(HTTP_ERROR.BAD_REQUEST, 'Bad request');
    this.errors = Array.isArray(_errors) ? [..._errors] : [_errors];
  }
}

const SYSTEM_ERROR = Object.freeze(["EACCES", "EPERM"]);

export function isSystemError(err: any) {
  return err && err.code && SYSTEM_ERROR.indexOf(err.code) >= 0;
}

export function badRequest(name: string, code: string, message: string) {
  return new FormError(new FieldError(name, code, message));
}
