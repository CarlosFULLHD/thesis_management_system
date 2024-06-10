"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/globals";

interface SocialNetwork {
  urlLinkedin: string;
  icon: string;
}

interface Tutor {
  idPerson: string;
  fullName: string;
  description: string;
  email: string;
  cellPhone: string;
  imageUrl: string;
  subjects: string[];
  socialNetworks: SocialNetwork[];
}

interface TutorDetails {
  fullName: string;
  description: string;
  email: string;
  imageUrl: string;
  subjects: { subjectName: string; comments: string }[];
  socialNetworks: { urlLinkedin: string; icon: string }[];
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
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  filter: string;
  setFilter: (filter: string) => void;
  sort: { field: string; order: string };
  setSort: (sort: { field: string; order: string }) => void;
  selectedSubjects: string[];
  // setSelectedSubjects: (subjects: string[]) => void;
  setSelectedSubjects: (subjects: string[] | ((prevSubjects: string[]) => string[])) => void;
  fetchTutors: (showNotification:boolean) => void;
  fetchTutorById: (idPerson: string) => Promise<TutorDetails | null>;
}

const TutorsContext = createContext<TutorsContextType | undefined>(undefined);

export const TutorsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const fetchTutors = async (showNotifications:boolean) => {
    const params = new URLSearchParams({
      page: currentPage.toString(),
      size: pageSize.toString(),
      ...(sort.field && { sort: `${sort.field},${sort.order}` }),
      ...(filter && { filter }),
      ...(selectedSubjects.length && {subjects: selectedSubjects.join(",")})
    });

    const fetchPromise = axios.get<TutorsResponse>(
      `${BASE_URL}professor/tutores?${params.toString()}`
    );

    if(showNotifications) {
      await toast.promise(
        fetchPromise,
        {
          pending: "Buscando tutores...",
          success: "Tutores cargados exitosamente",
          error: "Error al cargar tutores",
        }
      );
    } else {
      await fetchPromise;
    }

    // await toast
    //   .promise(
    //     axios.get<TutorsResponse>(
    //       `${BASE_URL}professor/tutores?${params.toString()}`
    //     ),
    //     {
    //       pending: "Fetching tutors...",
    //       success: "Tutors fetched successfully",
    //       error: "Failed to fetch tutors",
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       if (response.data.status === "204") {
    //         setTutors([]);
    //         setTotalPages(0);
    //         toast.info("No tutors found with the given criteria.");
    //       } else if (response.data.status === "200") {
    //         setTutors(response.data.result);
    //         setTotalPages(response.data.totalPages);
    //         console.log(response.data.result);
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching tutors:", error);
    //     throw error;
    //   });
    fetchPromise.then((response) => {
      if (response.status === 200) {
        if (response.data.status === "204") {
          setTutors([]);
          setTotalPages(0);
          // toast.info("No tutors found with the given criteria.");
        } else if (response.data.status === "200") {
          setTutors(response.data.result);
          setTotalPages(response.data.totalPages);
          console.log(response.data.result);
        }
      }
    })
  };

  const fetchTutorById = async (
    idPerson: string
  ): Promise<TutorDetails | null> => {
    try {
      const response = await axios.get(`${BASE_URL}professor/${idPerson}`);
      return response.data.result;
    } catch (error) {
      toast.error("Error al encontrar tutores");
      return null;
    }
  };

  useEffect(() => {
    fetchTutors(true);
  }, [])
  
  useEffect(() => {
    fetchTutors(false); // Initial fetch with default parameters and show notifications
  }, [currentPage, pageSize, filter, sort, selectedSubjects]);

  return (
    <TutorsContext.Provider
      value={{
        tutors,
        totalPages,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        filter,
        setFilter,
        sort,
        setSort,
        selectedSubjects,
        setSelectedSubjects,
        fetchTutors,
        fetchTutorById,
      }}
    >
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
