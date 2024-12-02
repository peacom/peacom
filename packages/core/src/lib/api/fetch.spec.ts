import {myFetch} from "./fetch";

const dns = require('node:dns');

const look = (domain: string, port: number) => new Promise((res) => {
  const options = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  dns.lookup(domain, options, (err: any, address: any, family: any) => {
    res({err, address, family})
  });
})

describe('fetch.specs.ts', () => {
  it('get server', () => {
    console.log(dns.getServers())
  })
  it('test resolve', async () => {
    console.log(await look('local.peacom.co', 4004))
  })
  it('test fetch ssl', async () => {
    const resp = await myFetch('https://local.peacom.co:4004', {})
    console.log(await resp.text())
  })
})
