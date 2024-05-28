import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  CircularProgress,
  Chip,
} from "@nextui-org/react";
import { FaCalendar } from "react-icons/fa";
import DetailsAcademicPeriodButton from "./DetailsAcademicPeriodButton";
import UpdateAcademicPeriodButton from "./UpdateAcademicPeriodButton";
import { BASE_URL } from "@/config/globals";
import { useQuery } from "@tanstack/react-query";
import {
  AcademicPeriodItem,
  useAcademicPeriod,
} from "../../providers/AcademicPeriodProvider";
const CurrentAcademicPeriod = () => {
  // Importing data and method from provider
  const { mainAcademicPeriod, fetchMainAcademicPeriod, isAcademicPeriodEmpty } =
    useAcademicPeriod();
  // Fetch data function
  const fetchData = async () =>
    fetch(`${BASE_URL}academic-period/current-one/`).then((res) => res.json());

  // Loading state
  const loadAcademicPeriodItem = (responseData: any) => {
    // const taskMapItems: Map<number, TaskItem> = (new Map());
    var academicPeriodMainItem: AcademicPeriodItem;
    if (responseData.status == 200) {
      academicPeriodMainItem = responseData["result"];
      fetchMainAcademicPeriod(academicPeriodMainItem); // Changing provider state
    }
  };
  //Query that fetches the end point, being called as soon the component builds it self
  const { isLoading, isError } = useQuery({
    queryKey: ["academicTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadAcademicPeriodItem(data);
      return data;
    },
  });
  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }
  // Error state
  if (isError) {
    return <div>Oops!</div>;
  }
  // Success state
  if (!isAcademicPeriodEmpty(mainAcademicPeriod)) {
    return (
      <Card isFooterBlurred className="w-full h-full col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <div className="text-black text-medium dark:text-white/60 uppercase font-bold">
            Periodo -
            <Chip
              className="capitalize"
              color="success"
              size="sm"
              variant="flat"
            >
              Activo
            </Chip>
          </div>
          <h4 className="text-black dark:text-white/90 font-medium text-xl">
            Semestre {mainAcademicPeriod.semester}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="/img/logo-sis.png"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <FaCalendar />
            <div className="flex flex-col text-left">
              <p className="text-tiny text-white/60">
                Fecha inicio: <b>{mainAcademicPeriod.initDate}</b>
              </p>
              <p className="text-tiny text-white/60">
                Fecha final: <b>{mainAcademicPeriod.endDate}</b>
              </p>
              <p className="text-tiny text-white/60">
                Inscripciones: <b>{mainAcademicPeriod.accountUntil}</b>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UpdateAcademicPeriodButton idAcad={mainAcademicPeriod.idAcad} />
            <DetailsAcademicPeriodButton />
          </div>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <div>
        <h1>No existen un periodo académico activo</h1>
      </div>
    );
  }
};

export default CurrentAcademicPeriod;
