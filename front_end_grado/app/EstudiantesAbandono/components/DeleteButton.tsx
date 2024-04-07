import React from 'react';
import axios from 'axios';
import { Button } from "@nextui-org/react";
import { BASE_URL } from "@/config/globals";

interface DeleteButtonProps {
    idDesertion: number;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ idDesertion, onSuccess }) => {
    const deleteDesertion = async () => {
        try {
            await axios.post(`${BASE_URL}accept/${idDesertion}`);
            onSuccess(); // Llama a onSuccess después de una eliminación exitosa
        } catch (error) {
            console.error('Error durante la eliminación:', error);
        }
    };

    return (
        <Button color="warning" onClick={deleteDesertion}>
            Delete
        </Button>
    );
};

export default DeleteButton;
