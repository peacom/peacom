import {alphaNumericToString, isNumberOnly, leftString} from "./";

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
});
