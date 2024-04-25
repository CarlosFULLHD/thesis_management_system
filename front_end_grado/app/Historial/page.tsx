"use client";
import React, { useState } from "react";
import TimelineComponent from "./components/timeLine";
import { TaskTimelineProvider } from "./providers/TaskTimeLineProvider";
import CalendarComponent  from "./components/calendarComponent";

const Historial = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
   return (
    <div>
      {/* <div className="h-[80px] fixed inset-x-0 h-full z-40 bg-blue-50 dark:bg-blue-25">
        <CalendarComponent onDateSelect={setSelectedDate} />
      </div> */}
      
      <TaskTimelineProvider>
        <TimelineComponent selectedDate={selectedDate}/>
      </TaskTimelineProvider>
    </div>
  );
};

export default Historial;


