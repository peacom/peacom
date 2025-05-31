import * as _ from 'lodash'
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const objectDeepClone = (obj: any) => {
  return _.cloneDeep(obj)
}
