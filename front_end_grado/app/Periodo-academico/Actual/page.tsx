
"use client";
import { ReactQueryClientProvider } from "../../providers/ReactQueryClientProvider";
import AcademicPeriodProvider from "../providers/AcademicPeriodProvider";
import AcademicPeriodControl from "./components/AcademicPeriodControl";
import AcademicPeriodTitle from "./components/AcademicPeriodTitle";
import CurrentAcademicPeriod from "./components/CurrentAcademicPeriod";



const PeriodoAcad = () => {
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodProvider>
        <AcademicPeriodTitle />
        <AcademicPeriodControl />
        <CurrentAcademicPeriod />
      </AcademicPeriodProvider>
    </ReactQueryClientProvider>
  );
};

export default PeriodoAcad;
