import {filterXSS} from 'xss'

export const xss = (str: string, options = {}) => {
  return filterXSS(str, options)
}
