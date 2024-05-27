import React from 'react';
import { Card, CardBody, Input } from "@nextui-org/react";
import { usePerson } from '../provider/PersonContextProvider'; // Ajusta la ruta según sea necesario
import { PersonCard } from './personCardComponent';

const FrameComponent: React.FC = () => {
    return (
        <div style={{ padding: '16px' }}>
            <PersonCard />
        </div>
    );
};

export default FrameComponent;
