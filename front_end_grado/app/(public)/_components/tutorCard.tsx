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
      <Card isPressable onPress={handleOpenModal} className="m-2 w-[340px]">
        <CardBody>
          <div className="flex flex-row">
            <img
              src={tutor.imageUrl}
              width={75}
              height={75}
              alt={tutor.fullName}
              style={{ objectFit: "cover" }}
              className="rounded-lg mr-4"
            />
            <div>
              <h1 className="font-bold">{tutor.fullName}</h1>
              <p>Email: {tutor.email}</p>
            </div>
          </div>
          <div className="">
            <h2 className="mt-1">Especialidades:</h2>
            {tutor.subjects.map((subject, index) => (
              <div
                className="bg-custom-blue-font text-white rounded-md m-2 p-1 block text-center"
                key={index}
              >
                {subject}
              </div>
            ))}
          </div>
          {tutor.socialNetworks.map((network, index) => (
            <Button
              key={index}
              as={Link}
              target="_blank"
              className="bg-blue-25 w-12"
              href={network.urlLinkedin}
            >
              <img src={network.icon} alt="LinkedIn" width={24} height={24} />
            </Button>
          ))}
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
