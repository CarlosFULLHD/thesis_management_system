"use client";
import React, { useContext } from 'react';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import { TaskContext } from '../providers/StudentsTaskHistoryProvider'; // Asegúrate de importar correctamente el contexto

export default function App() {
  const { tasks } = useContext(TaskContext); // Usamos el contexto para obtener las tareas

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Student Tasks">
        {tasks.map((profile: { username: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; tasks: any[]; }, index: React.Key | null | undefined) => (
          <Tab key={index} title={profile.username}>
            {profile.tasks.map((task: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; comments: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; isTaskDone: any; createdAt: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, taskIndex: React.Key | null | undefined) => (
              <Card key={taskIndex}>
                <CardBody>
                  <p><strong>Task Title:</strong> {task.title}</p>
                  <p><strong>Comments:</strong> {task.comments}</p>
                  <p><strong>Task Status:</strong> {task.isTaskDone ? 'Done' : 'Pending'}</p>
                  <p><strong>Task Created At:</strong> {task.createdAt}</p>
                </CardBody>
              </Card>
            ))}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
