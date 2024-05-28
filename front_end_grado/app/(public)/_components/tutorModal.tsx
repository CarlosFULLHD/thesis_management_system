"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Spinner,
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
      backdrop="blur"
      placement="center"
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      className="flex flex-col gap-2 bg-white dark:bg-background-dark rounded-lg shadow-lg p-6"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h1 className="text-2xl font-bold text-center">
                {tutorDetails?.fullName}
              </h1>
            </ModalHeader>
            <ModalBody>
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner label="Cargando..." />
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <img
                      src={tutorDetails?.imageUrl}
                      width={100}
                      height={100}
                      alt={tutorDetails?.fullName}
                      className="rounded-full mb-4"
                      style={{ objectFit: "cover" }}
                    />
                    <h1 className="font-bold text-lg mb-2">
                      {tutorDetails?.fullName}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email: {tutorDetails?.email}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                      Descripción: {tutorDetails?.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Especialidades:</h2>
                    {tutorDetails?.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="bg-blue-light dark:bg-blue-dark font-bold text-white rounded-md p-2 mt-2 text-center"
                      >
                        {subject.subjectName}:
                        <br />
                        {subject.comments}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Redes Sociales:</h2>
                    <div className="flex gap-4 mt-2">
                      {tutorDetails?.socialNetworks.map((network, index) => (
                        <Button
                          as="a"
                          href={network.urlLinkedin}
                          target="_blank"
                          key={index}
                          className="bg-off-white w-12 h-12 rounded-full flex items-center justify-center"
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
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TutorModal;
