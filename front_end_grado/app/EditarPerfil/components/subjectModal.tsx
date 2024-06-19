import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useUserInformation } from "../providers/UserInformationProvider";
import { useSession } from "@/app/providers/SessionProvider";

interface Subject {
  id: number;
  subjectName: string;
  comments: string;
}

const SubjectsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    fetchSubjectsForUser,
    fetchAllSubjects,
    linkExistingSubject,
    createNewSubject,
    updateSubjectComments,
  } = useUserInformation();
  const { userDetails } = useSession();
  const userId = userDetails?.userId;

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectComments, setNewSubjectComments] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (isOpen && userId) {
      fetchSubjectsForUser(userId).then(setSubjects);
      fetchAllSubjects().then(setAvailableSubjects);
    }
  }, [userId, isOpen, fetchSubjectsForUser, fetchAllSubjects]);

  const handleLinkSubject = async () => {
    if (selectedSubjectId === "new") {
      await createNewSubject(newSubjectName, newSubjectComments);
    } else if (selectedSubjectId) {
      await linkExistingSubject(
        parseInt(selectedSubjectId),
        newSubjectComments
      );
    }
    setNewSubjectName("");
    setNewSubjectComments("");
    setSelectedSubjectId(null);
    fetchSubjectsForUser(userId!).then(setSubjects);
  };

  const handleUpdateComments = async (subjectId: number, comments: string) => {
    await updateSubjectComments(userId!, subjectId, comments);
    fetchSubjectsForUser(userId!).then(setSubjects);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Subjects</ModalHeader>
        <ModalBody>
          {subjects.map((subject) => (
            <div key={subject.id} style={{ marginBottom: "16px" }}>
              <Input
                label="Subject Name"
                value={subject.subjectName}
                isDisabled
                fullWidth
              />
              <Textarea
                isDisabled
                label="Comments"
                value={subject.comments}
                onChange={(e) =>
                  handleUpdateComments(subject.id, e.target.value)
                }
                fullWidth
                rows={4}
              />
            </div>
          ))}
          {/* <Select
            label="Select a Subject"
            placeholder="Select a subject"
            onChange={(e) => setSelectedSubjectId(e.target.value)}
          >
            {availableSubjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id.toString()}>
                {subjects.subjectName}
              </SelectItem>
            ))}
            <SelectItem key="new" value="new">
              Crear nueva especialidad
            </SelectItem>
          </Select> */}
          {selectedSubjectId && (
            <>
              <Textarea
                label="Comments"
                placeholder="Enter comments"
                value={newSubjectComments}
                onChange={(e) => setNewSubjectComments(e.target.value)}
                fullWidth
                rows={4}
              />
              <Button onClick={handleLinkSubject} color="primary">
                Guardar
              </Button>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubjectsModal;
