"use client";
import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import { useTasks } from '../providers/TaskTimeLineProvider';

interface Style {
  background: string;
  color: string;
}

// Tipado para el estado de la tarea
const getColorByDescription = (description: string): Style => {
  switch (description) {
    case "ABIERTO":
      return { background: 'rgb(33, 150, 243)', color: '#fff' }; // Azul
    case "EN ESPERA":
      return { background: 'rgb(255, 193, 7)', color: '#fff' }; // Amarillo
    case "APROBADO":
      return { background: 'rgb(76, 175, 80)', color: '#fff' }; // Verde
    case "APROBADO CON OBSERVACIONES":
      return { background: 'rgb(255, 152, 0)', color: '#fff' }; // Naranja
    case "DESAPROBADO":
      return { background: 'rgb(244, 67, 54)', color: '#fff' }; // Rojo
    case "SIN CALIFICAR":
      return { background: 'rgb(158, 158, 158)', color: '#fff' }; // Gris
    default:
      return { background: 'rgb(96, 125, 139)', color: '#fff' }; // Azul grisáceo para otros casos
  }
};

const TimelineComponent: React.FC = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks(2); // Asumiendo que quieres buscar las tareas del usuario con idUsers=2
  }, [fetchTasks]);

  return (
    <VerticalTimeline>
      {tasks.map((task) => {
        const { background, color } = getColorByDescription(task.taskStatesIdTaskState.description);
        return (
          <VerticalTimelineElement
            key={task.idGradeTask}
            className="vertical-timeline-element--work"
            date={task.createdAt} // Usar createdAt como la fecha para el elemento de la línea de tiempo
            contentStyle={{ background, color }}
            contentArrowStyle={{ borderRight: `7px solid ${background}` }}
            iconStyle={{ background, color }}
            icon={<WorkIcon />} // Podrías elegir diferentes íconos basados en el tipo o estado de la tarea
          >
            <h3 className="vertical-timeline-element-title">{task.taskHasDateIdTaskHasDate.taskIdTask.titleTask}</h3>
            <h4 className="vertical-timeline-element-subtitle">{task.taskStatesIdTaskState.description}</h4>
            <p>
              {task.comments}
            </p>
          </VerticalTimelineElement>
        );
      })}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<WorkIcon />} // Este puede ser un ícono genérico de fin de línea de tiempo como StarIcon
      />
    </VerticalTimeline>
  );
};

export default TimelineComponent;
