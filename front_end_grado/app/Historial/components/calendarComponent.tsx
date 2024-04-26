import React from "react";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

interface CalendarComponentProps {
  onDateSelect: (newDate: Date | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelect }) => {
const [date, setDate] = React.useState<Date | (() => Date | null) | null>(
    () => new Date() // Initialize the state with a new Date object
);
const { locale } = useLocale();

const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
        setDate(newDate);
        onDateSelect(newDate); // Send the date to the parent component
    }
};

  return (
    <Calendar
      aria-label="Select a date"
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default CalendarComponent;
