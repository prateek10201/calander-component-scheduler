"use client";
import CalendarGrid from "@/components/calender";
import SubHeader from "@/components/sub-header";
import {
  generateDailyIntervalsBasedOnWeek,
  generateHourlyInterval,
} from "@/utils/time-manager";
import { addDays, format } from "date-fns";
import { use, useState } from "react";

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState({
    currentDate: new Date(),
    timeSlots: generateHourlyInterval(),
    days: generateDailyIntervalsBasedOnWeek(new Date()),
  });

  const handlePrevWeek = () => {
    const prevWeekDay = addDays(currentWeek.currentDate, -7);
    setCurrentWeek({
      ...currentWeek,
      currentDate: prevWeekDay,
      days: generateDailyIntervalsBasedOnWeek(prevWeekDay),
    });
  };

  const handleNextWeek = () => {
    const nextWeekDay = addDays(currentWeek.currentDate, 7);
    setCurrentWeek({
      ...currentWeek,
      currentDate: nextWeekDay,
      days: generateDailyIntervalsBasedOnWeek(nextWeekDay),
    });
  };
  return (
    <div className="flex flex-col">
      <h2 className="text-primary text-xl">Scheduled Suites</h2>
      <SubHeader
        onPrevClick={handlePrevWeek}
        onNextClick={handleNextWeek}
        currentDate={format(currentWeek.currentDate, "MM/dd/yy")}
      />
      <CalendarGrid currentWeek={currentWeek} />
    </div>
  );
}
