"use client";
import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { useTaskCounts } from '../../providers/taskCountProvider';

const PieChartComponent: React.FC = () => {
  const { taskCounts } = useTaskCounts();

  const chartData = [
    { title: 'ABIERTO', value: taskCounts.find(tc => tc.description === 'ABIERTO')?.quantity || 0, color: 'rgb(33, 150, 243)' },
    { title: 'EN ESPERA', value: taskCounts.find(tc => tc.description === 'EN ESPERA')?.quantity || 0, color: 'rgb(255, 193, 7)' },
    { title: 'APROBADO', value: taskCounts.find(tc => tc.description === 'APROBADO')?.quantity || 0, color: 'rgb(76, 175, 80)' },
    { title: 'APROBADO CON OBS', value: taskCounts.find(tc => tc.description === 'APROBADO CON OBS')?.quantity || 0, color: 'rgb(255, 152, 0)' },
    { title: 'DESAPROBADO', value: taskCounts.find(tc => tc.description === 'DESAPROBADO')?.quantity || 0, color: 'rgb(244, 67, 54)' },
    { title: 'SIN CALIFICAR', value: taskCounts.find(tc => tc.description === 'SIN CALIFICAR')?.quantity || 0, color: 'rgb(158, 158, 158)' }
  ];

  return (
    <div className="flex flex-col">
      <h1><strong>Datos estadísticos de las tareas según su estado</strong></h1>
      <div style={{ flexGrow: 1 }}>
        <PieChart
          style={{ height: '200px', width: '200px' }}
          data={chartData}
        />
      </div>
      <div>
        {chartData.map((data) => {
          const totalTasks = taskCounts.reduce((sum, tc) => sum + tc.quantity, 0);
          const percentage = totalTasks ? (data.value / totalTasks) * 100 : 0;
          return (
            <div key={data.title} className="flex items-center mb-2">
              <div style={{ width: 20, height: 20, backgroundColor: data.color }}></div>
              <div style={{ marginLeft: 8 }}>{`${data.title} - ${Math.round(percentage)} %`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChartComponent;
