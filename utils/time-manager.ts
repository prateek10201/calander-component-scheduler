import {
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  addHours,
  eachHourOfInterval,
} from "date-fns";

import { toZonedTime } from "date-fns-tz";

const pstTimeZone = "America/Los_Angeles";

export const generateWeeklyIntervals = (
  date = addHours(new Date(), -3),
  options = {
    dateFormat: "MM-dd-yyyy",
    weekStartsOn: 0,
  }
) => {
  const startDate = startOfWeek(date);
  const endDate = endOfWeek(date);

  console.log(toZonedTime(date, pstTimeZone));

  return eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 0 }
  ).map((weekStart) => ({
    weekStart: format(
      startOfWeek(weekStart, { weekStartsOn: 0 }),
      options.dateFormat
    ),
    weekEnd: format(
      endOfWeek(weekStart, { weekStartsOn: 0 }),
      options.dateFormat
    ),
  }))[0];
};

export const generateDailyIntervalsBasedOnWeek = (date: Date) => {
  const { weekEnd, weekStart } = generateWeeklyIntervals(date);
  return eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  }).map((date) => ({
    value: parseInt(format(date, "d"), 10),
    label: format(date, "EEE"),
  }));
};

export const generateHourlyInterval = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setHours(0);
  endDate.setHours(23);
  return eachHourOfInterval({
    start: startDate,
    end: endDate,
  }).map((hour) => ({
    value: parseInt(format(hour, "hh a"), 10),
    label: format(hour, "a"),
  }));
};
