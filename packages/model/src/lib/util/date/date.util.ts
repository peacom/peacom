import {DATE_TIME_FORMAT, DEFAULT_TIME_ZONE} from "./constant";
import * as moment from "moment-timezone";
import {hasText} from "../string.util";

type DateType = Date | string

export function formatDateTimeTZ(
  date: DateType,
  timezone = DEFAULT_TIME_ZONE,
  format = DATE_TIME_FORMAT
) {
  return moment(date).tz(timezone).format(format);
}

export const getDate = (date: DateType, tz = "") => {
  if (!hasText(tz)) return moment(date)
  return moment(date).tz(tz)
}

export function endOfHour(date: DateType, tz = "") {
  return getDate(date, tz).endOf("hours").toDate()
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

export const parseDateTimeByFormat = (
  dateStr: string,
  format = DATE_TIME_FORMAT,
  timezone = DEFAULT_TIME_ZONE
) => {
  return moment
    .tz(`${dateStr}`, DATE_TIME_FORMAT, timezone)
    .toDate();
};

export const getListHour = (fromTime: Date, toTime: Date, step = 1) => {
  const rs = [fromTime]
  let isContinue = true
  let nextHour = fromTime
  while (isContinue) {
    nextHour = addHours(nextHour, 1)
    if (nextHour.getTime() < toTime.getTime()) {
      rs.push(nextHour)
    } else {
      isContinue = false
    }
  }
  return rs;
}

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
