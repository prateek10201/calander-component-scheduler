import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { Dayjs } from "dayjs";
import { useState } from "react";
export function DateTimePicker({
  children,
  onDateDone,
  activeDate,
}: {
  children: React.ReactNode;
  onDateDone: Function;
  activeDate: Date;
}) {
  const [open, setOpen] = useState(false);
  const handleDone = (value: Date | null) => {
    console.log("User finalized selection:", value?.toString());
    onDateDone(value);
    setOpen(false);
  };
  return (
    <Popover open={open}>
      <PopoverTrigger
        asChild
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white text-black h-full">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            onAccept={handleDone}
            value={activeDate}
          />
        </LocalizationProvider>
      </PopoverContent>
    </Popover>
  );
}
