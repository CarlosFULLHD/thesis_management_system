"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import { BASE_URL } from "@/config/globals";

interface Task {
  idTaskState: number;
  taskStateDescription: string;
  taskStateStatus: number;
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  personDescription: string;
  email: string;
  cellPhone: string;
  gradeProfileTitle: string;
  statusGraduationMode: number;
  isGradeoneortwo: number;
  semester: string;
  titleTask: string;
  task: string;
  feedback: string;
  orderIs: number;
  publicationDate: string;
  deadline: string;
  taskStatus: number;
  meeting: boolean;
  url: boolean;
}

interface DataComponentsProps {
  userId: number;
}

type TaskStateCounts = {
  [key: string]: number;
};

const DataComponents: React.FC<DataComponentsProps> = ({ userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userId) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}task-states/user/${userId}`);
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Hubo un error al cargar las tareas.</p>;

  const taskStateCounts: TaskStateCounts = tasks.reduce((acc: TaskStateCounts, task) => {
    acc[task.taskStateDescription] = (acc[task.taskStateDescription] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    { title: 'ABIERTO', value: taskStateCounts["ABIERTO"] || 0, color: 'rgb(33, 150, 243)' },
    { title: 'EN ESPERA', value: taskStateCounts["EN ESPERA"] || 0, color: 'rgb(255, 193, 7)' },
    { title: 'APROBADO', value: taskStateCounts["APROBADO"] || 0, color: 'rgb(76, 175, 80)' },
    { title: 'APROBADO CON OBS', value: taskStateCounts["APROBADO CON OBS"] || 0, color: 'rgb(255, 152, 0)' },
    { title: 'DESAPROBADO', value: taskStateCounts["DESAPROBADO"] || 0, color: 'rgb(244, 67, 54)' },
    { title: 'SIN CALIFICAR', value: taskStateCounts["SIN CALIFICAR"] || 0, color: 'rgb(158, 158, 158)' }
  ];

  return (
    <div className="flex h-full w-full">
      <div className="flex-1">
        {tasks.map((task, index) => (
          <Card key={index} className='mb-4'>
            <CardHeader>
              <strong>{task.titleTask}</strong>
            </CardHeader>
            <CardBody>
              <p><strong>Estado:</strong> {task.taskStateDescription}</p>
              <p><strong>Comentarios:</strong> {task.feedback}</p>
              <p><strong>Orden:</strong> {task.orderIs}</p>
              <p><strong>Es URL:</strong> {task.url ? 'Sí' : 'No'}</p>
              <p><strong>Es Reunión:</strong> {task.meeting ? 'Sí' : 'No'}</p>
              <p><strong>Fecha de Publicación:</strong> {task.publicationDate}</p>
              <p><strong>Fecha Límite:</strong> {task.deadline}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex-2">
        <Card>
          <CardBody>
            <div className="flex flex-col">
              <div className="mb-4">
              <h1><strong>Informacion del estudiante</strong></h1>
              <p><strong>CI:</strong> {tasks.length > 0 ? tasks[0].ci : ''}</p>
              <p><strong>Nombre:</strong> {tasks.length > 0 ? tasks[0].name : ''}</p>
              <p><strong>Apellido Paterno:</strong> {tasks.length > 0 ? tasks[0].fatherLastName : ''}</p>
              <p><strong>Apellido Materno:</strong> {tasks.length > 0 ? tasks[0].motherLastName : ''}</p>
              <p><strong>Descripción:</strong> {tasks.length > 0 ? tasks[0].personDescription : ''}</p>
              <p><strong>Email:</strong> {tasks.length > 0 ? tasks[0].email : ''}</p>
              <p><strong>Teléfono:</strong> {tasks.length > 0 ? tasks[0].cellPhone : ''}</p>
              <p><strong>Título del Perfil:</strong> {tasks.length > 0 ? tasks[0].gradeProfileTitle : ''}</p>
              <p><strong>Estado del Modo de Graduación:</strong> {tasks.length > 0 ? tasks[0].statusGraduationMode : ''}</p>
              <p><strong>Es Grado Uno o Dos:</strong> {tasks.length > 0 ? tasks[0].isGradeoneortwo : ''}</p>
              </div>
              <h1><strong>Datos estadisticos de las tareas segun su estado</strong></h1>
              <div style={{ flexGrow: 1 }}>
                <PieChart
                  style={{ height: '200px', width: '200px' }}
                  data={chartData}
                />
              </div>
              <div>
                {chartData.map((data, i) => {
                  const percentage = data.value / tasks.length * 100;
                  return (
                    <div key={data.title} className="flex items-center mb-2">
                      <div style={{ width: 20, height: 20, backgroundColor: data.color }}></div>
                      <div style={{ marginLeft: 8 }}>{`${data.title} - ${Math.round(percentage)} %`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DataComponents;
