import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Estilo predeterminado
import { Value } from "react-calendar/dist/cjs/shared/types";

interface CalendarComponentProps {
  onDateSelect: (newDate: Date | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateSelect }) => {
  const [date, setDate] = useState<Date | null>(new Date()); // Permitir que el estado pueda ser también null

  const handleDateChange = (newDate: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Verificar si el nuevo valor es null o un arreglo
    if (newDate === null || Array.isArray(newDate)) {
      console.log("No date selected"); // Mostrar en consola cuando no se selecciona fecha
      setDate(null);
      onDateSelect(null); // Avisar al componente padre que no hay fecha seleccionada
      return;
    }
    const formattedDate = (newDate as Date).toISOString().split('T')[0]; // Convertir la fecha a formato yyyy-mm-dd
    console.log("Selected Date:", formattedDate); // Mostrar la fecha seleccionada en consola
    setDate(newDate);
    onDateSelect(newDate as Date); // Envía la fecha seleccionada al componente padre
  };

  return (
    <div style={{ 
        width: '100%', 
        maxWidth: '300px', 
        margin: 'auto', 
        height: '10%', 
        maxHeight: '300px'
      }}>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
