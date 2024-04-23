"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/globals"; // Make sure this URL is correctly configured to your backend endpoint

interface Tutor {
  fullName: string;
  description: string;
  email: string;
  cellPhone: string;
  imageUrl: string;
  subjectNames: string[];
  comments: string[];
  urlLinkedin: string;
  icon: string;
}

interface TutorsResponse {
  timeStamp: string;
  status: string;
  message: string;
  result: Tutor[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface TutorsContextType {
  tutors: Tutor[];
  fetchTutors: (
    page: number,
    size: number,
    sort?: string,
    subject?: string
  ) => void;
}

const TutorsContext = createContext<TutorsContextType | undefined>(undefined);

export const TutorsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);

  // Fetching tutors with pagination and optional sorting and filtering
  const fetchTutors = async (
    page: number = 0,
    size: number = 10,
    sort: string = "",
    subject: string = ""
  ) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...(sort && { sort }),
      ...(subject && { subject }),
    });

    await toast
      .promise(
        axios.get<TutorsResponse>(
          `${BASE_URL}professor/tutores?${params.toString()}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        ),
        {
          pending: "Fetching tutors...",
          success: "Tutors fetched successfully",
          error: "Failed to fetch tutors",
        }
      )
      .then((response) => {
        if (response.data.status === "200") {
          setTutors(response.data.result);
          console.log(response.data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
        throw error;
      });
  };

  useEffect(() => {
    fetchTutors(); // Initial fetch with default parameters
  }, []);

  return (
    <TutorsContext.Provider value={{ tutors, fetchTutors }}>
      {children}
    </TutorsContext.Provider>
  );
};

export const useTutors = (): TutorsContextType => {
  const context = useContext(TutorsContext);
  if (!context) {
    throw new Error("useTutors must be used within a TutorsProvider");
  }
  return context;
};
