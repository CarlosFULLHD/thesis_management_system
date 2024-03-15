import { useQuery } from "@tanstack/react-query"; // React query useQuery
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react"; // Next js table 
import  InfoTableTitle  from "./InfoTableTitle"; // Title for the table
import DeleteInfoButton  from "./DeleteInfoButton"; // Delete button component
import UpdateInfoButton  from "./UpdateInfoButton"; // Update button component
import { BASE_URL } from "@/config/globals"; // Global url for my endpoint
import {CircularProgress} from "@nextui-org/react";

const InfoTable = () => {

    // Query fetching end point, being called as soon the component renders it
    const { data, isLoading, isError } = useQuery({
        queryKey: ["infoTable"],
        queryFn: () =>
            fetch(`${BASE_URL}publicInformation/` ).then((res) =>
                res.json()
            ),
    });
    // Handling errors
    if (isLoading) {
        return <CircularProgress aria-label="Loading..." />
    }
    if (isError) {
        return <div>Oops!</div>
    }
    // Setting a type for the result
    type InfoTableItem = {
        idPublicInfo: number,
        roleHasPersonIdRolePer: {
            idRolePer: number,
            rolesIdRole: {
                idRole: number,
                userRole: string,
                status: number,
                createdAt: Date
            },
            personIdPerson: {
                idPerson: number,
                ci: string,
                name: string,
                fatherLastName: string,
                motherLastName: string,
                description: string,
                email: string,
                cellPhone: string,
                status: number,
                createdAt: Date
            },
            status: number,
            createdAt: Date
        },
        title: string,
        information: string,
        status: number,
        createdAt: Date
    };



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
                    {data["result"].map((infoTable: InfoTableItem) => (
                        <TableRow key={infoTable.idPublicInfo}>
                            <TableCell>{`${infoTable.roleHasPersonIdRolePer.personIdPerson.name} ${infoTable.roleHasPersonIdRolePer.personIdPerson.fatherLastName} ${infoTable.roleHasPersonIdRolePer.personIdPerson.motherLastName}`}</TableCell>
                            <TableCell>{infoTable.roleHasPersonIdRolePer.rolesIdRole.userRole}</TableCell>
                            <TableCell>{infoTable.title}</TableCell>
                            <TableCell>{infoTable.information}</TableCell>
                            <TableCell>{infoTable.createdAt.toString()}</TableCell>
                            <TableCell>{UpdateInfoButton(infoTable.idPublicInfo)}</TableCell>
                            <TableCell>{DeleteInfoButton(infoTable.idPublicInfo)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default InfoTable;