import {DATE_TIME_FORMAT, DEFAULT_TIME_ZONE} from "./constant";
import * as moment from "moment-timezone";
import {hasText} from "../string.util";
import {DAY_OF_WEEK, RangeDate, WorkingTime} from "../../model/time";

type DateType = Date | string

export function formatDateTimeTZ(
  date: DateType,
  timezone = DEFAULT_TIME_ZONE,
  format = DATE_TIME_FORMAT
) {
  if (hasText(timezone)) {
    return moment(date).tz(timezone).format(format);
  }
  return moment(date).format(format);
}

export const getDate = (date: DateType, tz = "") => {
  if (!hasText(tz)) return moment(date)
  return moment(date).tz(tz)
}

export function endOfHour(date: DateType, tz = "") {
  return getDate(date, tz).endOf("hours").toDate()
}

export function startOfMin(date: DateType, tz = "") {
  return getDate(date, tz).startOf("minutes").toDate();
}

export function endOfMin(date: DateType, tz = "") {
  return getDate(date, tz).endOf("minutes").toDate();
}

export function startOfHour(date: DateType, tz = "") {
  return getDate(date, tz).startOf("hours").toDate();
}

export function endOfDate(date: DateType, tz = "") {
  return getDate(date, tz).endOf("date").toDate()
}

export function startOfDate(date: DateType, tz = "") {
  return getDate(date, tz).startOf("date").toDate();
}

export function addSeconds(date: DateType, seconds: number, tz = "") {
  return getDate(date, tz).add(seconds, "seconds").toDate();
}

export function addHours(date: DateType, hours: number, tz = "") {
  return getDate(date, tz).add(hours, "hours").toDate();
}

export function addDays(date: DateType, days: number, tz = "") {
  return getDate(date, tz).add(days, "days").toDate();
}

export function addMonths(date: DateType, months: number, tz = "") {
  return getDate(date, tz).add(months, "months").toDate();
}

export function addMin(date: DateType, min: number, tz = "") {
  return getDate(date, tz).add(min, "minutes").toDate();
}

/**
 * Week start from sunday
 * @param date
 * @param tz
 */
export function startOfWeeks(date: DateType, tz = "") {
  return getDate(date, tz).startOf("week").toDate()
}

export const startOfWeek = startOfWeeks

export function endOfWeek(date: DateType, tz = "") {
  return getDate(date, tz).endOf("week").toDate()
}

export function startOfMonth(date: DateType, tz = "") {
  return getDate(date, tz).startOf("month").toDate()
}

export function endOfMonth(date: DateType, tz = "") {
  return getDate(date, tz).endOf("month").toDate()
}

export function startLastMonth(date: DateType, tz = "") {
  return getDate(date, tz).subtract(1, "month").startOf("month").toDate()
}

export function endLastMonth(date: DateType, tz = "") {
  return getDate(date, tz).subtract(1, "month").endOf("month").toDate()
}

export function lastWeek(date: DateType, tz = "") {
  return getDate(date, tz).subtract(1, "week").startOf("week").toDate()
}

export function differentMinute(date: DateType, date1: DateType) {
  return Math.ceil(moment(date).diff(moment(date1), "minutes", true));
}

export function formatTimeTZ(date: DateType, timezone = DEFAULT_TIME_ZONE, format = "LT") {
  return moment(date).tz(timezone).format(format);
}

export function formatDateTime(date: DateType, format = "LT") {
  return moment(date).format(format);
}

export const parseDateTimeByFormat = (
  dateStr: string,
  format = DATE_TIME_FORMAT,
  timezone = DEFAULT_TIME_ZONE
) => {
  return moment
    .tz(`${dateStr}`, format, timezone)
    .toDate();
};

export const getListHour = (fromTime: Date, toTime: Date, hourStep = 1) => {
  const rs = [fromTime]
  let isContinue = true
  let nextHour = fromTime
  while (isContinue) {
    nextHour = addHours(nextHour, hourStep)
    if (nextHour.getTime() < toTime.getTime()) {
      rs.push(nextHour)
    } else {
      isContinue = false
    }
  }
  return rs;
}

