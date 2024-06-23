import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pagination,
} from "@nextui-org/react";
import ShowPublicInfoTitle from "./ShowPublicInfoTitle";
import { useMemo } from "react";
import { usePublicInfo } from "../providers/PublicInfoProvider";

const PublicInfoCollection = (): React.ReactElement | null => {
  const {
    publicInfo,
    totalPages,
    totalItems,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePublicInfo();

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handlePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  };

  const TopContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-default-600 dark:text-default-400">
            Cantidad de noticias por página:
          </label>
          <select
            className="bg-transparent outline-none text-default-600 dark:text-default-400"
            onChange={(event) => handlePageSize(Number(event.target.value))}
            value={pageSize}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>
    );
  }, [pageSize]);

  const BottonContent = useMemo(() => {
    return (
      <div className="flex justify-center mt-6">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage + 1}
          initialPage={1}
          total={totalPages}
          onChange={(newPage) => handlePageChange(newPage)}
        />
      </div>
    );
  }, [totalPages, currentPage]);

  return (
    <>
      <div className="bg-off-white dark:bg-background-dark">
        <ShowPublicInfoTitle />
        <p className="text-center">Cantidad de Noticias: {totalItems}</p>
        {TopContent}
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-4">
          {publicInfo.map((info) => (
            <Card key={info.idPublicInfo} className="max-w-[800px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{info.title}</p>
                  <p className="text-small text-default-500">
                    Ultima actualización:{" "}
                    {new Date(info.createdAt).toLocaleString()}
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <p>{info.information}</p>
              </CardBody>
              <CardFooter>
                <p>
                  Publicado por: {info.usersIdUsers.personIdPerson.name}{" "}
                  {info.usersIdUsers.personIdPerson.fatherLastName}{" "}
                  {info.usersIdUsers.personIdPerson.motherLastName}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
        {BottonContent}
      </div>
    </>
  );
};

export default PublicInfoCollection;
