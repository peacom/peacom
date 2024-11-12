import { sslAgent } from '@peacom/core';

export const myFetch = (url: any, opts?: any) => {
  let options = opts || {};
  if (url.startsWith('https://')) {
    options.dispatcher = sslAgent;
  }
  return fetch(url, options);
};
