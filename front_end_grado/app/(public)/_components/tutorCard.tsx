"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";

interface Tutor {
  fullName: string;
  imageUrl: string;
  description: string;
  email: string;
  cellPhone: string;
}

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card isPressable onPress={onOpen} className="m-2">
        <CardBody>
          <Image
            src={tutor.imageUrl}
            width={300}
            height={200}
            alt={tutor.fullName}
            style={{ objectFit: "cover" }}
          />
        </CardBody>
        <CardFooter>
          <div className="flex flex-wrap justify-between items-center">
            <h1>{tutor.fullName}</h1>
            <Button color="primary" onClick={onOpen}>
              View Details
            </Button>
          </div>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>
          <h1>{tutor.fullName}</h1>
        </ModalHeader>
        <ModalBody>
          <h2>{tutor.description}</h2>
          <h3>Email: {tutor.email}</h3>
          <h4>Cell Phone: {tutor.cellPhone}</h4>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TutorCard;
