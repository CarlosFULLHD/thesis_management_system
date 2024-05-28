"use client";
import { BASE_URL } from "@/config/globals";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Input,
  CircularProgress,
  Avatar,
  Button,
  Pagination,
} from "@nextui-org/react";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import { GradeProfile } from "../../Estudiante/providers/gradeProfileStudentProvider";
import FilterButtons from "./FilterButtons";
import DetailsButton from "./detailsButton";

const GradeProfileCollection = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataSize, setDataSize] = useState<number>(9);
  const [sort, setSort] = useState<string>("title,asc");
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchData = async () => {
    const response = await fetch(
      `${BASE_URL}grade-profile/?page=${currentPage - 1}&size=${dataSize}&sort=${sort}`
    );
    const data = await response.json();
    if (response.ok && data.status === "200") {
      setTotalItems(data.total);
      return data.result;
    } else {
      throw new Error("Fetching data failed");
    }
  };

  const toggleSort = () => {
    setSort((prevSort) => {
      if (prevSort.includes("desc")) return "title,asc";
      return "title,desc";
    });
    setCurrentPage(1); // Reset to first page with new sort
  };

  const totalPages = Math.ceil(totalItems / dataSize);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradeProfile", currentPage, dataSize, sort],
    queryFn: fetchData,
  });

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page with new sort
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page with new page size
  };

  if (isLoading) return <CircularProgress aria-label="Cargando..." />;
  if (isError) return <div>Oops! Algo salió mal.</div>;

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Input
          type="number"
          value={dataSize.toString()}
          onChange={handleDataSizeChange}
          min="1"
          max="100"
          step="1"
          label="por página"
        />
        <Button onClick={() => handleSortChange("title,asc")}>
          <FaSortAlphaDown />
        </Button>
        <Button onClick={() => handleSortChange("title,desc")}>
          <FaSortAlphaUp />
        </Button>
        <Button onClick={toggleSort}>
          Fecha {sort.includes("asc") ? <FaSortDown /> : <FaSortUp />}
        </Button>
      </div>
      {data && data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((gradeProfile: GradeProfile) => (
              <div key={gradeProfile.idGradePro} className="max-w-[340px]">
                <Card>
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        className="bg-blue-500 font-bold"
                        isBordered
                        radius="full"
                        size="md"
                        name={`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName.charAt(0).toUpperCase()}${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.motherLastName.charAt(0).toUpperCase()}`}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{`${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.name} ${gradeProfile.roleHasPerson.usersIdUsers.personIdPerson.fatherLastName}`}</h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          {
                            gradeProfile.roleHasPerson.usersIdUsers
                              .personIdPerson.email
                          }
                        </h5>
                      </div>
                    </div>
                    <DetailsButton idGradePro={gradeProfile.idGradePro} />
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-small text-default-400">
                    <h1>
                      Título:{" "}
                      {gradeProfile.title == ""
                        ? "SIN ASIGNAR"
                        : gradeProfile.title}
                    </h1>
                    <span className="pt-2">
                      <h2>
                        Modalidad graduación:{" "}
                        {gradeProfile.statusGraduationMode == 1
                          ? "Proyecto de grado"
                          : gradeProfile.statusGraduationMode == 2
                            ? "Tesis"
                            : gradeProfile.statusGraduationMode == 3
                              ? "Trabajo dirigido"
                              : gradeProfile.statusGraduationMode == -1
                                ? "Sin asignar"
                                : "Sin asignar"}
                      </h2>
                    </span>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">
                        4
                      </p>
                      <p className=" text-default-400 text-small">Following</p>
                    </div>
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">
                        97.1K
                      </p>
                      <p className="text-default-400 text-small">Followers</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          <Pagination
            total={totalPages}
            initialPage={1}
            showControls
            onChange={handlePageChange}
          />
        </>
      ) : (
        <div>No existe información por ahora.</div>
      )}
    </>
  );
};

export default GradeProfileCollection;
