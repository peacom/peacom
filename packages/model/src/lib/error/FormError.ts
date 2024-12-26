import {HttpError} from "./HttpError";
import {FieldError} from "./FieldError";
import {hasText} from "../util";

export enum HTTP_ERROR {
  ACCESS_DENIED = 403,
  NOT_FOUND = 404,
  TIME_OUT = 402,
  BAD_REQUEST = 400,
  NOT_AUTHENTICATE = 401,
  NOT_ACCEPTABLE = 406,
  EXPECTATION_FAILED = 417,
  INTERNAL_SERVER_ERROR = 500
}

export class FormError extends HttpError {
  errors: Array<FieldError>

  constructor(_errors: FieldError | Array<FieldError>) {
    super(HTTP_ERROR.BAD_REQUEST, (Array.isArray(_errors) ? _errors[0].message : _errors?.['message']) || 'Bad request');
    this.errors = Array.isArray(_errors) ? _errors : [_errors];
  }
}

const SYSTEM_ERROR = Object.freeze(["EACCES", "EPERM"]);

export function isSystemError(err: any) {
  return err && err.code && SYSTEM_ERROR.indexOf(err.code) >= 0;
}

export function badRequest(name: string, code: string, message: string) {
  return new FormError(new FieldError(name, code, message));
}

export const errorToTraceText = (error: any) => {
  const rs = [];
  if (hasText(error.name)) {
    rs.push(error.name);
  }

  if (hasText(error.original?.code)) {
    rs.push(`Code: <strong>${error.original?.code}</strong>`);
  }
  if (hasText(error.original?.sqlMessage)) {
    rs.push(`Message: <strong>${error.original?.sqlMessage}</strong>`);
  }
  if (error instanceof FormError) {
    const {
      errors: [err]
    } = error;
    if (err) {
      rs.push(`Form Error: ${err.name}`);
      rs.push(`Message: <strong>${err.message}</strong>`);
    }
  } else {
    rs.push(`Message: <strong>${error.message}</strong>`);
  }
  rs.push(error.stack);
  return rs.join("\n");
};
