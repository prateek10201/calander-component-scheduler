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
import dayjs, { Dayjs } from "dayjs";
import { DB } from "@/utils/supabase/client";

const ScheduleTestDialog = ({
  children,
  event,
  onDone,
}: {
  children: React.ReactNode;
  event: any;
  onDone: Function;
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [open, setOpen] = useState(false);
  const [scheduleFormData, setScheduleFormData] = useState({
    testSuite: event?.test_suite || "",
    dateAndTime: event?.date_time ? dayjs.unix(event?.date_time) : dayjs(),
    selectDay: daysOfWeek[event?.frequency] || "Mon",
  });
  const handleSave = async () => {
    try {
      let dbError = null;
      if (event && event.tid) {
        const { data, error } = await DB.from("scheduled-test-event")
          .update({
            test_suite: scheduleFormData.testSuite,
            date_time: scheduleFormData.dateAndTime.unix(),
            frequency: daysOfWeek.indexOf(scheduleFormData.selectDay),
          })
          .eq("tid", event.tid);
        dbError = error;
      } else {
        const { data, error } = await DB.from("scheduled-test-event").insert({
          test_suite: scheduleFormData.testSuite,
          date_time: scheduleFormData.dateAndTime.unix(),
          frequency: daysOfWeek.indexOf(scheduleFormData.selectDay),
        });
        dbError = error;
      }
      if (dbError) {
        throw dbError;
      }
      onDone();
      setOpen(false);
    } catch (e) {
      console.log("Error ", e);
    }
  };

  const handleDelete = async () => {
    try {
      const { data, error } = await DB.from("scheduled-test-event")
        .delete()
        .eq("tid", event.tid);
      if (error) {
        throw error;
      }
      onDone();
      setOpen(false);
    } catch (e) {
      console.log("Error ", e);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </DialogTrigger>
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
              defaultValue={scheduleFormData.testSuite}
            >
              <SelectTrigger className="w-full border-gray-200">
                <SelectValue placeholder="Select a test suite" />
              </SelectTrigger>
              <SelectContent className="bg-white border-1 border-gray-200 text-black cursor-pointer">
                <SelectItem value="Demo Suite" className="cursor-pointer">
                  Demo Suite
                </SelectItem>
                <SelectItem
                  value="Integration Suite"
                  className="cursor-pointer"
                >
                  Integration Suite
                </SelectItem>
                <SelectItem value="E2E Suite" className="cursor-pointer">
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
                  scheduleFormData.dateAndTime.format("MM/DD/YY") +
                  " at " +
                  scheduleFormData.dateAndTime.format("hh:mm A") +
                  " PST"
                }
                placeholder="Select Date and Time"
                readOnly
              />

              <DateTimePicker
                activeDate={scheduleFormData.dateAndTime}
                onDateDone={(value: Dayjs) => {
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
            onClick={handleDelete}
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
