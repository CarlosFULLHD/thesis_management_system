import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { useCombined } from '../../provider/CombinedProvider';

const SubjectsModal: React.FC<{ isOpen: boolean, onClose: () => void, professorId: number }> = ({ isOpen, onClose, professorId }) => {
    const { professor, updateSubject, addSubject } = useCombined();
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newSubjectComments, setNewSubjectComments] = useState('');
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    const handleUpdateSubject = (subjectId: number, subjectName: string) => {
        updateSubject(professorId, subjectId, subjectName);
    };

    const handleAddSubject = () => {
        addSubject(professorId, { subjectName: newSubjectName, comments: newSubjectComments });
        setNewSubjectName('');
        setNewSubjectComments('');
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior as "inside" | "normal" | "outside" | undefined} className="max-w-5xl">
            <ModalContent>
                <>
                    <ModalHeader>
                        <h3>Subjects</h3>
                    </ModalHeader>
                    <ModalBody>
                        {professor?.subjects.map((subject, index) => (
                            <div key={index} style={{ marginBottom: '16px' }}>
                                <Input
                                    label="Subject Name"
                                    value={subject.subjectName}
                                    onChange={(e) => handleUpdateSubject(subject.id, e.target.value)}
                                    fullWidth
                                />
                                <p>{subject.comments}</p>
                            </div>
                        ))}
                        <div style={{ marginTop: '32px' }}>
                            <h4>Add New Subject</h4>
                            <Input
                                label="Subject Name"
                                placeholder="New Subject Name"
                                value={newSubjectName}
                                onChange={(e) => setNewSubjectName(e.target.value)}
                                fullWidth
                            />
                            <Textarea
                                label="Comments"
                                placeholder="Comments"
                                value={newSubjectComments}
                                onChange={(e) => setNewSubjectComments(e.target.value)}
                                fullWidth
                                rows={4}
                            />
                            <Button onClick={handleAddSubject} color="primary" style={{ marginTop: '16px' }}>Add Subject</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default SubjectsModal;
