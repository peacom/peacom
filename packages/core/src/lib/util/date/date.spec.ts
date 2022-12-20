import {endOfDate, endOfWeek, formatDateTimeTZ, startOfWeeks} from "./date.util";
import {DEFAULT_TIME_ZONE} from "./constant";

describe('date.util', () => {
  it('should work', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    const VN_DateStr = '2022-12-20 17:23:55'
    expect(formatDateTimeTZ(new Date(dateStr))).toEqual(VN_DateStr);
    expect(formatDateTimeTZ(dateStr)).toEqual(VN_DateStr);
  });
  it('endOfDate', () => {
    console.log(endOfDate(new Date(), DEFAULT_TIME_ZONE))
  });
  it('startOfWeek', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfWeeks(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfWeek(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
});
