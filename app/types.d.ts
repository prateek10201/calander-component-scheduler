export type CurrentWeekType = {
  currentDate: Date;
  timeSlots: { value: number; label: string; date: Date }[];
  days: { value: number; label: string; date: Date }[];
};
