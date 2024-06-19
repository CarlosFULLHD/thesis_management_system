import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const SocialNetworksModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  socialNetworks: any[];
}> = ({ isOpen, onClose, socialNetworks }) => {
  const { onOpenChange } = useDisclosure();

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h3>Social Networks</h3>
            </ModalHeader>
            <ModalBody>
              {socialNetworks.map((network, index) => (
                <div key={index}>
                  <img
                    src={network.icon}
                    alt="Social Icon"
                    style={{ width: 20, height: 20 }}
                  />
                  <a
                    href={network.urlLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "8px" }}
                  >
                    LinkedIn
                  </a>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SocialNetworksModal;
