import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import { User } from "../providers/UserDashboardProvider";

interface Role {
  idRole: number;
  userRole: string;
}

interface EditUserModalProps {
  userId: number | null;
  isOpen: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  userId,
  isOpen,
  onClose,
  refreshUsers,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    fatherLastName: "",
    motherLastName: "",
    ci: "",
    description: "",
    email: "",
    cellPhone: "",
    role: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentRole, setCurrentRole] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}roles/all`);
        setRoles(response.data.result);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Error al obtener roles.");
      }
    };

    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId !== null) {
        try {
          const response = await axios.get(`${BASE_URL}users/${userId}`);
          const user = response.data.result;
          setFormData({
            name: user.name,
            fatherLastName: user.fatherLastName,
            motherLastName: user.motherLastName,
            ci: user.ci,
            description: user.description,
            email: user.email,
            cellPhone: user.cellPhone,
            role: user.userRole,
          });
          setCurrentRole(user.userRole);
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Error al obtener detalles del usuario.");
        }
      }
    };

    if (isOpen) {
      fetchUserDetails();
    }
  }, [userId, isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (selected: string | Set<string>) => {
    const roleId = Array.isArray(selected) ? selected[0] : selected;
    setFormData((prevData) => ({
      ...prevData,
      role: roleId,
    }));
  };

  const handleSubmit = async () => {
    if (userId === null) return;
    try {
      const response = await axios.put(`${BASE_URL}users/${userId}`, {
        ...formData,
        roleId: formData.role,
      });
      if (response.status === 200) {
        toast.success("Usuario actualizado correctamente.");
        refreshUsers();
        onClose();
      } else {
        toast.error("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error al actualizar el usuario.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Editar Usuario
          </ModalHeader>
          <ModalBody>
            <Input
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Apellido Paterno"
              name="fatherLastName"
              value={formData.fatherLastName}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Apellido Materno"
              name="motherLastName"
              value={formData.motherLastName}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Carnet de Identidad"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              fullWidth
              label="Teléfono Celular"
              name="cellPhone"
              value={formData.cellPhone}
              onChange={handleChange}
            />
            <Select
              label="Rol"
              placeholder="Selecciona un rol"
              value={formData.role}
              onChange={(value) => handleRoleChange(value as unknown as string)}
            >
              {roles && roles.length > 0 ? (
                roles
                  .filter((role) => role.userRole !== currentRole)
                  .map((role) => (
                    <SelectItem
                      key={role.idRole}
                      value={role.idRole.toString()}
                    >
                      {role.userRole}
                    </SelectItem>
                  ))
              ) : (
                <SelectItem value="" key={""}>
                  No roles available
                </SelectItem>
              )}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Guardar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
