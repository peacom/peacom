import {isNumberOnly} from "./";

describe('string.util', () => {
  it('isNumber', () => {
    const dateStr = '2022'
    expect(isNumberOnly(dateStr)).toBeTruthy();
    const notOnlyNumber = '2022a'
    expect(isNumberOnly(notOnlyNumber)).toBeFalsy();
  });
});
