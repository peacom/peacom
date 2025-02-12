import {memoryCacheService} from "./";

describe('memory-cache.specs.ts', () => {
  it('test 1 param', async () => {
    const cache = memoryCacheService((a) => new Promise(res => res(`${a}_${new Date().getTime()}`)))
    const resp = await cache.fetch('a')
    console.log(resp)
    const resp1 = await cache.fetch('a')
    console.log(resp1)
  })

  it('test 2 param', async () => {
    const cache = memoryCacheService((a) => new Promise(res => res(`${a}_${new Date().getTime()}`)))
    const resp = await cache.fetch('a')
    console.log(resp)
    const resp1 = await cache.fetch('a', 'a')
    console.log(resp1)
  })

  it('test JSON param', async () => {
    const cache = memoryCacheService((a) => new Promise(res => res(`${a}_${new Date().getTime()}`)))
    const resp = await cache.fetch({test: 'a'})
    console.log(resp)
    const resp1 = await cache.fetch({test: 'a'})
    console.log(resp1)
  })
})
