"use client";
import React from "react";
import { useTutors } from "../_providers/tutorsProvider";
import TutorCard from "./tutorCard";

const TutorsList = () => {
  const { tutors, fetchTutors } = useTutors(); // Make sure to invoke fetchTutors if needed

  //   React.useEffect(() => {
  //     fetchTutors(); // Optionally fetch tutors when the component mounts
  //   }, [fetchTutors]);

  if (!tutors.length) {
    return <div>No tutors available</div>; // Show a message if no tutors are available
  }
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
