import {
  addDays,
  addHours,
  endOfDate, endOfHour, endOfMonth,
  endOfWeek,
  formatDateTimeTZ,
  getDate, startOfHour,
  startOfMonth,
  startOfWeek
} from "./date.util";
import {DEFAULT_TIME_ZONE} from "./constant";

describe('date.util', () => {
  it('should work', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    const VN_DateStr = '2022-12-20 17:23:55'
    expect(formatDateTimeTZ(new Date(dateStr))).toEqual(VN_DateStr);
    expect(formatDateTimeTZ(dateStr)).toEqual(VN_DateStr);
  });
  it('endOfDate', () => {
    console.log(getDate('2023-06-17T16:59:59.999Z', "GMT+0").toDate())
    console.log(getDate('2023-06-17T23:59:59.999Z', DEFAULT_TIME_ZONE).toDate())
    console.log(endOfDate('2023-06-17T16:59:59.999Z', DEFAULT_TIME_ZONE))
    console.log(endOfDate('2023-06-17T23:59:59.999Z', "GMT+0"))
  });
  it('addHour', () => {
    console.log(addHours(new Date(), -0.25))
  });
  it('addDays', () => {
    console.log(addDays(new Date(), -1))
  });
  it('startOfWeek', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfWeek(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfWeek(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
  it('startOfMonth', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfMonth(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfMonth(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
  it('startEndOfHour', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfHour(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfHour(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
});
