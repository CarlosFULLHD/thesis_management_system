"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const data = [
  { id: 1, name: 'Tony Reichert', role: 'CEO', status: 'Active' },
  { id: 2, name: 'Zoey Lang', role: 'Technical Lead', status: 'Paused' },
  // Add more data objects as needed
];

const InfoTable = () => {

    return (
        <Table aria-label="Example dynamic collection table">
        <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
            {data.map((item) => (
            <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.status}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    );

}

export default InfoTable;