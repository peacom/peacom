import {delay, startPerformance} from "./";

describe('performance.util', () => {
  it('test', async () => {
    const perf = startPerformance('test')
    perf.log({ok: 1});
    perf.log({ok: 2});
    await delay(1000)
    perf.log({ok: 3});
    perf.end();
  })
})
