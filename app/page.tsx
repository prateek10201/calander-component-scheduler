import CalendarGrid from "@/components/calender";
import SubHeader from "@/components/sub-header";
import { use } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <h2 className="text-primary text-xl">Scheduled Suites</h2>
      <SubHeader />
      <CalendarGrid />
    </div>
  );
}
