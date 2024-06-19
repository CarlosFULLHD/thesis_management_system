import { useEffect } from "react";
import { useAcademicPeriod } from "../providers/AcademicPeriodProvider";

const MilestoneTitle = () => {

 // Importing data and method from provider
 const { mainAcademicPeriod, getCurrentAcademicPeriod } = useAcademicPeriod();

    useEffect(() => {
        getCurrentAcademicPeriod();
    }, [])
    
    return (
        <>
        <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Cartas de postulación de estudiantes
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-white">
            { mainAcademicPeriod.semester}
        </h2>
    </>
    );
}

export default MilestoneTitle;