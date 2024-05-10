"use client";
import React, { useState } from "react";
import TimelineComponent from "./components/timeLine";
import { TaskTimelineProvider } from "./providers/TaskTimeLineProvider";
import CalendarComponent from "./components/calendarComponent";

const Historial = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div style={{ paddingTop: '0px' }}>
      <div className="top-0" style={{ color: 'black' }}>
        <CalendarComponent onDateSelect={setSelectedDate} />
      </div>

      <div style={{ height: 'calc(72vh - 200px)', overflowY: 'auto' }}>
        <TaskTimelineProvider>
          <TimelineComponent selectedDate={selectedDate}/>
        </TaskTimelineProvider>
      </div>
    </div>
  );
};

export default Historial;
