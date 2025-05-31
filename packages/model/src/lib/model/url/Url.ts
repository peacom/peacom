export enum URL_GENERATE_TYPE {
  REDIRECT = 1,
  PREVIEW_URL
}

export enum URL_TYPE {
  ORIGIN = 1,
  LANDING_PAGE
}

// This is using for create url, url_origin, url_landing_page
export interface Url {
  code: string,
  redirectUrl: string,
  createdDate: Date,
  content: any,
  type: URL_TYPE,
  click: number,
  urlOriginUrl?: any
  urlLandingPage?: any

  [key: string]: any
}

export function getUrlLink(code: string, type = URL_GENERATE_TYPE.REDIRECT) {
  if (!process.env['BE_DOMAIN']) {
    throw new Error(`Not yet define BE_DOMAIN`)
  }
  const url = process.env['BE_DOMAIN']
  if (type === URL_GENERATE_TYPE.PREVIEW_URL) {
    return `${url}/api/url/${code}/view`;
  }
  return `${url}/api/url/${code}`;
}
