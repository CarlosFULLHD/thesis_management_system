// "use client";
// import React from "react";
// import {
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Button,
// } from "@nextui-org/react";

// interface Tutor {
//   fullName: string;
//   description: string;
//   email: string;
//   cellPhone: string;
// }

// interface TutorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tutor: Tutor;
// }

// const TutorModal: React.FC<TutorModalProps> = ({ isOpen, onClose, tutor }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalHeader>
//         <h1>{tutor.fullName}</h1>
//       </ModalHeader>
//       <ModalBody>
//         <h2>{tutor.description}</h2>
//         <h3>Email: {tutor.email}</h3>
//         <h4>Cell Phone: {tutor.cellPhone}</h4>
//       </ModalBody>
//       <ModalFooter>
//         <Button color="danger" onClick={onClose}>
//           Close
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default TutorModal;
