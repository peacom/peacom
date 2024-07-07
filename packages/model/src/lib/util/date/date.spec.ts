import {
  addDays,
  addHours, addMonths, endLastMonth,
  endOfDate, endOfHour, endOfMonth,
  endOfWeek,
  formatDateTimeTZ, formatTimeTZ,
  getDate, getLastRangeMinute, getListHour, getTimeZoneOffset, startLastMonth, startOfDate, startOfHour,
  startOfMonth,
  startOfWeek
} from "./date.util";
import {DEFAULT_TIME_ZONE} from "./constant";

describe('date.util', () => {
  it('should work', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    const VN_DateStr = '2022-12-20 17:23:55'
    console.log(new Date(dateStr), new Date(dateStr).toISOString())
    console.log(formatDateTimeTZ(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(formatDateTimeTZ(dateStr, 'UTC'))
    // expect(formatDateTimeTZ(new Date(dateStr), DEFAULT_TIME_ZONE)).toEqual(VN_DateStr);
    // expect(formatDateTimeTZ(dateStr)).toEqual(VN_DateStr);
  });
  it('endOfDate', () => {
    console.log(getDate('2023-06-17 16:59:59.999', "Asia/Tokyo").toString())
    console.log(getDate('2023-06-17 16:59:59.999', DEFAULT_TIME_ZONE).toString())
    console.log(getDate('2023-06-17T23:59:59.999Z', DEFAULT_TIME_ZONE).toDate())
    console.log(endOfDate('2023-06-17T16:59:59.999Z', DEFAULT_TIME_ZONE))
    console.log(endOfDate('2023-06-17T23:59:59.999Z', "GMT+0"))
  });
  it('addHour', () => {
    console.log(addHours(new Date(), -1))
    console.log(addHours(new Date(), -1, "Asia/Tokyo"))
    console.log(addHours(new Date(), -1, DEFAULT_TIME_ZONE))
  });
  it('addDays', () => {
    console.log(addDays(new Date(), -1))
  });
  it('addMonths', () => {
    console.log(addMonths(new Date(), -1))
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
  it('lastMonth', () => {
    console.log(startLastMonth(new Date(), DEFAULT_TIME_ZONE).toString())
    console.log(endLastMonth(new Date(), DEFAULT_TIME_ZONE).toString())
  });
  it('List hour', () => {
    const startTime = startOfDate(addHours(new Date(), -25), DEFAULT_TIME_ZONE)
    console.log(getListHour(startTime, new Date()))
  })
  it("formatTime", () => {
    const departureDatetime = new Date("2023-03-23T08:00:00Z");
    console.log(formatTimeTZ(departureDatetime, DEFAULT_TIME_ZONE, "HH:mm"));
  });
  it("getLastRangeOfNumberMinuteFromDate", ()=>{
    console.log(getLastRangeMinute(60, new Date()))
  })
  it("GetOffset", ()=>{
    expect(getTimeZoneOffset('Asia/Ho_Chi_Minh')).toEqual("+07:00")
    expect(getTimeZoneOffset('Asia/Jakarta')).toEqual("+07:00")
    expect(getTimeZoneOffset('Asia/Macau')).toEqual("+08:00")
    expect(getTimeZoneOffset('Asia/Seoul')).toEqual("+09:00")
    expect(getTimeZoneOffset('Asia/Singapore')).toEqual("+08:00")

  })
  it("GetOffset El_Salvador", ()=>{
    expect(getTimeZoneOffset('America/El_Salvador')).toEqual("-06:00")
  })
});
