import {xss} from "./security";

describe('security.spec.ts', () => {
  it('filterXSS', async () => {
    console.log(xss(`Con <br> Please login here <h4>
    <a href="http://localhost:8080"></a>
</h4>`, {
      whiteList: {},        // empty, means filter out all tags
      stripIgnoreTag: true,      // filter out all HTML not in the while list
      stripIgnoreTagBody: ['script']
    }))
  })
})
