import React, { useEffect } from 'react';
import { Card, CardBody, Input } from "@nextui-org/react";
import { useCombined } from '../../provider/CombinedProvider'; // Ajustada la importación
import { useSession } from '@/app/providers/SessionProvider';

export const ProfessorImages: React.FC = () => {
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
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img
                        src={professor.imageUrl}
                        alt="Professor"
                        style={{ width: 100, height: 100, borderRadius: '50%' }}
                    />
                </div>
            </>
        );
    }
};
