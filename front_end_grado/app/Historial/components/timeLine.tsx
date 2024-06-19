import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import { useTasks } from '../providers/TaskTimeLineProvider';

interface Style {
  background: string;
  color: string;
}

const getColorByDescription = (description: string): Style => {
  switch (description) {
    case "ABIERTO":
      return { background: 'rgb(33, 150, 243)', color: '#fff' };
    case "EN ESPERA":
      return { background: 'rgb(255, 193, 7)', color: '#fff' };
    case "APROBADO":
      return { background: 'rgb(76, 175, 80)', color: '#fff' };
    case "APROBADO CON OBS":
      return { background: 'rgb(255, 152, 0)', color: '#fff' };
    case "DESAPROBADO":
      return { background: 'rgb(244, 67, 54)', color: '#fff' };
    case "SIN CALIFICAR":
      return { background: 'rgb(158, 158, 158)', color: '#fff' };
    default:
      return { background: 'rgb(96, 125, 139)', color: '#fff' };
  }
};

interface TimelineComponentProps {
  selectedDate: Date | null;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ selectedDate }) => {
  const { tasks } = useTasks();

  useEffect(() => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      setTimeout(() => {
        const elements = document.querySelectorAll(`[data-publication-date="${selectedDateString}"]`);
        console.log("Tamaño:"+ elements.length);
        if (elements.length > 0) {
          elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [selectedDate, tasks]);

  return (
    <VerticalTimeline>
      {tasks.map((task) => {
        const taskDate = new Date(task.taskHasDateIdTaskHasDate.publicationDate).toISOString().split('T')[0];
        const { background, color } = getColorByDescription(task.taskStatesIdTaskState.description);
        console.log(taskDate);
        return (
          <VerticalTimelineElement
            key={task.idGradeTask}
            date={`Publicación: ${taskDate}, Plazo: ${new Date(task.taskHasDateIdTaskHasDate.deadline).toISOString().split('T')[0]}`}
            contentStyle={{ background, color }}
            iconStyle={{ background, color }}
            icon={<WorkIcon />}
            data-publication-date={taskDate}
          >
            <h3 data-publication-date={taskDate}>{task.taskHasDateIdTaskHasDate.taskIdTask.titleTask}</h3>
            <h4>Estado: {task.taskStatesIdTaskState.description}</h4>
            <p>{task.comments}</p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};

export default TimelineComponent;