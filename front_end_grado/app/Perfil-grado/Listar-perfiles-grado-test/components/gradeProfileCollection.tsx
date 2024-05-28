import { useQuery } from "@tanstack/react-query";
import { useGradeProfileLecturerCollection } from "../providers/gradeProfileLecturerCollectionProvider";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Divider,
  Input,
  Pagination,
} from "@nextui-org/react";
import { FaSort } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import {
  BookCopy,
  Captions,
  EarthLock,
  UserRoundCheck,
  UserRoundCog,
} from "lucide-react";
import TutorButton from "./tutorButton";
import LecturerButton from "./lecturerButton";
import TitleButton from "./titleButton";
import GraduationButton from "./graduationButton";
import WorkShopButton from "./workshopButton";
import { useMemo } from "react";
import DetailsButton from "./detailsButton";

const GradeProfileLecturerCollection = () => {
  // Importing data and methods from provider
  const {
    gradeProfileLecturerList,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    filter,
    setFilter,
    sort,
    setSort,
    fetchData,
  } = useGradeProfileLecturerCollection();

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const handleFilterChange = (e: { target: { value: string } }) => {
    setFilter(e.target.value);
    handlePageChange(0);
  };

  const handleSortChange = (field: string) => {
    const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
    setSort({ field, order });
  };

  const onClear = () => {
    setFilter("");
  };

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Input
          isClearable
          type="text"
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar..."
          startContent={<FaSearch />}
          value={filter}
          onClear={() => {
            onClear();
          }}
          onChange={handleFilterChange}
        />
        <div>
          <p>
            Cantidad de datos por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(event) =>
                handlePageSizeChange(Number(event.target.value))
              }
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
          </p>
        </div>
      </div>
    );
  }, [filter, pageSize]);

  const bottomContent = useMemo(() => {
    return (
      <div>
        <Pagination
          isCompact
          showControls
          showShadow
          total={totalPages}
          color="secondary"
          page={currentPage + 1}
          onChange={(newPage) => setCurrentPage(newPage - 1)}
        />
      </div>
    );
  }, [totalPages, currentPage, handlePageChange]);

  const { isLoading, isError } = useQuery({
    queryKey: ["milestont"],
    queryFn: async () => {
      await fetchData();
      return gradeProfileLecturerList;
    },
  });
  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }
  // Error state
  if (isError) {
    return <div>Oops! Something went wrong.</div>;
  }
  // Success state
  if (gradeProfileLecturerList.length > 0) {
    return (
      <>
        {/* TÍTULO */}
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Perfiles de grado activos
        </h1>

        {/* BUSCADOR */}
        {TopContent}

        {/* PERFILES DE GRADO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {gradeProfileLecturerList.map((item) => (
            <Card className="max-w-[500px]" key={item.gradeProfile.idGradePro}>
              <CardHeader className="justify-between bg-blue-light dark:bg-blue-dark">
                <div className="flex gap-5">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    className="text-black"
                    isBordered
                    radius="full"
                    size="lg"
                    name={`${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.name?.charAt(0).toUpperCase()}${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.fatherLastName?.charAt(0).toUpperCase()}${item.gradeProfile.roleHasPerson?.usersIdUsers.personIdPerson.motherLastName?.charAt(0).toUpperCase()}`}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-lg md:text-xl font-bold leading-none text-white dark: text-black">
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.name ?? ""}{" "}
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.fatherLastName ?? ""}
                    </h4>
                    <h5 className="text-md md:text-lg font-bold tracking-tight text-default-400">
                      {item.gradeProfile.roleHasPerson?.usersIdUsers
                        .personIdPerson.email ?? ""}
                    </h5>
                  </div>
                </div>
                <DetailsButton idGradePro={item.gradeProfile.idGradePro} />
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                {/* TUTOR */}
                <div className="flex items-center rounded p-4">
                  <TutorButton
                    isDisabled={item.tutor == null ? false : true}
                    idGradePro={item.gradeProfile.idGradePro}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Tutor</h1>
                    <p className="text-sm">
                      {item.tutor == null
                        ? "SIN ASIGNAR"
                        : `${item.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${item.tutor.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                    </p>
                  </div>
                </div>
                {/* RELATOR */}
                <div className="flex items-center rounded p-4">
                  <LecturerButton
                    isDisabled={item.lecturer == null ? false : true}
                    idGradePro={item.gradeProfile.idGradePro}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Relator</h1>
                    <p className="text-sm">
                      {item.lecturer == null
                        ? "SIN ASIGNAR"
                        : `${item.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.name ?? ""} ${item.lecturer.roleHasPersonIdRolePer?.usersIdUsers.personIdPerson.fatherLastName ?? ""}`}
                    </p>
                  </div>
                </div>

                {/* TÍTULO */}
                <div className="flex items-center rounded p-4">
                  <TitleButton
                    isDisabled={item.gradeProfile.title == "" ? false : true}
                    idGradePro={item.gradeProfile.idGradePro}
                    title={item.gradeProfile.title}
                  />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Título</h1>
                    <p className="text-sm">
                      {item.gradeProfile.title == ""
                        ? "SIN ASIGNAR"
                        : `${item.gradeProfile.title}`}
                    </p>
                  </div>
                </div>

                {/* MODALIDAD DE GRADUACIÓN */}
                <div className="flex items-center rounded p-4">
                  <WorkShopButton idGradePro={item.gradeProfile.idGradePro} />
                  <div className="col-span-2 flex flex-col justify-center items-start">
                    <h1 className="text-lg font-bold mb-2">Taller</h1>
                    <p className="text-sm">
                      {item.gradeProfile.isGradeoneortwo == 1
                        ? "Taller de grado 1"
                        : "Taller de grado 2"}
                    </p>
                  </div>
                </div>
              </CardBody>
              {item.gradeProfile.statusGraduationMode == -1 ||
                item.lecturer == null ||
                item.tutor == null ? (
                <>
                  <Divider />
                  <CardFooter className="flex justify-center items-center bg-custom-purple">
                    <div className="text-center rounded ">
                      <p className="font-bold text-xl">NECESITA ASIGNAR</p>
                      <ul className="flex">
                        {item.gradeProfile.statusGraduationMode == -1 && (
                          <li className="mr-4">
                            <span className="font-bold">Graduación</span>
                          </li>
                        )}
                        {item.tutor == null && (
                          <li className="mr-4">
                            <span className="font-bold">Tutor</span>
                          </li>
                        )}
                        {item.lecturer == null && (
                          <li className="mr-4">
                            <span className="font-bold">Relator</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <></>
              )}
            </Card>
          ))}
        </div>
        {/* PAGINACIÓN */}
        {bottomContent}
      </>
    );
  }
  return <div>No profiles available at this time.</div>;
};

export default GradeProfileLecturerCollection;