export const getListRangeTime = (fromTime: Date, toTime: Date, min = 60) => {
  const rs: { startTime: Date; endTime: Date }[] = [];
  let start = new Date(fromTime);
  let end = addMin(start, min);
  while (start < toTime) {
    // Nếu end vượt quá toTime, gán end = toTime
    if (end > toTime) {
      end = new Date(toTime);
    }
    rs.push({
      startTime: new Date(start),
      endTime: new Date(end)
    });
    // Cập nhật start và end cho vòng lặp tiếp theo
    start = new Date(end);
    end = addMin(start, min);
  }
  return rs;
};

export const getLastRangeMinute = (rangeMin: number, fromDate = new Date()) => {
  if (rangeMin <= 0) {
    throw Error('Invalid range minute')
  }
  if (60 % rangeMin > 0) {
    throw Error('Range minute must be divide by 60')
  }
  const currentMin = fromDate.getMinutes();
  const sub = currentMin % rangeMin;
  const lastEnd = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), fromDate.getHours(), fromDate.getMinutes() - sub, 0, 0)
  return {
    start: addMin(lastEnd, -1 * rangeMin),
    end: lastEnd
  }
}

export const getTimeZoneOffset = (timezone: string) => {
  const tz = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  }).format(new Date());
  const offset = tz.split('GMT')[1]
  return offset || '+00:00'
}

export const getTimeOfDate = (date: Date) => {
  const today = new Date()
  return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds())
}

export const isRangeTimeOverlap = (range1: RangeDate, range2: RangeDate) => {
  if (!range1 || !range1.endDate || !range1.startDate) {
    throw new Error("Invalid range date (range1)")
  }
  if (!range2 || !range2.endDate || !range2.startDate) {
    throw new Error("Invalid range date (range1)")
  }
  const range1From = getTimeOfDate(new Date(range1.startDate))
  const range1To = getTimeOfDate(new Date(range1.endDate))
  const range2From = getTimeOfDate(new Date(range2.startDate))
  const range2To = getTimeOfDate(new Date(range2.endDate))
  // console.log(`${range1From} - ${range1To} - ${range2From} - ${range2To}`)
  return (
    (range1From <= range2To && range1To >= range2From) ||
    (range1To <= range2From && range1From >= range2From) ||
    (range1From >= range2To && range1To <= range2To)
  )
}

const getWeekDay = (isoWeekDay: number) => {
  switch (isoWeekDay) {
    case 7:
      return DAY_OF_WEEK.SUNDAY;
    case 1:
      return DAY_OF_WEEK.MONDAY;
    case 2:
      return DAY_OF_WEEK.TUESDAY;
    case 3:
      return DAY_OF_WEEK.WEDNESDAY;
    case 4:
      return DAY_OF_WEEK.THURSDAY;
    case 5:
      return DAY_OF_WEEK.FRIDAY;
    case 6:
      return DAY_OF_WEEK.SATURDAY;
    default:
      throw new Error('Invalid date')
  }
}


export const isInWorkingHour = (workingHours: WorkingTime, date = new Date(), tz = DEFAULT_TIME_ZONE) => {
  const momentDate = getDate(date, tz);
  const weekDay = getWeekDay(momentDate.isoWeekday())
  // console.log(`Day: ${weekDay} - ${momentDate} Hour: ${momentDate.hours()} - min: ${momentDate.minutes()} - sec: ${momentDate.seconds()}`)
  const dayHours = workingHours[weekDay]
  let rs = true;
  const currentTime = momentDate.hours() * 60 + momentDate.minutes();
  if (dayHours && dayHours.length) {
    rs = false
    try {
      for (let i = 0; i < dayHours.length; i += 1) {
        const hour = dayHours[i]
        const fromDate = moment(hour.startDate).tz(tz);
        const toDate = moment(hour.endDate).tz(tz);

        const fromTime = fromDate.hours() * 60 + fromDate.minutes()
        const toTime = toDate.hours() * 60 + toDate.minutes()
        rs = currentTime >= fromTime && currentTime <= toTime;
        // console.log(`Is WorkingHour ${fromDate.hours()}:${fromDate.minutes()} - to: ${toDate.hours()}:${toDate.minutes()}`, rs)
        if (rs) {
          break;
        }
      }
    } catch (e) {
      console.warn(e)
    }

  }
  return rs
}
