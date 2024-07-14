import {sslAgent} from '@peacom/core';

export const myFetch = (url: any, opts?: any) => {
  if (url.startsWith('https://')) {
    opts.dispatcher = sslAgent
  }
  return fetch(url, opts)
}
