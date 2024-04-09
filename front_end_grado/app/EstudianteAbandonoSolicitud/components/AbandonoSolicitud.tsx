import React from 'react';
import { useDesertions } from '../providers/StudentRequestProvider'; // Asegúrate de importar correctamente useDesertions desde donde lo hayas definido

const EstudianteAbandonoSolicitud = () => {
    const { createDesertion } = useDesertions();

    const handleAbandonClick = async () => {
        // Suponiendo que el ID del usuario que desea abandonar es 1
        const desertionRequest = {
            usersIdUsers: {
                idUsers: 4
            },
            reason: "No tengo progreso"
        };

        await createDesertion(desertionRequest);
    };

    return (
        <div>
            <h1>Quiero abandonar</h1>
            <button onClick={handleAbandonClick} style={{color: "orange"}}>Abandonar</button>
        </div>
    );
};

export default EstudianteAbandonoSolicitud;
