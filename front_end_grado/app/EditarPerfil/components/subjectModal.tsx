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
    addSubject,
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
    const loadSubjects = async () => {
      if (userId) {
        const userSubjects = await fetchSubjectsForUser(userId);
        setSubjects(userSubjects);
      }
    };
    loadSubjects();
  }, [userId, fetchSubjectsForUser]);

  useEffect(() => {
    const loadAllSubjects = async () => {
      const subjects = await fetchAllSubjects();
      setAvailableSubjects(subjects);
    };
    loadAllSubjects();
  }, [fetchAllSubjects]);

  const handleAddSubject = async () => {
    if (selectedSubjectId === "new") {
      await createNewSubject(newSubjectName, newSubjectComments);
    } else if (selectedSubjectId) {
      const selectedSubject = availableSubjects.find(
        (subject) => subject.id === parseInt(selectedSubjectId)
      );
      if (selectedSubject) {
        await addSubject({
          subjectName: selectedSubject.subjectName,
          comments: newSubjectComments,
        });
      }
    }
    setNewSubjectName("");
    setNewSubjectComments("");
    setSelectedSubjectId(null);
    const userSubjects = await fetchSubjectsForUser(userId!);
    setSubjects(userSubjects);
  };

  const handleUpdateComments = async (subjectId: number, comments: string) => {
    await updateSubjectComments(userId!, subjectId, comments);
    const userSubjects = await fetchSubjectsForUser(userId!);
    setSubjects(userSubjects);
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-5xl"
    >
      <ModalContent>
        <>
          <ModalHeader>
            <h3>Subjects</h3>
          </ModalHeader>
          <ModalBody>
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <div key={subject.id} style={{ marginBottom: "16px" }}>
                  <Input
                    label="Subject Name"
                    value={subject.subjectName}
                    isDisabled
                    fullWidth
                  />
                  <Textarea
                    label="Comments"
                    value={subject.comments}
                    onChange={(e) =>
                      handleUpdateComments(subject.id, e.target.value)
                    }
                    fullWidth
                    rows={4}
                  />
                </div>
              ))
            ) : (
              <div>
                <p>No subjects found</p>
              </div>
            )}
            <div style={{ marginTop: "32px" }}>
              <h4>Add New Subject</h4>
              {/* <Select
                label="Subject"
                placeholder="Select a subject"
                onSelectionChange={(key) =>
                  setSelectedSubjectId(key.toString())
                }
              >
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id.toString()}>
                    {subject.subjectName}
                  </option>
                ))}
                <option key="new" value="new">
                  Crear nueva especialidad
                </option>
              </Select> */}
              {selectedSubjectId === "new" && (
                <>
                  <Input
                    label="New Subject Name"
                    placeholder="Enter new subject name"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    fullWidth
                  />
                  <Textarea
                    label="Comments"
                    placeholder="Enter comments"
                    value={newSubjectComments}
                    onChange={(e) => setNewSubjectComments(e.target.value)}
                    fullWidth
                    rows={4}
                  />
                </>
              )}
              {selectedSubjectId && selectedSubjectId !== "new" && (
                <Textarea
                  label="Comments"
                  placeholder="Comments"
                  value={newSubjectComments}
                  onChange={(e) => setNewSubjectComments(e.target.value)}
                  fullWidth
                  rows={4}
                />
              )}
              <Button
                onClick={handleAddSubject}
                color="primary"
                style={{ marginTop: "16px" }}
              >
                Add Subject
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default SubjectsModal;
