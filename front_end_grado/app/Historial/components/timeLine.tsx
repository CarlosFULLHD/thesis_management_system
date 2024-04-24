import React, { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work';
import { useTasks } from '../providers/TaskTimeLineProvider'; // Import useTasks from where it is defined

const TimelineComponent: React.FC = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks(2); // Assuming you want to fetch tasks for user with idUsers=2
  }, [fetchTasks]);

  return (
    <VerticalTimeline>
      {tasks.map((task) => (
        <VerticalTimelineElement
          key={task.idGradeTask}
          className="vertical-timeline-element--work"
          date={task.createdAt} // Use createdAt as the date for the timeline element
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid rgb(33, 150, 243)' }}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<WorkIcon />} // You might choose different icons based on task type or status
        >
          <h3 className="vertical-timeline-element-title">{task.taskHasDateIdTaskHasDate.taskIdTask.titleTask}</h3>
          <h4 className="vertical-timeline-element-subtitle">{task.taskStatesIdTaskState.description}</h4>
          <p>
            {task.comments}
          </p>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<WorkIcon />} // This can be a generic end-of-timeline icon like StarIcon
      />
    </VerticalTimeline>
  );
};

export default TimelineComponent;
