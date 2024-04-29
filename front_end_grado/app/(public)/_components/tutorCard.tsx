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
  ModalContent,
  Link,
} from "@nextui-org/react";
import Image from "next/image";

interface Tutor {
  fullName: string;
  email: string;
  imageUrl: string;
  subjectNames: string[];
  urlLinkedin: string;
  icon: string;
}

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(tutor);
  return (
    <>
      <Card isPressable onPress={onOpen} className="m-2 w-[340px]">
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
            {tutor.subjectNames.map((subjectNames, index) => (
              <div
                className="bg-custom-blue-font text-white rounded-md m-2 p-1 block text-center"
                key={index}
              >
                {subjectNames}
              </div>
            ))}
          </div>
          <Button
            as={Link}
            target="_blank"
            className="bg-blue-25 w-12"
            href={tutor.urlLinkedin}
          >
            <img src={tutor.icon} alt="LinkedIn" width={24} height={24} />
          </Button>
        </CardBody>
      </Card>
      <Modal
        backdrop="transparent"
        placement="center"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        className="flex flex-col gap-1"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h1>{tutor.fullName}</h1>
              </ModalHeader>
              <ModalBody>
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
                <div className="ml-4">
                  {tutor.subjectNames.map((subject, index) => (
                    <div key={index} className="mt-2">
                      <h3 className="bg-custom-blue-font text-white rounded-md p-1 text-center">
                        {subject}
                      </h3>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TutorCard;
