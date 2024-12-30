import { fromUnixTime, isEqual } from "date-fns";
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
import { Concert_One } from "next/font/google";

const pstTimeZone = "America/Los_Angeles";

export const generateWeeklyIntervals = (
  date = new Date(),
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
    date,
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
    date: hour,
  }));
};

export const isSlotScheduled = (
  testSuiteData: any[] = [],
  date: Date,
  time: Date
) => {
  return testSuiteData.find((suite) => {
    const epochInSeconds = suite.date_time;

    const decodedDate = fromUnixTime(epochInSeconds);

    const pstTimeZone = "America/Los_Angeles";
    const pstDate = addHours(toZonedTime(decodedDate, pstTimeZone), 3);

    if (
      (isEqual(pstDate.getDate(), date.getDate()) &&
        isEqual(pstDate.getMonth(), date.getMonth()) &&
        isEqual(pstDate.getFullYear(), date.getFullYear()) &&
        isEqual(pstDate.getHours(), time.getHours())) ||
      (suite.frequency === date.getDay() &&
        isEqual(pstDate.getHours(), time.getHours()))
    ) {
      console.log({ pstDate, date, suite, time });
    }
    return (
      (isEqual(pstDate.getDate(), date.getDate()) &&
        isEqual(pstDate.getMonth(), date.getMonth()) &&
        isEqual(pstDate.getFullYear(), date.getFullYear()) &&
        isEqual(pstDate.getHours(), time.getHours())) ||
      (suite.frequency === date.getDay() &&
        isEqual(pstDate.getHours(), time.getHours()))
    );
  });
};
