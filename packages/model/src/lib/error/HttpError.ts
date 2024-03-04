export class HttpError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
  }
}
