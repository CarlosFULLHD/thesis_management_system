
"use client";
import { ReactQueryClientProvider } from "@/app/providers/ReactQueryClientProvider";
import AcademicPeriodProvider from "../providers/AcademicPeriodProvider";
import HistoricTitle from "./components/HistoricTitle";
import AcademicPeriodCollection from "./components/AcademicPeriodCollection";
import NewAcademicPeriodButtonHistoric from "./components/NewAcademicPeriodButtonHistoric";



const Historic = () => {
  return (
    <ReactQueryClientProvider>
      <AcademicPeriodProvider>
        <HistoricTitle />
        <NewAcademicPeriodButtonHistoric/>
        <AcademicPeriodCollection/>
      </AcademicPeriodProvider>
    </ReactQueryClientProvider>
  );
};

export default Historic;
