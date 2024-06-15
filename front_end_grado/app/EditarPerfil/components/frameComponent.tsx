// import React, { useState } from 'react';
// import { PersonCard } from './personCardComponent';
// import { ProfessorImages } from './professor/professorImageComponent';
// import { useCombined } from '../provider/CombinedProvider';
// import { Card, CardBody, CardHeader, Input, Button, Textarea, CardFooter } from "@nextui-org/react";
// import { useUserApi } from '../provider/UserContextProvider';
// import axios from 'axios';
// import { BASE_URL } from '@/config/globals';
// import { ProfessorButton } from './professor/professorButtonsComponent';

// const FrameComponent: React.FC = () => {
//     const { person } = useCombined();
//     const { user } = useUserApi();

//     const [cellPhone, setCellPhone] = useState(user?.cellPhone || '');
//     const [description, setDescription] = useState(person?.description || '');

//     if (!person) {
//         return <p>No hay información disponible.</p>;
//     }

//     const handleSave = async () => {
//         try {
//             const response = await axios.put(
//                 `${BASE_URL}person/${user?.personId}/personal-info`,
//                 {
//                     cellphone: cellPhone,
//                     description: description
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             if (response.status === 202) {
//                 console.log('Personal information updated successfully');
//             } else {
//                 console.error('Failed to update personal information:', response.status);
//             }
//         } catch (error) {
//             console.error('Error updating personal information:', error);
//         }
//     };

//     return (
//         <div style={{ padding: '16px' }}>
//             <div className="flex justify-between items-center">
//                 <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 px-4 py-2">
//                     EDITAR MI PERFIL
//                 </h1>
//             </div>

//             <Card style={{ marginBottom: '16px' }}>
//                 <CardHeader>
//                     <ProfessorImages />
//                 </CardHeader>
//                 <CardBody>
//                     <Input
//                         isReadOnly
//                         type="text"
//                         label="Nombre"
//                         variant="bordered"
//                         color="primary"
//                         defaultValue={user?.name}
//                         description="Campo no modificable"
//                         className="max-w-xxl"
//                     />
//                     <Input
//                         isReadOnly
//                         type="text"
//                         label="Apellido Paterno"
//                         variant="bordered"
//                         color="primary"
//                         defaultValue={user?.fatherLastName}
//                         description="Campo no modificable"
//                         className="max-w-xxl"
//                     />
//                     <Input
//                         isReadOnly
//                         type="text"
//                         label="Apellido Materno"
//                         variant="bordered"
//                         color="primary"
//                         defaultValue={user?.motherLastName}
//                         description="Campo no modificable"
//                         className="max-w-xxl"
//                     />
//                     <Input
//                         isReadOnly
//                         type="email"
//                         label="Email"
//                         variant="bordered"
//                         color="primary"
//                         defaultValue={person.email}
//                         description="Campo no modificable"
//                         className="max-w-xxl"
//                     />
//                     <Input
//                         type="number"
//                         label="Celular"
//                         variant="bordered"
//                         color="primary"
//                         defaultValue={user?.cellPhone}
//                         onChange={(e) => setCellPhone(e.target.value)}
//                         className="max-w-xxl"
//                     />
//                     <Textarea
//                         label="Descripción"
//                         variant="bordered"
//                         color="success"
//                         defaultValue={person.description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         className="max-w-xxl"
//                         rows={5}
//                     />
//                 </CardBody>
//                 <CardFooter>
//                     <Button color="success" onClick={handleSave}>
//                         Guardar Cambios
//                     </Button>
//                     <ProfessorButton/>
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// };

// export default FrameComponent;
