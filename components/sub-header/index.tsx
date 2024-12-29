import React from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  List,
  Plus,
} from "lucide-react";

function SubHeader({
  onPrevClick,
  onNextClick,
  currentDate,
}: {
  onPrevClick: any;
  onNextClick: any;
  currentDate: any;
}) {
  return (
    <div className="flex gap-xs justify-between">
      <div className="flex gap-xs items-center">
        <Button
          variant="default"
          className="text-white px-l py-s gap-s h-[36px] w-[145px]"
        >
          <Plus />
          Schedule Test
        </Button>
        <div className="border-[1px] border-secondary-gray-200 flex items-center rounded-m p-m h-[36px] w-[240px] justify-between">
          <ChevronLeft onClick={onPrevClick} />
          Week of {currentDate} <ChevronRight onClick={onNextClick} />
        </div>
      </div>
      <div className="flex bg-secondary-gray-150 rounded-l items-center gap-s">
        <List className="w-[44px] h-[44px] px-s py-l" />
        <CalendarDays className="w-[44px] h-[44px] bg-white border-[2px] border-secondary-gray-150 rounded-m px-s py-l" />
      </div>
    </div>
  );
}

export default SubHeader;
