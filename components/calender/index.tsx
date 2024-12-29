import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";

const CalendarGrid = () => {
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 1;
    return hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  });

  const days = [
    { number: 9, day: "Sun" },
    { number: 10, day: "Mon" },
    { number: 11, day: "Tue" },
    { number: 12, day: "Wed" },
    { number: 13, day: "Thu" },
    { number: 14, day: "Fri" },
    { number: 15, day: "Sat" },
  ];

  const events = [
    {
      title: "Demo Suite",
      time: "11:00AM PST",
      day: 10,
      startHour: 7,
      description: "Demo Suite Session",
    },
    {
      title: "Authentication",
      time: "8:00AM PST",
      day: 13,
      startHour: 8,
      description: "Authentication Meeting",
    },
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto border-0">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-20">
            <div className="h-16"></div>{" "}
            <div className="h-8 flex items-center justify-end pr-4">
              <span className="text-sm text-muted-foreground text-secondary-gray-800">
                PST
              </span>
            </div>
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-16 flex items-center justify-end pr-4 text-sm text-muted-foreground text-secondary-gray-800"
              >
                {time}
              </div>
            ))}
          </div>

          <div className="flex-1 border border-gray-200">
            <div className="grid grid-cols-7 bg-[#DED9D6]">
              {days.map((day) => (
                <div
                  key={day.number}
                  className="h-16 flex flex-row items-center justify-center gap-1 border-l first:border-l-0 border-gray-200"
                >
                  <span className="text-sm text-[18px] text-[#1B1919]">
                    {day.number}
                  </span>
                  <span className="text-sm text-muted-foreground text-[14px] text-secondary-gray-800">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((day) => (
                <div
                  key={day.number}
                  className={cn(
                    "border-l first:border-l-0 border-gray-200",
                    "relative"
                  )}
                >
                  {timeSlots.map((_, index) => {
                    const event = events.find(
                      (e) => e.day === day.number && e.startHour === index + 1
                    );

                    return (
                      <div
                        key={index}
                        className="h-16 border-b border-gray-200"
                      >
                        {event && (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="mx-2 p-2 bg-blue-100 rounded cursor-pointer hover:bg-blue-200 transition-colors border-[1px] border-primary-core-blue">
                                <div className="text-sm font-medium text-primary">
                                  {event.title}
                                </div>
                                <div className="text-xs text-primary flex items-center gap-[5px]">
                                  <Clock3 className="text-primary w-3 h-3" />{" "}
                                  {event.time}
                                </div>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent side="right" className="w-64">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Time: {event.time}
                                </p>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarGrid;
