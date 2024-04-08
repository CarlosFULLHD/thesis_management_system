
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react"; // Next js table
import InfoTableTitle from "./InfoTableTitle"; // Title for the table
import DeleteInfoButton from "./DeleteInfoButton"; // Delete button component
import UpdateInfoButton from "./UpdateInfoButton"; // Update button component
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { CircularProgress } from "@nextui-org/react";
import React from 'react';
import { usePublicInfo, PublicInfoItem } from "../providers/PublicInfoProvider";
import NewPublicInfo from "./NewPublicInfo";

const InfoTable = () => {

  // React state
  const { publicInfoMap, fetchPublicInfo } = usePublicInfo();

  // Fetch data function
  const fetchData = async () => fetch(`${BASE_URL}publicInformation/c`).then((res) => res.json());

  // Loading state
  const loadPublicInfoMap = (responseData: any) => {
    const publicInfoMapItems: Map<number, PublicInfoItem> = (new Map());
    if (responseData["status"] == "200") {
      {
        responseData["result"].map((publicInfo: PublicInfoItem) => (
          publicInfoMapItems.set(publicInfo.idPublicInfo, publicInfo)))
      }
    }
    fetchPublicInfo(publicInfoMapItems) // Loading array
  }

  // Query fetching end point, being called as soon the component renders it
  const { isLoading, isError } = useQuery({
    queryKey: ["infoTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadPublicInfoMap(data)
      return data
    }
  });

  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  // Error state
  if (isError) {
    return <div>Oops!</div>;
  }

  // Success state
  if (publicInfoMap.size > 0) {
    return (
      <div>
        <NewPublicInfo />
        <InfoTableTitle />
        <Table aria-label="Example dynamic collection table">
          <TableHeader>
          <TableColumn>Fecha creación</TableColumn>
            <TableColumn>Creador</TableColumn>
            <TableColumn>Titulo</TableColumn>
            <TableColumn>Detalle</TableColumn>
            <TableColumn>Fecha publicación</TableColumn>
            <TableColumn>Fecha límite</TableColumn>
            <TableColumn>Modificar</TableColumn>
            <TableColumn>Eliminar</TableColumn>
          </TableHeader>
          <TableBody>
            {Array.from(publicInfoMap.values()).map((publicInfo: PublicInfoItem) => (
              <TableRow key={publicInfo.idPublicInfo}>
                <TableCell>{formatDate(publicInfo.createdAt)}</TableCell>
                <TableCell>{`${publicInfo.usersIdUsers.personIdPerson.name} ${publicInfo.usersIdUsers.personIdPerson.fatherLastName} ${publicInfo.usersIdUsers.personIdPerson.motherLastName}`}</TableCell>
                <TableCell>{publicInfo.title}</TableCell>
                <TableCell>{publicInfo.information}</TableCell>
                <TableCell>{formatDate(publicInfo.publicationDate)}</TableCell>
                <TableCell>{formatDate(publicInfo.deadline)}</TableCell>
                <TableCell><UpdateInfoButton idPublicInfo={publicInfo.idPublicInfo} /></TableCell>
                <TableCell><DeleteInfoButton idPublicInfo={publicInfo.idPublicInfo} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    );
  }
  else {
    return <div>
      <NewPublicInfo />
      <h1>No existen entradas, información pública</h1></div>;
  }
};



function formatDate(dateInput: Date) {
  // Parse the dateInput to a Date object if it's not already one
  const date = new Date(dateInput);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading 0 if needed
  const day = date.getDate().toString().padStart(2, '0'); // Add leading 0 if needed
  const hours = date.getHours().toString().padStart(2, '0'); // Add leading 0 if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading 0 if needed
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Add leading 0 if needed

  // Construct the formatted string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default InfoTable;
