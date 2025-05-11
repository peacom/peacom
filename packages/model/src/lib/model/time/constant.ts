export interface RangeDate {
  startDate: Date | string | null
  endDate: Date | string | null
}

export enum DAY_OF_WEEK {
  SUNDAY = "sunday",
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}

export interface WorkingTime {
  [DAY_OF_WEEK.MONDAY]: Array<RangeDate>
  [DAY_OF_WEEK.SUNDAY]: Array<RangeDate>
  [DAY_OF_WEEK.TUESDAY]: Array<RangeDate>
  [DAY_OF_WEEK.WEDNESDAY]: Array<RangeDate>
  [DAY_OF_WEEK.THURSDAY]: Array<RangeDate>
  [DAY_OF_WEEK.FRIDAY]: Array<RangeDate>
  [DAY_OF_WEEK.SATURDAY]: Array<RangeDate>
}
