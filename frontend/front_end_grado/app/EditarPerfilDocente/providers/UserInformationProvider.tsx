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
}

interface UserInformationContextProps {
  userInformation: UserInformation | null;
  loading: boolean;
  error: string | null;
  updateUserInformation: (updatedData: UserInformation) => Promise<void>;
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

  return (
    <UserInformationContext.Provider
      value={{ userInformation, loading, error, updateUserInformation }}
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
