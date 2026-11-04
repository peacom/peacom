import {installPeacomCA} from "./certificate/https-server";
import {FieldError, FormError} from "@peacom/model";


export const myFetch = (url: any, opts?: any) => {
  if (url.startsWith('https://')) {
    installPeacomCA();
  }
  return fetch(url, opts || {});
};

export const parseResponse = async (resp: Response, log?: (message: string) => void) => {
  const responseBody = await resp.json();
  if (log) {
    log(
      `Response ${resp.status} - ${resp.statusText}\n${JSON.stringify(
        responseBody
      )}`
    );
  }

  if (!resp.ok) {
    throw new FormError(responseBody as FieldError[]);
  }

  return responseBody;
}
