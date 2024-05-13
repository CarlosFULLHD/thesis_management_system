"use client";
import React, { useContext } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { TaskContext } from '../providers/StudentsTaskHistoryProvider';

export default function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Student Tasks">
        {tasks.map((profile, index) => (
          <Tab key={index} title={profile.username}>
            {profile.tasks.map((task, taskIndex) => {
              const [date, time] = String(task.createdAt).split('T');
              return (
                <Card key={taskIndex} className='mb-4'>
                  <CardBody>
                    <p><strong>Tarea: </strong> {task.title}</p>
                    <p><strong>Comentarios:</strong> {task.comments}</p>
                    <p><strong>Estado actual:</strong> {task.isTaskDone ? 'Terminado' : 'Pendiente'}</p>
                    <p><strong>Asignado el:</strong> {date} <strong>a las:</strong> {time}</p>
                  </CardBody>
                </Card>
              );
            })}
            <br />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}