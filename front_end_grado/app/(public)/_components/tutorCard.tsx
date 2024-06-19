"use client";
import React from "react";
import {
  Card,
  CardBody,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import TutorModal from "./tutorModal";

interface SocialNetwork {
  urlLinkedin: string;
  icon: string;
}

interface Tutor {
  idPerson: string;
  fullName: string;
  email: string;
  imageUrl: string;
  subjects: string[];
  socialNetworks: SocialNetwork[];
}

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  console.log(tutor);
  return (
    <>
      <Card
        isPressable
        onPress={handleOpenModal}
        className="m-2 w-[340px] bg-white dark:bg-background-darker shadow-lg rounded-lg"
      >
        <CardBody className="p-4">
          <div className="flex flex-row items-center">
            <img
              src={tutor.imageUrl}
              width={75}
              height={75}
              alt={tutor.fullName}
              className="rounded-lg mr-4"
            />
            <div>
              <h1 className="font-bold text-lg">{tutor.fullName}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Email: {tutor.email}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-sm font-semibold">Especialidades:</h2>
            {tutor.subjects.map((subject, index) => (
              <div
                className="bg-blue-light dark:bg-blue-dark font-bold text-white rounded-md m-1 p-1 text-center text-xs"
                key={index}
              >
                {subject}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {tutor.socialNetworks.map((network, index) => (
              <Button
                key={index}
                as={Link}
                target="_blank"
                className="bg-off-white w-8 h-8 rounded-full flex items-center justify-center"
                href={network.urlLinkedin}
              >
                <img src={network.icon} alt="LinkedIn" width={16} height={16} />
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>
      <TutorModal
        idPerson={tutor.idPerson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default TutorCard;
