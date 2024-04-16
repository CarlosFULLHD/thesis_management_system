import HistoricAcademicPeriodButton from "./HistoricAcademicPeriodButton";
import NewAcademicPeriodButton from "./NewAcademicPeriodButton";


const AcademicPeriodControl = () => {
    return (
        <div className="flex justify-between px-4 py-2">
            <HistoricAcademicPeriodButton/>
            <NewAcademicPeriodButton/>
        </div>

    );

}

export default AcademicPeriodControl;