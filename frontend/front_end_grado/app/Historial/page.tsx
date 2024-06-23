"use client";
import React, { useState } from "react";
import TimelineComponent from "./components/timeLine";
import { TaskTimelineProvider } from "./providers/TaskTimeLineProvider";
import CalendarComponent from "./components/calendarComponent";

const Historial = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <CalendarComponent onDateSelect={setSelectedDate} />
      </div>

      <div className="flex-grow overflow-y-auto">
        <TaskTimelineProvider>
          <TimelineComponent selectedDate={selectedDate}/>
        </TaskTimelineProvider>
      </div>
    </div>
  );
};

export default Historial;
