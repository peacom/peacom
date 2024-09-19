import {
  alphaNumericToString,
  filterNonAlphaNumeric,
  isNumberOnly,
  leftString,
  renderTemplate
} from "./";

describe('string.util', () => {
  it('isNumber', () => {
    const dateStr = '2022'
    expect(isNumberOnly(dateStr)).toBeTruthy();
    const notOnlyNumber = '2022a'
    expect(isNumberOnly(notOnlyNumber)).toBeFalsy();
  });
  it('leftString', () => {
    const dateStr = '2022'
    expect(leftString(dateStr, 5)).toHaveLength(4);
    expect(leftString(dateStr, 2)).toStrictEqual("20")
  });
  it('alphaNumericToListString html code', () => {
    expect(
      alphaNumericToString(
        "\"41A&quot;. \'41B\", &quot;41C&quot;"
      )
    ).toEqual(['41A', '41B', '41C']);
  })
  it('alphaNumericToListString 1', () => {
    expect(
      alphaNumericToString(
        "41'A,41''B,42C"
      )
    ).toEqual(['41A', '41B', '42C']);
  })
  it('alphaNumericToListString 2', () => {
    expect(
      alphaNumericToString(
        "41A 41''B.42C/43d"
      )
    ).toEqual(['41A', '41B', '42C', '43d']);
  })
  it('alphaNumericToListString 3', () => {
    expect(
      alphaNumericToString(
        "39s"
      )
    ).toEqual(["39s"]);
  })
  it('render template', ()=>{
    expect(renderTemplate('{{abc}} {{def}}', {
      abc: 'testing',
      def: 'peacom'
    })).toEqual("testing peacom")
  })

  it('render template', ()=>{
    console.log(renderTemplate('{{sms}}', {
      sms: '655 K1 S 19 43 32 24 30 02 S 38 05 22 21 31 39 S 10 53 03 09 06 16 S 23 52 42 01 51 26 S 06 02 06 48 40 07 S 13 42 48 03 27 17*655 K1 S 10 22 53 04 46 43 S 47 39 09 01 35 05 S 43 01 50 22 30 24 S 03 46 32 06 30 39',
    }))
  })
  it('render template now', ()=>{
    console.log(renderTemplate('{{now}}', {
    }))
  })
  it("filterNonAlphaNumeric", ()=>{
    console.log(filterNonAlphaNumeric("harmoney 003", "_"))
  })
});
