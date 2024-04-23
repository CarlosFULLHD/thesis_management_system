"use client";
import React from "react";
import { useTutors } from "../_providers/tutorsProvider";
import TutorCard from "./tutorCard";

const TutorsList = () => {
  const { tutors } = useTutors();

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {tutors.map((tutor) => (
        <TutorCard key={tutor.email} tutor={tutor} />
      ))}
    </div>
  );
};

export default TutorsList;
