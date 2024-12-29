import React, { useState } from "react";
import { Calendar, CircleX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DateTimePicker } from "../date-time-picker";
import { format } from "date-fns";
import dayjs from "dayjs";

const ScheduleTestDialog = ({ children }: { children: React.ReactNode }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [selectedDay, setSelectedDay] = React.useState("Mon");
  const [scheduleFormData, setScheduleFormData] = useState({
    testSuite: "",
    dateAndTime: dayjs(),
    selectDay: "Mon",
  });
  const handleSave = () => {
    console.log(scheduleFormData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[640px] bg-white text-black sm:rounded-xxl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">
            Schedule Detail
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="font-medium">Test Suite</div>
            <Select
              onValueChange={(value) =>
                setScheduleFormData({ ...scheduleFormData, testSuite: value })
              }
              defaultValue="demo"
            >
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select a test suite" />
              </SelectTrigger>
              <SelectContent className="bg-white border-1 border-gray-200 text-black cursor-pointer">
                <SelectItem value="demo" className="cursor-pointer">
                  Demo Suite
                </SelectItem>
                <SelectItem value="integration" className="cursor-pointer">
                  Integration Suite
                </SelectItem>
                <SelectItem value="e2e" className="cursor-pointer">
                  E2E Suite
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 bg-secondary p-6 rounded-lg">
            <div className="font-medium">Start Date and Time</div>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pr-10 border rounded-md bg-white border-gray-200"
                value={
                  format(scheduleFormData.dateAndTime, "MM/dd/yy") +
                  " at " +
                  format(scheduleFormData.dateAndTime, "hh:mm a") +
                  " PST"
                }
                placeholder="Select Date and Time"
                readOnly
              />

              <DateTimePicker
                activeDate={scheduleFormData.dateAndTime}
                onDateDone={(value: Date) => {
                  setScheduleFormData({
                    ...scheduleFormData,
                    dateAndTime: value,
                  });
                }}
              >
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </DateTimePicker>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="font-medium">Run Weekly on Every</div>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-60 underline decoration-1"
                >
                  Custom Interval
                </Button>
              </div>
              <div className="grid grid-cols-7 mt-2 bg-white rounded-s">
                {daysOfWeek.map((day) => (
                  <div className="border-r-[1px] border-gray-200">
                    <button
                      key={day}
                      onClick={() =>
                        setScheduleFormData({
                          ...scheduleFormData,
                          selectDay: day,
                        })
                      }
                      className={`py-2 text-center transition-colors rounded-md w-full 
                      ${
                        scheduleFormData.selectDay === day
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100"
                      }
                    `}
                    >
                      {day}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 gap-2">
          <Button
            variant="outline"
            className="text-destructive border-gray-200 hover:bg-red-50 w-full"
          >
            <CircleX />
            Cancel Schedule
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-blue-700 text-white w-full"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleTestDialog;
