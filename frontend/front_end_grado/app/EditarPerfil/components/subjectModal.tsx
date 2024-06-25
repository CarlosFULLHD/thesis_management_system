import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useUserInformation } from "../providers/UserInformationProvider";
import { useSession } from "@/app/providers/SessionProvider";

interface Subject {
  idSubject: number;
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
    updateSubjectComments,
    deactivateSubject,
  } = useUserInformation();
  const { userDetails } = useSession();
  const userId = userDetails?.userId;

  const [currentSubjects, setCurrentSubjects] = useState<Subject[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [comments, setComments] = useState<Record<number, string>>({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen && userId) {
      fetchSubjectsForUser(userId).then((subjects) => {
        setCurrentSubjects(subjects);
        const initialComments = subjects.reduce(
          (acc, curr) => ({ ...acc, [curr.idSubject]: curr.comments }),
          {} as Record<number, string>
        );
        setComments(initialComments);
      });
      fetchAllSubjects().then(setAvailableSubjects);
    }
  }, [isOpen, userId, fetchSubjectsForUser, fetchAllSubjects]);

  const handleLinkSubject = async () => {
    if (selectedSubjectId && userId) {
      await linkExistingSubject(selectedSubjectId, newComment);
      fetchSubjectsForUser(userId).then((subjects) => {
        setCurrentSubjects(subjects);
        const updatedComments = subjects.reduce(
          (acc, curr) => ({ ...acc, [curr.idSubject]: curr.comments }),
          {} as Record<number, string>
        );
        setComments(updatedComments);
      });
      setSelectedSubjectId(null); // Reset the selection
      setNewComment(""); // Clear the comment field
    }
  };

  const handleUpdateComments = async (idSubject: number) => {
    const comment = comments[idSubject];
    if (userId && comment !== undefined) {
      await updateSubjectComments(userId, idSubject, comment);
      fetchSubjectsForUser(userId).then((subjects) => {
        setCurrentSubjects(subjects);
        const updatedComments = subjects.reduce(
          (acc, curr) => ({ ...acc, [curr.idSubject]: curr.comments }),
          {} as Record<number, string>
        );
        setComments(updatedComments);
      });
    }
  };

  const handleCommentChange = (idSubject: number, newComment: string) => {
    setComments((prev) => ({ ...prev, [idSubject]: newComment }));
  };

  const handleDeactivateSubject = async (idSubject: number) => {
    if (userId) {
      await deactivateSubject(idSubject);
      fetchSubjectsForUser(userId).then((subjects) => {
        setCurrentSubjects(subjects);
        const updatedComments = subjects.reduce(
          (acc, curr) => ({ ...acc, [curr.idSubject]: curr.comments }),
          {} as Record<number, string>
        );
        setComments(updatedComments);
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Materias o Rubros (Experiencia)</ModalHeader>
        <ModalBody>
          {currentSubjects.map((subject) => (
            <div key={subject.idSubject} style={{ marginBottom: "16px" }}>
              <Input
                label="Subject Name"
                value={subject.subjectName}
                isDisabled
                fullWidth
              />
              <Textarea
                label="Comments"
                value={comments[subject.idSubject] || ""}
                onChange={(e) =>
                  handleCommentChange(subject.idSubject, e.target.value)
                }
                fullWidth
                rows={4}
              />
              <Button
                onClick={() => handleUpdateComments(subject.idSubject)}
                color="primary"
              >
                Guardar Cambio
              </Button>
              <Button
                onClick={() => handleDeactivateSubject(subject.idSubject)}
                color="danger"
                style={{ marginLeft: "8px" }}
              >
                Ocultar
              </Button>
            </div>
          ))}
          <Select
            label="Choose a Subject"
            placeholder="Select a subject"
            onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
          >
            {availableSubjects.map((subject) => (
              <SelectItem
                key={subject.idSubject}
                value={subject.idSubject.toString()}
              >
                {subject.subjectName}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            label="Experiencia"
            placeholder="Escribe la experiencia en este rubro o materia"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            rows={4}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleLinkSubject} color="primary">
            Guardar
          </Button>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubjectsModal;
