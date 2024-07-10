import {sslAgent} from "./certificate/https-server";

export const myFetch = (url: any, opts: any) => {
  if (url.startsWith('https://')) {
    opts.dispatcher = sslAgent
  }
  return fetch(url, opts)
}
