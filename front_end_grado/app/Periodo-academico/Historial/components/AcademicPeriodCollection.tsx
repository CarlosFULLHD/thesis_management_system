import { BASE_URL } from "@/config/globals";
import {
  AcademicPeriodItem,
  useAcademicPeriod,
} from "../../providers/AcademicPeriodProvider";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Divider,
} from "@nextui-org/react";

import DeleteAcademicPeriodButtonHistoric from "./DeleteAcademicPeriodButtonHistoric";
import UpdateAcademicPeriodButtonHistoric from "./UpdateAcademicPeriodButtonHistoric";


const AcademicPeriodCollection = () => {
  // Importing data and method from provider
  const { academicPeriodList, fetchAcademicPeriodList } = useAcademicPeriod();

  // Current string
  const currentDate: Date = new Date();

  // Fetch data function
  const fetchData = async () =>
    fetch(`${BASE_URL}academic-period/`).then((res) => res.json());

  // Loading state
  const loadTaskList = (responseData: any) => {
    // const taskMapItems: Map<number, TaskItem> = (new Map());
    var academicPeriodListItems: AcademicPeriodItem[] = [];
    if (responseData.status == 200) {
      academicPeriodListItems = responseData["result"].map(
        (academicPeriod: AcademicPeriodItem) => ({
          idAcad: academicPeriod.idAcad,
          semester: academicPeriod.semester,
          initDate: academicPeriod.initDate,
          endDate: academicPeriod.endDate,
          accountUntil: academicPeriod.accountUntil,
          status: academicPeriod.status,
          createdAt: academicPeriod.createdAt,
        })
      );
    }
    fetchAcademicPeriodList(academicPeriodListItems); // Changing provider state
  };

  //Query that fetches the end point, being called as soon the component builds it self
  const { isLoading, isError } = useQuery({
    queryKey: ["taskTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadTaskList(data);
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
  if (academicPeriodList.length > 0) {
    return (
      <div>
        {academicPeriodList.map((item, index) => (
          <Card key={item.idAcad} className="m-8">
            <CardHeader>
              <div className="flex flex-col">
                <div className="flex flex-row items-center mb-2">
                  <p className="text-md">
                    <b>Semestre: </b> {item.semester}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <Chip
                    className="capitalize"
                    color={
                      currentDate <= new Date(item.endDate) &&
                      currentDate >= new Date(item.initDate)
                        ? "success"
                        : currentDate < new Date(item.initDate) &&
                            currentDate < new Date(item.endDate)
                          ? "warning"
                          : "danger"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {currentDate <= new Date(item.endDate) &&
                    currentDate >= new Date(item.initDate)
                      ? "En curso"
                      : currentDate < new Date(item.initDate) &&
                          currentDate < new Date(item.endDate)
                        ? "Futuro"
                        : "Pasado"}
                  </Chip>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Table aria-label="Example dynamic collection table">
                <TableHeader>
                  <TableColumn>Fecha de inicio</TableColumn>
                  <TableColumn>Fecha final</TableColumn>
                  <TableColumn>Fecha límite cuentas</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key={item.idAcad}>
                    <TableCell>{item.initDate}</TableCell>
                    <TableCell>{item.endDate}</TableCell>
                    <TableCell>{item.accountUntil}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>

            {currentDate <= new Date(item.endDate) &&
            currentDate >= new Date(item.initDate) ? (
              <Divider />
            ) : currentDate < new Date(item.initDate) &&
              currentDate < new Date(item.endDate) ? (
              <Divider />
            ) : (
              <></>
            )}

            <CardFooter>
              {currentDate <= new Date(item.endDate) &&
              currentDate >= new Date(item.initDate) ? (
                <div className="flex items-center justify-end gap-8">
                  <span className="text-lg text-primary cursor-pointer active:opacity-50">
                    <UpdateAcademicPeriodButtonHistoric idAcad={item.idAcad} />
                  </span>

                </div>
              ) : currentDate < new Date(item.initDate) &&
                currentDate < new Date(item.endDate) ? (
                <div className="flex items-center justify-end gap-8">
                  <span className="text-lg text-primary cursor-pointer active:opacity-50">
                    <UpdateAcademicPeriodButtonHistoric idAcad={item.idAcad} />
                  </span>

                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteAcademicPeriodButtonHistoric idAcad={item.idAcad} />
                  </span>
                </div>
              ) : (
                <></>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>No existe ningún periodo académico</h1>
      </div>
    );
  }
};
export default AcademicPeriodCollection;
