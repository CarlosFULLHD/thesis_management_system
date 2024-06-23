// import React, { useState, useEffect } from 'react';
// import { Button } from "@nextui-org/react";
// import { useCombined } from '../../provider/CombinedProvider';
// import { useSession } from '@/app/providers/SessionProvider';
// import SubjectsModal from './subjectModal';
// import SocialNetworksModal from './socialNetworkModal';

// export const ProfessorButton: React.FC = () => {
//     const { professor, loadData } = useCombined();
//     const { userDetails } = useSession();
//     const [isSubjectsModalOpen, setIsSubjectsModalOpen] = useState(false);
//     const [isSocialNetworksModalOpen, setIsSocialNetworksModalOpen] = useState(false);

//     useEffect(() => {
//         loadData(); // Cargar los datos del profesor
//     }, [loadData]);

//     if (!professor) {
//         return <p></p>;
//     }

//     const openSubjectsModal = () => setIsSubjectsModalOpen(true);
//     const closeSubjectsModal = () => setIsSubjectsModalOpen(false);
//     const openSocialNetworksModal = () => setIsSocialNetworksModalOpen(true);
//     const closeSocialNetworksModal = () => setIsSocialNetworksModalOpen(false);

//     if (userDetails?.role === 'DOCENTE') {
//         return (
//             <div>
//                 <Button onClick={openSubjectsModal}>Show Subjects</Button>
//                 <Button onClick={openSocialNetworksModal}>Show Social Networks</Button>

//                 <SubjectsModal
//                     isOpen={isSubjectsModalOpen}
//                     onClose={closeSubjectsModal}
//                     professorId={userDetails.userId}
//                 />

//                 <SocialNetworksModal
//                     isOpen={isSocialNetworksModalOpen}
//                     onClose={closeSocialNetworksModal}
//                     socialNetworks={professor.socialNetworks}
//                 />
//             </div>
//         );
//     }
//     return null;
// };
