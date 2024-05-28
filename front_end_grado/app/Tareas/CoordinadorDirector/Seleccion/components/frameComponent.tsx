"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Pagination,
} from "@nextui-org/react";
import TitleComponent from "./titleComponent";
import { useTasks } from "../../providers/taskGradeProfileProvider";
import PieChartComponent from "./chartComponent"; // Import the new component

interface FrameComponentProps {
  idGradePro: number;
}

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
  const {
    tasks,
    totalPages,
    currentPage,
    setTotalPages,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = useTasks();
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        Cantidad de tareas por página:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={(event) => handlePageSizeChange(Number(event.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
    );
  }, [totalPages, currentPage, pageSize]);

  const bottonContent = useMemo(() => {
    return (
      <div className="mx-auto block">
        <Pagination
          isCompact
          showControls
          showShadow
          total={totalPages}
          color="secondary"
          page={currentPage + 1}
          onChange={(newPage) => setCurrentPage(newPage - 1)}
        />
      </div>
    );
  }, [totalPages, currentPage, pageSize]);

  if (tasks.length > 0) {
    // Check if there are tasks
    return (
      <>
        <TitleComponent
          studentName={
            tasks.length > 0
              ? tasks[0].name +
                " " +
                tasks[0].fatherLastName +
                " " +
                tasks[0].motherLastName
              : ""
          }
        />
        {TopContent}
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col">
            {tasks.map((task, index) => (
              <Card key={index} className="mb-4 pd-4">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{task.titleTask}</p>
                    <p className="text-small text-default-500">
                      {task.taskStateDescription}
                    </p>
                  </div>
                </CardHeader>

                <CardBody>
                  <p>
                    <strong>Comentarios:</strong> {task.feedback}
                  </p>
                  <p>
                    <strong>Es URL:</strong> {task.url ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>Es Reunión:</strong> {task.meeting ? "Sí" : "No"}
                  </p>
                </CardBody>

                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      Desde:
                    </p>
                    <p className=" text-default-400 text-small">
                      {" "}
                      {task.publicationDate}{" "}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {" "}
                      Hasta:
                    </p>
                    <p className="text-default-400 text-small">
                      {" "}
                      {task.deadline}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex-2">
            <Card>
              <CardHeader className="flex gap-3 flex-row">
                <div className="flex flex-col mt-0">
                  <p className="text-md">
                    Nombre: {tasks.length > 0 ? tasks[0].name : ""}{" "}
                    {tasks.length > 0 ? tasks[0].fatherLastName : ""}{" "}
                    {tasks.length > 0 ? tasks[0].motherLastName : ""}
                  </p>
                  <p className="text-small text-default-500">
                    CI: {tasks.length > 0 ? tasks[0].ci : ""}
                  </p>
                  <p className="text-small text-default-500">
                    Email: {tasks.length > 0 ? tasks[0].email : ""}
                  </p>
                  <p className="text-small text-default-500">
                    Teléfono: {tasks.length > 0 ? tasks[0].cellPhone : ""}
                  </p>
                  <p className="text-small text-default-500">
                    Descripción:{" "}
                    {tasks.length > 0 ? tasks[0].personDescription : ""}
                  </p>
                  <p className="text-small text-default-500">
                    <strong>Título del Perfil:</strong>{" "}
                    {tasks.length > 0 ? tasks[0].gradeProfileTitle : ""}
                  </p>
                </div>
                <PieChartComponent />
              </CardHeader>

              <CardBody></CardBody>
            </Card>
          </div>
        </div>
        {bottonContent}
      </>
    );
  } else {
    return <>Problemas al conseguir perfil de grado</>;
  }
};

export default FrameComponent;
