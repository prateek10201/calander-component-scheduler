"use client";
import CalendarGrid from "@/components/calender";
import SubHeader from "@/components/sub-header";
import { Toaster } from "@/components/ui/toaster";
import { DB } from "@/utils/supabase/client";
import {
  generateDailyIntervalsBasedOnWeek,
  generateHourlyInterval,
} from "@/utils/time-manager";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentWeek, setCurrentWeek] = useState({
    currentDate: new Date(),
    timeSlots: generateHourlyInterval(),
    days: generateDailyIntervalsBasedOnWeek(new Date()),
  });

  const [testSuites, setTestSuites] = useState([]);

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

  const fetchTestSuites = async () => {
    try {
      const { data, error } = await DB.from("scheduled-test-event").select("*");
      if (error) {
        throw error;
      }
      console.log(data);
      setTestSuites(data);
    } catch (e) {
      console.log("Error ", e);
    }
  };

  useEffect(() => {
    fetchTestSuites();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-black text-3xl font-semibold py-4">
        Scheduled Suites
      </h2>
      <SubHeader
        onDone={fetchTestSuites}
        onPrevClick={handlePrevWeek}
        onNextClick={handleNextWeek}
        currentDate={format(currentWeek.currentDate, "MM/dd/yy")}
      />
      <CalendarGrid
        onDone={fetchTestSuites}
        currentWeek={currentWeek}
        testSuites={testSuites}
      />
      <Toaster />
    </div>
  );
}
