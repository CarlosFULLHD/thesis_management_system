
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { CircularProgress } from "@nextui-org/react";
import React, { useState } from 'react';
import { TaskItem, useTask } from "../providers/TaskProvider";
import NewTask from "./NewTask";
import TaskTableTitle from "./TaskTableTitle";
import TaskTableComponent from "./TaskTableComponent";


const TaskTable = () => {
    // Importing data and method from provider
    const { taskMap, fetchTask } = useTask();
    // States for workshops maps
    const [tasksWorkShopOne, setTasksWorkShopOne] = useState<Map<number, TaskItem>>(new Map());
    const [tasksWorkShopTwo, setTasksWorkShopTwo] = useState<Map<number, TaskItem>>(new Map());

    // Callback to add a task to work shop one map
    const addTasksWorkShopOne = (newTask: TaskItem) => {
        setTasksWorkShopOne((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(newTask.idTask, newTask);
            return newMap;
        });
    }

    // Callback to delete a task from the workshopone map
    const deleteTaskWorkShopOne = (taskId: number) => {
        setTasksWorkShopOne((prevMap) => {
            const updatedMap = new Map(prevMap);
            updatedMap.delete(taskId);
            return updatedMap;
        });
    };

    // Callback to update a task from the workshopone map
    const updateTaskWorkShopOne = (taskId: number, newTask: TaskItem) => {
        setTasksWorkShopOne((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(taskId, newTask);
            return newMap;
        });
    }

    // Callback to add a task to work shop two map
    const addTasksWorkShopTwo = (newTask: TaskItem) => {
        setTasksWorkShopTwo((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(newTask.idTask, newTask);
            return newMap;
        });
    }

    // Callback to delete a task from the map
    const deleteTaskWorkShopTwo = (taskId: number) => {
        setTasksWorkShopTwo((prevMap) => {
            const updatedMap = new Map(prevMap);
            updatedMap.delete(taskId);
            return updatedMap;
        });
    };

    // Callback to update a task from the workshopone map
    const updateTaskWorkShopTwo = (taskId: number, newTask: TaskItem) => {
        setTasksWorkShopOne((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(taskId, newTask);
            return newMap;
        });
    }

    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}task/`).then((res) => res.json());

    // Loading state
    const loadTaskMap = (responseData: any) => {
        const taskMapItems: Map<number, TaskItem> = (new Map());
        if (responseData.status == 200) {
            {
                responseData["result"].map((task: TaskItem) => {
                    // Loading original map
                    taskMapItems.set(task.idTask, task);
                    // Separating maps
                    if (task.isGradeoneortwo == 1) {
                        setTasksWorkShopOne(prevMap => new Map(prevMap).set(task.idTask, task))
                    } else if (task.isGradeoneortwo == 2) {
                        setTasksWorkShopTwo(prevMap => new Map(prevMap).set(task.idTask, task))
                    }
                });
            }
        }
        fetchTask(taskMapItems) // Changing provider state
        // Loading workshop maps
    }

    //Query that fetches the end point, being called as soon the component builds it self
    const { isLoading, isError } = useQuery({
        queryKey: ["taskTable"],
        queryFn: async () => {
            const data = await fetchData();
            loadTaskMap(data)
            return data
        }
    })

    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Cargando..." />;
    }
    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }

    // Success state
    if (taskMap.size > 0) {

        return (
            <div>
                <TaskTableTitle />
                <NewTask onAddTaskOne={addTasksWorkShopOne} onAddTaskTwo={addTasksWorkShopTwo} />
                <div>
                    <TaskTableComponent taskMap={tasksWorkShopOne} deleteCallBack={deleteTaskWorkShopOne} updateCallBack={updateTaskWorkShopOne} title="Actividades TALLER DE GRADO 1" workshop="TALLER 1" />
                </div>
                <div>
                    <TaskTableComponent taskMap={tasksWorkShopTwo} deleteCallBack={deleteTaskWorkShopTwo} updateCallBack={updateTaskWorkShopTwo} title="Actividades TALLER DE GRADO 2" workshop="TALLER 2" />
                </div>
            </div>
        );
    }
    else {
        return <div>
            <NewTask onAddTaskOne={addTasksWorkShopOne} onAddTaskTwo={addTasksWorkShopTwo} />
            <h1>No existen entradas, de tareas</h1></div>;
    }
}

export default TaskTable;