"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Spinner,
} from "@nextui-org/react"; // Next js table
import InfoTableTitle from "./InfoTableTitle"; // Title for the table
import DeleteInfoButton from "./DeleteInfoButton"; // Delete button component
import UpdateInfoButton from "./UpdateInfoButton"; // Update button component
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { usePublicInfo, PublicInfoItem } from "../providers/PublicInfoProvider";
import NewPublicInfo from "./NewPublicInfo";

const InfoTable = () => {
  const { publicInfoMap, fetchPublicInfo } = usePublicInfo();
  const [selectedInfo, setSelectedInfo] = useState<PublicInfoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () =>
    fetch(`${BASE_URL}publicInformation/c`).then((res) => res.json());

  const loadPublicInfoMap = (responseData: any) => {
    const publicInfoMapItems: Map<number, PublicInfoItem> = new Map();
    if (responseData["status"] === "200") {
      responseData["result"].forEach((publicInfo: PublicInfoItem) =>
        publicInfoMapItems.set(publicInfo.idPublicInfo, publicInfo)
      );
    }
    fetchPublicInfo(publicInfoMapItems);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["infoTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadPublicInfoMap(data);
      return data;
    },
  });

  const handleOpenModal = (publicInfo: PublicInfoItem) => {
    setSelectedInfo(publicInfo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedInfo(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Spinner aria-label="Loading..." />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Oops! Ocurrió un error al cargar los datos.
      </div>
    );
  }

  if (publicInfoMap.size > 0) {
    return (
      <div className="p-4">
        <InfoTableTitle />
        <NewPublicInfo />

        <Table aria-label="Información pública" className="mt-4">
          <TableHeader>
            <TableColumn>Fecha creación</TableColumn>
            <TableColumn>Creado por</TableColumn>
            <TableColumn>Título</TableColumn>
            <TableColumn>Contenido</TableColumn>
            <TableColumn>Fecha publicación</TableColumn>
            <TableColumn>Fecha límite</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.from(publicInfoMap.values()).map(
              (publicInfo: PublicInfoItem) => (
                <TableRow key={publicInfo.idPublicInfo}>
                  <TableCell>{formatDate(publicInfo.createdAt)}</TableCell>
                  <TableCell>{`${publicInfo.usersIdUsers.personIdPerson.name} ${publicInfo.usersIdUsers.personIdPerson.fatherLastName} ${publicInfo.usersIdUsers.personIdPerson.motherLastName}`}</TableCell>
                  <TableCell>{publicInfo.title}</TableCell>
                  <TableCell>
                    <div className="truncate">
                      {publicInfo.information.length > 50
                        ? `${publicInfo.information.substring(0, 50)}... `
                        : publicInfo.information}
                      {publicInfo.information.length > 50 && (
                        <Tooltip content="Leer más">
                          <Button
                            onClick={() => handleOpenModal(publicInfo)}
                            className="bg-blue-light text-white font-bold"
                          >
                            Leer más
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(publicInfo.publicationDate)}
                  </TableCell>
                  <TableCell>{formatDate(publicInfo.deadline)}</TableCell>
                  <TableCell className="flex flex-row gap-2">
                    <UpdateInfoButton idPublicInfo={publicInfo.idPublicInfo} />
                    <DeleteInfoButton idPublicInfo={publicInfo.idPublicInfo} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          <ModalContent>
            <ModalHeader>
              <span className="text-lg font-bold">{selectedInfo?.title}</span>
            </ModalHeader>
            <ModalBody>
              <p>{selectedInfo?.information}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <NewPublicInfo />
        <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark py-6">
          No existen entradas de información pública
        </h1>
      </div>
    );
  }
};

function formatDate(dateInput: Date) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default InfoTable;
