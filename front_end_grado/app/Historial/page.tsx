"use client";
import TimelineComponent from "./components/timeLine";
import { TaskTimelineProvider } from "./providers/TaskTimeLineProvider";

const Historial = () => {

   return (
    <TaskTimelineProvider>
      <TimelineComponent/>
    </TaskTimelineProvider>
  );
};

export default Historial;


