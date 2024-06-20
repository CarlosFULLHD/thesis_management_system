"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spacer,
  Card,
} from "@nextui-org/react";
import { useUserInformation } from "../providers/UserInformationProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { toast } from "react-toastify";

interface UserInformation {
  ci: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  description: string;
  email: string;
  cellPhone: string;
  imageUrl: string;
  subjects: Subject[];
  socialNetworks: SocialNetwork[];
}
interface Subject {
  id: number;
  subjectName: string;
  comments: string;
}

interface SocialNetwork {
  idSocial: number;
  urlLinkedin: string;
}

const NetworksModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { fetchSocialNetworks, deleteSocialNetwork, createSocialNetwork } =
    useUserInformation();
  const { userDetails } = useSession();
  const userId = userDetails?.userId;

  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [adding, setAdding] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId && isOpen) {
      setIsLoading(true);
      fetchSocialNetworks(userId)
        .then((networks) => {
          setSocialNetworks(networks); // Assumes networks is directly an array of SocialNetwork
          setError("");
        })
        .catch((error) => {
          console.error("Failed to fetch social networks:", error);
          setError("Failed to load social networks");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId, isOpen, fetchSocialNetworks]);

  const handleDeleteNetwork = async (idSocial: number) => {
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    if (idSocial === undefined) {
      console.error("Social network ID is undefined");
      toast.error("Cannot delete an undefined social network.");
      return;
    }

    try {
      const success = await deleteSocialNetwork(userId, idSocial);
      if (success) {
        setSocialNetworks(
          socialNetworks.filter((net) => net.idSocial !== idSocial)
        );
        toast.success("Social network deleted successfully");
      } else {
        throw new Error("Deletion was not successful");
      }
    } catch (error) {
      console.error("Failed to delete social network:", error);
      toast.error("Failed to delete social network. Please try again.");
    }
  };

  const handleAddNetwork = async () => {
    if (userId && newSocialUrl) {
      try {
        const newNetwork = await createSocialNetwork(userId, newSocialUrl);
        if (newNetwork) {
          setSocialNetworks([...socialNetworks, newNetwork]);
          setNewSocialUrl("");
          setAdding(false);
        }
      } catch (error) {
        console.error("Failed to create social network:", error);
      }
    }
  };

  const handleCancelAdd = () => {
    setNewSocialUrl("");
    setAdding(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>Gestión de Redes Sociales</h3>
        </ModalHeader>
        <ModalBody>
          {socialNetworks.map((network) => (
            <Card key={network.idSocial}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>{network.urlLinkedin}</div>
                <Button
                  color="danger"
                  onClick={() => handleDeleteNetwork(network.idSocial)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
          {adding ? (
            <>
              <Input
                fullWidth
                label="Nueva URL de LinkedIn"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
              />
              <Spacer y={1} />
              <Button color="success" onClick={handleAddNetwork}>
                Guardar
              </Button>
              <Button color="danger" onClick={handleCancelAdd}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button onClick={() => setAdding(true)}>Añadir Red Social</Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NetworksModal;
