import { CircularProgress } from "@nextui-org/react";
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
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useTasks } from '../../providers/taskGradeProfileProvider'; // Import the hook
import { PieChart } from 'react-minimal-pie-chart';

interface FrameComponentProps {
    idGradePro: number;
}
type TaskStateCounts = {
    [key: string]: number;
};

const FrameComponent = ({ idGradePro }: FrameComponentProps) => {
    const {
        tasks,
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
    } = useTasks();
    // Provider and methods
    // const { tasks, loadTasks } = useTasks(); // Use the hook
    const [name ,setName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    // Component flag
    const [componentFlag, setComponentFlag] = useState<number>(0);
    // Callback for component flag
    const componentFlagCallback = ( newFlag : number) => {
        setComponentFlag(newFlag)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
      }
    
      const handlePageChange = (value: number) => {
        setCurrentPage(value);
      }
    
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
        )
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
        )
      }, [totalPages, currentPage, pageSize]);

    // const { isLoading, isError } = useQuery({
    //     queryKey: ["tasks"],
    //     queryFn: async () => {
    //         await loadTasks(); // Load the tasks
    //         return tasks; // Return the tasks
    //     }
    // })
    // Fetching state
    // if (isLoading) {
    //     return <CircularProgress aria-label="Cargando..." />;
    // }
    // // Error state
    // if (isError) {
    //     return <div>Oops!</div>;
    // }
    // Success state

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
    
    if (tasks.length > 0) { // Check if there are tasks
        return (
            <>
            <TitleComponent
                studentName={tasks.length > 0 ? tasks[0].name +" " +
                     tasks[0].fatherLastName + " " +
                     tasks[0].motherLastName : ''}
            />
            {TopContent}
            <div className="flex h-full w-full">
                <div className="flex-1">
                    {tasks.map((task, index) => (
                    <Card key={index} className='mb-4 pd-4'>
                        <CardHeader className="flex gap-3">
                            <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                            />
                            <div className="flex flex-col">
                            <p className="text-md">{task.titleTask}</p>
                            <p className="text-small text-default-500">{task.taskStateDescription}</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                        <p><strong>Comentarios:</strong> {task.feedback}</p>
                        {/* <p><strong>Orden:</strong> {task.orderIs}</p> */}
                        <p><strong>Es URL:</strong> {task.url ? 'Sí' : 'No'}</p>
                        <p><strong>Es Reunión:</strong> {task.meeting ? 'Sí' : 'No'}</p>
                        </CardBody>
                        <Divider/>
                        <CardFooter className="gap-3">
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">Desde:</p>
                                <p className=" text-default-400 text-small"> {task.publicationDate} </p>
                            </div>
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small"> Hasta:</p>
                                <p className="text-default-400 text-small"> {task.deadline}</p>
                            </div>
                        </CardFooter>
                    </Card>
                    ))}
                </div>
                <div className="flex-2">
                    <Card>
                    <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">Nombre: {tasks.length > 0 ? tasks[0].name : ''} {tasks.length > 0 ? tasks[0].fatherLastName : ''} {tasks.length > 0 ? tasks[0].motherLastName : ''}</p>
                        <p className="text-small text-default-500">CI: {tasks.length > 0 ? tasks[0].ci : ''}</p>
                        <p className="text-small text-default-500">Email: {tasks.length > 0 ? tasks[0].email : ''}</p>
                        <p className="text-small text-default-500">Teléfono: {tasks.length > 0 ? tasks[0].cellPhone : ''}</p>
                        <p className="text-small text-default-500">Descripción: {tasks.length > 0 ? tasks[0].personDescription : ''}</p>
                        <p className="text-small text-default-500"><strong>Título del Perfil:</strong> {tasks.length > 0 ? tasks[0].gradeProfileTitle : ''}</p>
                    </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="flex flex-col">
                        <div className="mb-4">
                        {/* <p><strong>Estado del Modo de Graduación:</strong> {tasks.length > 0 ? tasks[0].statusGraduationMode : ''}</p>
                        <p><strong>Es Grado Uno o Dos:</strong> {tasks.length > 0 ? tasks[0].isGradeoneortwo : ''}</p>
                        */}</div>
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
            {bottonContent}           
            </>
        )
    } else {
        return (
            <>Problemas al conseguir perfil de grado</>
        );
    }
}

export default FrameComponent;