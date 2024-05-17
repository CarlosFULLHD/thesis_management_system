"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import axios from 'axios';
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
        const response = await axios.get(`${BASE_URL}/api/v1/task-states/user/${userId}`);
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

  return (
    <div className="flex w-full flex-col">
      {tasks.map((task, index) => (
        <Card key={index} className='mb-4'>
          <CardHeader>
            <strong>{task.titleTask}</strong>
          </CardHeader>
          <CardBody>
            <p><strong>ID Estado de Tarea:</strong> {task.idTaskState}</p>
            <p><strong>Descripción del Estado:</strong> {task.taskStateDescription}</p>
            <p><strong>Estado:</strong> {task.taskStateStatus}</p>
            <p><strong>CI:</strong> {task.ci}</p>
            <p><strong>Nombre:</strong> {task.name}</p>
            <p><strong>Apellido Paterno:</strong> {task.fatherLastName}</p>
            <p><strong>Apellido Materno:</strong> {task.motherLastName}</p>
            <p><strong>Descripción:</strong> {task.personDescription}</p>
            <p><strong>Email:</strong> {task.email}</p>
            <p><strong>Teléfono:</strong> {task.cellPhone}</p>
            <p><strong>Título del Perfil:</strong> {task.gradeProfileTitle}</p>
            <p><strong>Estado del Modo de Graduación:</strong> {task.statusGraduationMode}</p>
            <p><strong>Es Grado Uno o Dos:</strong> {task.isGradeoneortwo}</p>
            <p><strong>Semestre:</strong> {task.semester}</p>
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
  );
};

export default DataComponents;
