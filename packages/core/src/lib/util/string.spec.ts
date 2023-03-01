import {isNumberOnly, leftString} from "./";

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
});
