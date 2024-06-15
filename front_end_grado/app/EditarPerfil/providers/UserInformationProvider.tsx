"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { BASE_URL } from "@/config/globals";
import { toast } from "react-toastify";
import { useSession } from "@/app/providers/SessionProvider";

interface UserInformationProviderProps {
  children: ReactNode;
}

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
  id: number;
  urlLinkedin: string;
}

interface UserInformationContextProps {
  userInformation: UserInformation | null;
  loading: boolean;
  error: string | null;
  updateUserInformation: (updatedData: UserInformation) => Promise<void>;
  addSubject: (newSubject: {
    subjectName: string;
    comments: string;
  }) => Promise<void>;
  updateSubject: (
    subjectId: number,
    updatedData: { subjectName?: string; comments?: string }
  ) => Promise<void>;
  linkExistingSubject: (subjectId: number, comments: string) => Promise<void>;
  deactivateSubject: (subjectId: number) => Promise<void>;
  fetchAllSubjects: () => Promise<Subject[]>;
  updateSubjectComments: (
    userId: number,
    subjectId: number,
    comments: string
  ) => Promise<void>;
  createNewSubject: (subjectName: string, comments: string) => Promise<void>;
  fetchSubjectsForUser: (userId: number) => Promise<Subject[]>; // Añadido fetchSubjectsForUser
}

const UserInformationContext = createContext<
  UserInformationContextProps | undefined
>(undefined);

export const UserInformationProvider = ({
  children,
}: UserInformationProviderProps) => {
  const [userInformation, setUserInformation] =
    useState<UserInformation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { userDetails } = useSession();
  const userId = userDetails?.userId;

  useEffect(() => {
    const fetchUserInformation = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<UserInformation>(
          `${BASE_URL}users/users-information/${userId}`
        );
        setUserInformation(response.data);
        toast.success("User information fetched successfully");
      } catch (error) {
        setError("Error fetching user information");
        toast.error("Error fetching user information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInformation();
  }, [userId]);

  const updateUserInformation = async (updatedData: UserInformation) => {
    try {
      await axios.put(`${BASE_URL}users/update/${userId}`, updatedData);
      setUserInformation(updatedData);
      toast.success("User information updated successfully");
    } catch (error) {
      toast.error("Error updating user information. Please try again.");
    }
  };

  const addSubject = async (newSubject: {
    subjectName: string;
    comments: string;
  }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}subjects/${userId}/choose`, // Corregido el endpoint para addSubject
        newSubject
      );
      setUserInformation((prev) =>
        prev ? { ...prev, subjects: [...prev.subjects, response.data] } : null
      );
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error("Error adding subject. Please try again.");
    }
  };

  const createNewSubject = async (subjectName: string, comments: string) => {
    try {
      const response = await axios.post(`${BASE_URL}subjects/${userId}/new`, {
        subjectName,
        comments,
      });
      setUserInformation((prev) =>
        prev ? { ...prev, subjects: [...prev.subjects, response.data] } : null
      );
      toast.success("New subject created successfully");
    } catch (error) {
      toast.error("Error creating new subject. Please try again.");
    }
  };

  const updateSubject = async (
    subjectId: number,
    updatedData: { subjectName?: string; comments?: string }
  ) => {
    try {
      await axios.patch(
        `${BASE_URL}subjects/${userId}/${subjectId}`,
        updatedData
      );
      setUserInformation((prev) => {
        if (!prev) return null;
        const updatedSubjects = prev.subjects.map((subject) =>
          subject.id === subjectId ? { ...subject, ...updatedData } : subject
        );
        return { ...prev, subjects: updatedSubjects };
      });
      toast.success("Subject updated successfully");
    } catch (error) {
      toast.error("Error updating subject. Please try again.");
    }
  };

  const updateSubjectComments = async (
    userId: number,
    subjectId: number,
    comments: string
  ) => {
    try {
      await axios.patch(`${BASE_URL}subjects/${userId}/${subjectId}/comments`, {
        comments,
      });
      if (userInformation) {
        const updatedSubjects = userInformation.subjects.map((subject) =>
          subject.id === subjectId ? { ...subject, comments } : subject
        );
        setUserInformation({ ...userInformation, subjects: updatedSubjects });
      }
      toast.success("Subject comments updated successfully");
    } catch (error) {
      toast.error("Error updating subject comments. Please try again.");
    }
  };

  const linkExistingSubject = async (subjectId: number, comments: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}subjects/${userId}/choose`,
        { subjectId, comments }
      );
      setUserInformation((prev) =>
        prev ? { ...prev, subjects: [...prev.subjects, response.data] } : null
      );
      toast.success("Subject linked successfully");
    } catch (error) {
      toast.error("Error linking subject. Please try again.");
    }
  };

  const deactivateSubject = async (subjectId: number) => {
    try {
      await axios.patch(
        `${BASE_URL}subjects/${userId}/${subjectId}/deactivate`
      );
      setUserInformation((prev) => {
        if (!prev) return null;
        const updatedSubjects = prev.subjects.filter(
          (subject) => subject.id !== subjectId
        );
        return { ...prev, subjects: updatedSubjects };
      });
      toast.success("Subject deactivated successfully");
    } catch (error) {
      toast.error("Error deactivating subject. Please try again.");
    }
  };

  const fetchAllSubjects = async (): Promise<Subject[]> => {
    try {
      const response = await axios.get<Subject[]>(`${BASE_URL}subjects`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching all subjects. Please try again.");
      return [];
    }
  };

  const fetchSubjectsForUser = async (userId: number): Promise<Subject[]> => {
    try {
      const response = await axios.get<Subject[]>(
        `${BASE_URL}subjects/users-information/${userId}`
      );
      return response.data;
    } catch (error) {
      toast.error("Error fetching subjects for user. Please try again.");
      return [];
    }
  };

  return (
    <UserInformationContext.Provider
      value={{
        userInformation,
        loading,
        error,
        updateUserInformation,
        addSubject,
        createNewSubject,
        updateSubject,
        linkExistingSubject,
        deactivateSubject,
        updateSubjectComments,
        fetchAllSubjects,
        fetchSubjectsForUser, // Añadido fetchSubjectsForUser al provider
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useUserInformation = () => {
  const context = useContext(UserInformationContext);
  if (context === undefined) {
    throw new Error(
      "useUserInformation must be used within a UserInformationProvider"
    );
  }
  return context;
};
