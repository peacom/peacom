import {
  addDays,
  addHours,
  addMonths, addSeconds,
  endLastMonth,
  endOfDate,
  endOfHour,
  endOfMin,
  endOfMonth,
  endOfWeek,
  formatDateTimeTZ,
  formatTimeTZ,
  getDate,
  getLastRangeMinute,
  getListHour, getListMinute, getListRangeTime, getTimeOfDate,
  getTimeZoneOffset, isInWorkingHour, isRangeTimeOverlap,
  parseDateTimeByFormat,
  startLastMonth,
  startOfDate,
  startOfHour,
  startOfMin,
  startOfMonth,
  startOfWeek
} from './date.util';
import {DEFAULT_TIME_ZONE} from "./constant";
import {RangeDate, WorkingTime} from "../../model/time";

describe('date.util', () => {
  it('parse Date', () => {
    console.log(parseDateTimeByFormat('240829082217', 'YYMMDDHHmmss'))
    console.log(parseDateTimeByFormat('240829082217', 'YYMMDDHHmmss', "UTC"))
  })
  it('should work', () => {
    const dateStr = '2022-12-20T10:23:55Z'
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
  it('addSeconds', () => {
    console.log(formatDateTimeTZ(addSeconds(new Date(), 1), DEFAULT_TIME_ZONE))
    console.log(formatDateTimeTZ(addSeconds(new Date(), 1), "Asia/Tokyo"))
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
    const dateStr = '2022-06-30T17:00:00Z'
    console.log(startOfMonth(new Date(dateStr), "America/Chicago"))
    console.log(startOfMonth(parseDateTimeByFormat("2022-07", "YYYY-MM", "America/Chicago"), "America/Chicago"))
    console.log(endOfMonth(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
  it('startEndOfHour', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfHour(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfHour(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
  it('rangeOfMin', () => {
    const dateStr = '2022-12-20T10:23:55Z'
    console.log(startOfMin(new Date(dateStr), DEFAULT_TIME_ZONE))
    console.log(endOfMin(new Date(dateStr), DEFAULT_TIME_ZONE))
  });
  it('lastMonth', () => {
    console.log(startLastMonth(new Date(), DEFAULT_TIME_ZONE).toString())
    console.log(endLastMonth(new Date(), DEFAULT_TIME_ZONE).toString())
  });
  it('List hour', () => {
    const startTime = startOfDate(addHours(new Date(), -25), DEFAULT_TIME_ZONE)
    console.log(getListHour(startTime, new Date()))
  })
  it('get List RangeTime', () => {
    const startTime = startOfDate(addDays(new Date(), -1), DEFAULT_TIME_ZONE)
    console.log(getListRangeTime(startTime, new Date(), 60))
  })
  it('get getListMinute', ()=>{
    const startTime = new Date('2025-09-30T14:01:00.000Z');
    const toTime = new Date("2025-10-01T03:31:59.999Z")
    console.log(getListMinute(startTime, toTime, 15))
  })
  it("formatTime", () => {
    const departureDatetime = new Date("2023-03-23T08:00:00Z");
    console.log(formatTimeTZ(departureDatetime, DEFAULT_TIME_ZONE, "HH:mm"));
  });
  it("getLastRangeOfNumberMinuteFromDate", () => {
    console.log(getLastRangeMinute(60, new Date()))
  })
  it("GetOffset", () => {
    expect(getTimeZoneOffset('Asia/Ho_Chi_Minh')).toEqual("+07:00")
    expect(getTimeZoneOffset('Asia/Jakarta')).toEqual("+07:00")
    expect(getTimeZoneOffset('Asia/Macau')).toEqual("+08:00")
    expect(getTimeZoneOffset('Asia/Seoul')).toEqual("+09:00")
    expect(getTimeZoneOffset('Asia/Singapore')).toEqual("+08:00")

  })
  it("GetOffset El_Salvador", () => {
    expect(getTimeZoneOffset('America/El_Salvador')).toEqual("-06:00")
  })
  it('getTimeOfDate', () => {
    console.log(new Date())
    console.log(getTimeOfDate(new Date('2024-05-05T20:00:00Z')))
    console.log(getTimeOfDate(new Date('2024-05-16T16:00:00Z')));
  })
  it('isRangeDateOverlap', () => {
    const range1: RangeDate = {
      endDate: '2024-05-05T20:00:00Z',
      startDate: '2024-05-16T16:00:00Z',
    };
    const range2: RangeDate = {
      endDate: '2025-05-05T15:00:00Z',
      startDate: '2025-05-16T13:00:00Z',
    }
    expect(isRangeTimeOverlap(range1, range2)).toBeFalsy()
  })
  it('isRangeDateOverlap1', () => {
    const range1: RangeDate = {
      endDate: new Date('2024-05-05T20:00:00Z'),
      startDate: new Date('2024-05-16T16:00:00Z'),
    };
    const range2: RangeDate = {
      endDate: new Date('2025-05-05T15:00:00Z'),
      startDate: '2025-05-16T13:00:00Z',
    }
    expect(isRangeTimeOverlap(range1, range2)).toBeFalsy()
  })
  it('isRangeDateOverlap1', () => {
    const range1: RangeDate = {
      endDate: new Date('2024-05-05T20:00:00Z'),
      startDate: new Date('2024-05-16T16:00:00Z'),
    };
    const range2: RangeDate = {
      endDate: new Date('2025-05-05T15:00:00Z'),
      startDate: '2025-05-16T13:00:00Z',
    }
    expect(isRangeTimeOverlap(range1, range2)).toBeFalsy()
  })
  const workingHour: WorkingTime = {
    "friday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "monday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "sunday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "tuesday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "saturday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "thursday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ],
    "wednesday": [
      {
        "endDate": "2025-05-09T21:00:00.993Z",
        "startDate": "2025-05-09T17:00:00.601Z"
      },
      {
        "endDate": "2025-05-10T13:00:00.526Z",
        "startDate": "2025-05-10T12:00:00.035Z"
      }
    ]
  }
  it('isWorkingHour with Default Timezone UTC+7', () => {
    const da = new Date(Date.UTC(2025, 4, 10, 17, 37, 0, 0))
    // const da = new Date()
    console.log(da)
    expect(isInWorkingHour(workingHour, da)).toBeTruthy();
  })
  it('isWorkingHour with Default Timezone UTC+0', () => {
    const da = new Date(2025, 4, 10, 4, 37, 0, 0)
    // const da = new Date()
    console.log(da)
    expect(isInWorkingHour(workingHour, da, "UTC")).toBeTruthy();
  })
});
