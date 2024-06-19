import React from 'react';
import { Card, CardBody, Input } from "@nextui-org/react";
import { useCombined } from '../provider/CombinedProvider'; // Ajustada la importación

export const PersonCard: React.FC = () => {
    const { person } = useCombined();

    if (!person) {
        return <p>No hay información disponible.</p>;
    }

    return (
        <Card style={{ marginBottom: '16px' }}>
            <CardBody>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img
                        src={person.imageUrl}
                        alt="Person"
                        style={{ width: 100, height: 100, borderRadius: '50%' }}
                    />
                </div>
                <Input
                    isReadOnly
                    type="text"
                    label="Nombre Completo"
                    variant="bordered"
                    color="primary"
                    defaultValue={person.fullName}
                    description="Campo no modificable"
                    className="max-w-xs"
                />
                <Input
                    isReadOnly
                    type="email"
                    label="Email"
                    variant="bordered"
                    color="primary"
                    defaultValue={person.email}
                    description="Campo no modificable"
                    className="max-w-xs"
                />
                <Input
                    type="text"
                    label="Descripción"
                    variant="bordered"
                    color="success"
                    defaultValue={person.description}
                    className="max-w-xs"
                />
                {/* <h3>Subjects</h3>
                {person.subjects.map((subject, index) => (
                    <div key={index}>
                        <p>
                            <strong>{subject.subjectName}:</strong> {subject.comments}
                        </p>
                    </div>
                ))}
                <h3>Social Networks</h3>
                {person.socialNetworks.map((network, index) => (
                    <div key={index}>
                        <img src={network.icon} alt="Social Icon" style={{ width: 20, height: 20 }} />
                        <a href={network.urlLinkedin} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '8px' }}>
                            LinkedIn
                        </a>
                    </div>
                ))} */}
            </CardBody>
        </Card>
    );
};
