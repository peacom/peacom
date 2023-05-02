import {DATE_TIME_FORMAT, DEFAULT_TIME_ZONE} from "./constant";
import * as moment from "moment-timezone";

type DateType = Date | string

export function formatDateTimeTZ(
  date: DateType,
  timezone = DEFAULT_TIME_ZONE,
  format = DATE_TIME_FORMAT
) {
  return moment(date).tz(timezone).format(format);
}

export const getDate = (date: DateType, tz = "") => {
  if (!tz) return moment(date)
  return moment(date).tz(tz)
}

export function endOfDate(date: DateType, tz = "") {
  return getDate(date, tz).endOf("date").toDate()
}

export function startOfDate(date: DateType, tz = "") {
  return getDate(date, tz).startOf("date").toDate();
}

/**
 * Week start from sunday
 * @param date
 * @param tz
 */
export function startOfWeeks(date: DateType, tz = "") {
  return getDate(date, tz).startOf("week").toDate()
}

export function endOfWeek(date: DateType, tz = "") {
  return getDate(date, tz).endOf("week").toDate()
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
