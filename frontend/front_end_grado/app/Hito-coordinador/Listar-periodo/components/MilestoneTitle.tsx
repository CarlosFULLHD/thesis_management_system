import { useEffect } from "react";
import { useAcademicPeriod } from "../providers/AcademicPeriodProvider";

const MilestoneTitle = () => {
  // Importing data and method from provider
  const { mainAcademicPeriod, getCurrentAcademicPeriod } = useAcademicPeriod();

  useEffect(() => {
    getCurrentAcademicPeriod();
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-light to-blue-dark dark:from-yellow-light dark:to-yellow-dark pt-6">
        Cartas de postulación de estudiantes
        <br />
        {mainAcademicPeriod.semester}
      </h1>
    </>
  );
};

export default MilestoneTitle;
