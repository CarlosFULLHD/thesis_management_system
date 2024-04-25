import React, { useEffect, useRef } from 'react';
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
    case "APROBADO CON OBS":
      return { background: 'rgb(255, 152, 0)', color: '#fff' }; // Naranja
    case "DESAPROBADO":
      return { background: 'rgb(244, 67, 54)', color: '#fff' }; // Rojo
    case "SIN CALIFICAR":
      return { background: 'rgb(158, 158, 158)', color: '#fff' }; // Gris
    default:
      return { background: 'rgb(96, 125, 139)', color: '#fff' }; // Azul grisáceo para otros casos
  }
};
interface TimelineComponentProps {
  selectedDate: Date | null; // Tipado explícito para el parámetro
}
const TimelineComponent: React.FC<TimelineComponentProps> = ({ selectedDate }) => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks(2); // Asume que fetchTasks actualiza el estado 'tasks'
    };
  
    fetchData();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const sortedTasks = [...tasks].sort((a, b) => a.taskHasDateIdTaskHasDate.publicationDate.localeCompare(b.taskHasDateIdTaskHasDate.publicationDate));
      // No hay necesidad de actualizar el estado aquí si solo se ordena para la presentación
    }
  }, [tasks]);

  // Efecto para enfocar elementos basados en la fecha seleccionada
  useEffect(() => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toISOString().split('T')[0];
      document.querySelectorAll(`[data-publication-date="${selectedDateString}"]`).forEach(element => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, [selectedDate]);

  return (
    <VerticalTimeline>
      {tasks.map((task) => {
        const { background, color } = getColorByDescription(task.taskStatesIdTaskState.description);
        const isOpen = task.taskStatesIdTaskState.description === "ABIERTO";
        const elementId = isOpen ? 'open-task' : undefined;

        // Formatear la fecha para comparación
        const taskDate = new Date(task.taskHasDateIdTaskHasDate.publicationDate).toISOString().split('T')[0];

        return (
          <VerticalTimelineElement
            key={task.idGradeTask}
            className={`vertical-timeline-element--work ${isOpen ? 'open-task' : ''}`}
            date={`Publicación: ${task.taskHasDateIdTaskHasDate.publicationDate}, Plazo: ${task.taskHasDateIdTaskHasDate.deadline}`}
            contentStyle={{ background, color }}
            contentArrowStyle={{ borderRight: `7px solid ${background}` }}
            iconStyle={{ background, color }}
            icon={<WorkIcon />}
            id={elementId}
            data-publication-date={taskDate} // Añadir data attribute para facilitar el enfoque
          >
            <h3 className="vertical-timeline-element-title">{task.taskHasDateIdTaskHasDate.taskIdTask.titleTask}</h3>
            <h4 className="vertical-timeline-element-subtitle">Estado: {task.taskStatesIdTaskState.description}</h4>
            <p>Comentarios: {task.comments}</p>
          </VerticalTimelineElement>
        );
      })}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<WorkIcon />}
      />
    </VerticalTimeline>
  );
};

export default TimelineComponent;
