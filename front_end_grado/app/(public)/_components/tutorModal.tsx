"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { useTutors } from "../_providers/tutorsProvider"; // Asegúrate de que el path sea correcto

interface Subject {
  subjectName: string;
  comments: string;
}

interface SocialNetwork {
  urlLinkedin: string;
  icon: string;
}

interface TutorDetails {
  fullName: string;
  description: string;
  email: string;
  imageUrl: string;
  subjects: Subject[];
  socialNetworks: SocialNetwork[];
}

interface TutorModalProps {
  idPerson: string;
  isOpen: boolean;
  onClose: () => void;
}

const TutorModal: React.FC<TutorModalProps> = ({
  idPerson,
  isOpen,
  onClose,
}) => {
  const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { fetchTutorById } = useTutors();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const details = await fetchTutorById(idPerson);
      setTutorDetails(details);
      setLoading(false);
    };

    if (isOpen) {
      fetchDetails();
    }
  }, [idPerson, isOpen, fetchTutorById]);

  return (
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
              <h1>{tutorDetails?.fullName}</h1>
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="flex flex-row">
                    <img
                      src={tutorDetails?.imageUrl}
                      width={75}
                      height={75}
                      alt={tutorDetails?.fullName}
                      style={{ objectFit: "cover" }}
                      className="rounded-lg mr-4"
                    />
                    <div>
                      <h1 className="font-bold">{tutorDetails?.fullName}</h1>
                      <p>Email: {tutorDetails?.email}</p>
                      <p>Description: {tutorDetails?.description}</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h2>Subjects:</h2>
                    {tutorDetails?.subjects.map((subject, index) => (
                      <div key={index} className="mt-2">
                        <h3 className="bg-custom-blue-font text-white rounded-md p-1 text-center">
                          {subject.subjectName}: {subject.comments}
                        </h3>
                      </div>
                    ))}
                    <h2>Social Networks:</h2>
                    <div className="mt-4">
                      {tutorDetails?.socialNetworks.map((network, index) => (
                        <Button
                          as="a"
                          href={network.urlLinkedin}
                          target="_blank"
                          key={index}
                          className="bg-blue-25 w-12 mb-2"
                        >
                          <img
                            src={network.icon}
                            alt="LinkedIn"
                            width={24}
                            height={24}
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
  );
};

export default TutorModal;
