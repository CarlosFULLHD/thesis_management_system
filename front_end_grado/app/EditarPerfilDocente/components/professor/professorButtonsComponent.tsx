import React, { useEffect } from 'react';
import { Card, CardBody, Input } from "@nextui-org/react";
import { useCombined } from '../../provider/CombinedProvider'; // Ajustada la importación
import { useSession } from '@/app/providers/SessionProvider';

export const ProfessorButton: React.FC = () => {
    const { professor, loadData } = useCombined();
    const { userDetails } = useSession();

    useEffect(() => {
        loadData(); // Cargar los datos del profesor
    }, [loadData]);

    if (!professor) {
        return <p>No hay información disponible.</p>;
    }
    if (userDetails?.role === 'DOCENTE') {
        return (
            <>
                <h3>Subjects</h3>
                {professor.subjects.map((subject, index) => (
                    <div key={index}>
                        <p>
                            <strong>{subject.subjectName}:</strong> {subject.comments}
                        </p>
                    </div>
                ))}
                <h3>Social Networks</h3>
                {professor.socialNetworks.map((network, index) => (
                    <div key={index}>
                        <img src={network.icon} alt="Social Icon" style={{ width: 20, height: 20 }} />
                        <a href={network.urlLinkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px' }}>
                            LinkedIn
                        </a>
                    </div>
                ))}
            </>
        );
    }
};
