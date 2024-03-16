"use client";
import { useQuery } from "@tanstack/react-query"; // React query useQuery
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react"; // Next js table
import InfoTableTitle from "./InfoTableTitle"; // Title for the table
import DeleteInfoButton from "./DeleteInfoButton"; // Delete button component
import UpdateInfoButton from "./UpdateInfoButton"; // Update button component
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect } from 'react';
import { usePublicInfo, PublicInfoItem } from "../providers/PublicInfoProvider";

const InfoTable = () => {

  // React state
  const { publicInfoMap, addPublicInfo,cleanPublicInfoMap } = usePublicInfo();

  // Query fetching end point, being called as soon the component renders it
  const { data, isLoading, isError } = useQuery({
    queryKey: ["infoTable"],
    queryFn: () =>
      fetch(`${BASE_URL}publicInformation/`).then((res) => res.json()),
  });

  // Only will trigger if data is fetched
  useEffect(() => {
    const publicInfoMapItems: Map<number, PublicInfoItem> = (new Map());
    if (!isLoading && !isError && data["status"] == "200") {
      {
        cleanPublicInfoMap();  // Purging map 
        data["result"].map((publicInfo: PublicInfoItem) => (
          publicInfoMapItems.set(publicInfo.idPublicInfo, publicInfo)))

        //publicInfoItems.push(publicInfo)));
      }
    }
    addPublicInfo(publicInfoMapItems) // Loading array
    
  }, [data, isLoading, isError]); // Dependencies array ensures this runs only when these values change

  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Loading..." />;
  }

  // Error state
  if (isError) {
    return <div>Oops!</div>;
  }


  // Success state
  if (publicInfoMap.size > 0){
  return (
    <div>
      <InfoTableTitle />
      <Table aria-label="Example dynamic collection table">
        <TableHeader>
          <TableColumn>Creador</TableColumn>
          <TableColumn>Rol</TableColumn>
          <TableColumn>Titulo</TableColumn>
          <TableColumn>Detalle</TableColumn>
          <TableColumn>Fecha creación</TableColumn>
          <TableColumn>Modificar</TableColumn>
          <TableColumn>Eliminar</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from(publicInfoMap.values()).map((publicInfo: PublicInfoItem) => (
            <TableRow key={publicInfo.idPublicInfo}>
              <TableCell>{`${publicInfo.roleHasPersonIdRolePer.personIdPerson.name} ${publicInfo.roleHasPersonIdRolePer.personIdPerson.fatherLastName} ${publicInfo.roleHasPersonIdRolePer.personIdPerson.motherLastName}`}</TableCell>
              <TableCell>
                {publicInfo.roleHasPersonIdRolePer.rolesIdRole.userRole}
              </TableCell>
              <TableCell>{publicInfo.title}</TableCell>
              <TableCell>{publicInfo.information}</TableCell>
              <TableCell>{publicInfo.createdAt.toString()}</TableCell>
              <TableCell>{UpdateInfoButton(publicInfo.idPublicInfo)}</TableCell>
              <TableCell>{DeleteInfoButton(publicInfo.idPublicInfo)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
  }
  else {
    return <div>No existen entradas, información pública</div>;
  }

 
};

export default InfoTable;
