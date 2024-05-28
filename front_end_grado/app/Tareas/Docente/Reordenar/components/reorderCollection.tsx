import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { FaCheckCircle, FaLock, FaLockOpen } from "react-icons/fa";
import { Reorder } from "framer-motion";

import { TaskInterface, useTasks } from "../../providers/tasksProvider";

interface ReorderCollectionProps {
  idGradePro: number;
}

const ReorderCollection = ({ idGradePro }: ReorderCollectionProps) => {
  // Importing data and method from provider
  const { taskList, loadTaskList } = useTasks();

  // State to handle the lock for the list
  const [isReorderEnabled, setIsReorderEnabled] = useState(true);
  // Lock or unlock reorder
  const toggleReorder = () => {
    setIsReorderEnabled(!isReorderEnabled);
  };

  // New Reorder list
  const [newTaskList, setNewTaskList] = useState<TaskInterface[]>([]);
  // Callback to handle reorder
  const handleReorder = (newList: TaskInterface[]) => {
    const updatedList = newList.map((task, index) => ({
      ...task,
      orderIs: index + 1, // Update order based on new index
    }));
    setNewTaskList(updatedList);
  };

  // Callback to handle update is meeting
  const updateTaskIsMeeting = (idTask: number, newIsMeeting: number): void => {
    setNewTaskList((currentTasks: TaskInterface[]) => {
      const updatedTasks = currentTasks.map((task: TaskInterface) =>
        task.task?.idTask == idTask
          ? { ...task, isMeeting: newIsMeeting }
          : task
      );
      return updatedTasks;
    });
  };

  useEffect(() => {
    setNewTaskList(taskList);
  }, [taskList]);

  const { isLoading, isError } = useQuery({
    queryKey: ["academicPeriodHasGradeProfile"],
    queryFn: async () => {
      await loadTaskList(idGradePro);
      return taskList;
    },
  });
  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }
  // Error state
  if (isError) {
    return <div>Oops!</div>;
  }
  if (taskList.length > 0) {
    return (
      <>
        <div>
          <p className="text-lg text-center px-4">
            Arrastre las tareas y reordenelas en el orden que quiera, después
            presione ""
          </p>
        </div>
        <div className=" p-4 rounded-lg shadow-md">
          <Button
            onClick={toggleReorder}
            variant="bordered"
            color={isReorderEnabled ? "success" : "warning"}
            startContent={
              isReorderEnabled ? (
                <div>
                  <FaLockOpen />
                </div>
              ) : (
                <div>
                  <FaLock />
                </div>
              )
            }
          ></Button>
          <Reorder.Group
            values={taskList}
            onReorder={handleReorder} // Handles reordering logic
          >
            {newTaskList.map((item, index) => (
              <Reorder.Item
                value={item}
                key={item.task?.idTask}
                dragListener={isReorderEnabled}
              >
                <Card className="m-8">
                  <CardBody>
                    <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                      <div className="relative col-span-6 md:col-span-4 flex flex-col items-center justify-center space-y-2">
                        <p className="text-md mt-2">
                          <b>Tarea #{index + 1}</b>
                        </p>
                        <Divider />
                        <div className="flex flex-col items-start w-full"></div>
                        <Divider />
                      </div>
                      <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-0">
                            <h3 className="font-semibold text-foreground/90">
                              Título: {item.task?.titleTask}
                            </h3>
                            <p className="text-small text-foreground/80">
                              <b>Descripción:</b> {item.task?.task}
                            </p>
                          </div>
                        </div>
                        <Divider />
                        <div className="relative col-span-6 md:col-span-4 flex flex-col items-center justify-center space-y-2">
                          <p className="text-md mt-2">
                            <b>Fechas </b>
                          </p>

                          <div className="w-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <Divider />
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className=" items-center">
          <Button
            color="success"
            startContent={<FaCheckCircle />}
            //onClick={() => confirmationModal()}
          >
            Guardar
          </Button>
        </div>
      </>
    );
  }
};

export default ReorderCollection;
