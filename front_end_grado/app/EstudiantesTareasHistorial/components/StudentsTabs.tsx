"use client";
import React, { useContext } from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react';
import { TaskContext } from '../providers/StudentsTaskHistoryProvider';
import { PieChart } from 'react-minimal-pie-chart';

export default function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="flex w-full">
      <div className="flex-1">
        <Tabs aria-label="Student Tasks">
          {tasks.map((profile, index) => (
            <Tab key={index} title={profile.username}>
              <div className="flex">
                <div className="flex-1">
                  {profile.tasks.map((task, taskIndex) => {
                    const [date, time] = String(task.createdAt).split('T');
                    return (
                      <Card key={taskIndex} className='mb-4'>
                        <CardBody>
                          <p><strong>Tarea:</strong> {task.title}</p>
                          <p><strong>Comentarios:</strong> {task.comments}</p>
                          <p><strong>Estado actual:</strong> {task.isTaskDone ? 'Terminado' : 'Pendiente'}</p>
                          <p><strong>Asignado el:</strong> {date} <strong>a las:</strong> {time}</p>
                        </CardBody>
                      </Card>
                    );
                  })}
                </div>
                <div className="flex-2">
                  <Card>
                    <CardHeader>
                      Tareas de {profile.username}
                    </CardHeader>
                    <CardBody>
                      <div className="flex">
                        <div style={{ flexGrow: 1 }}>
                          <PieChart
                            style={{ height: '200px', width: '200px' }}
                            data={[
                              { title: 'Terminadas', value: profile.tasks.filter(task => task.isTaskDone).length, color: '#6A2135' },
                              { title: 'Pendientes', value: profile.tasks.filter(task => !task.isTaskDone).length, color: '#C13C37' }
                            ]}
                          />
                        </div>
                        <div>
                          {['Terminadas', 'Pendientes'].map((status, i) => {
                            const color = i === 0 ? '#6A2135' : '#C13C37';
                            const value = i === 0 ? profile.tasks.filter(task => task.isTaskDone).length : profile.tasks.filter(task => !task.isTaskDone).length;
                            const percentage = value / profile.tasks.length * 100;
                            return (
                              <div key={status} className="flex items-center mb-2">
                                <div style={{ width: 20, height: 20, backgroundColor: color }}></div>
                                <div style={{ marginLeft: 8 }}>{`${status} - ${Math.round(percentage)} %`}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
