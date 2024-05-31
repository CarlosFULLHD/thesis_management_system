import { BASE_URL } from "@/config/globals";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  CircularProgress,
  Button,
  Input,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import ShowPublicInfoTitle from "./ShowPublicInfoTitle";
import { useState } from "react";
import { PublicInfoItem } from "../../Gestion-info-publica/providers/PublicInfoProvider";

const PublicInfoCollection = (): React.ReactElement | null => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("3");

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(e.target.value);
  };

  // Fetch data function
  const fetchData = async () =>
    //fetch(`${BASE_URL}publicInformation/?page=${page}&size=${pageSize}`).then(
    fetch(`${BASE_URL}publicInformation/`).then((res) => res.json());

  // Query fetching end point, being called as soon the component renders it
  const { isLoading, isError } = useQuery({
    queryKey: ["infoTable"],
    queryFn: async () => {
      const data = await fetchData();
      loadPublicInfoMap(data);
      return data;
    },
  });

  const [publicInfoMapItems, setPublicInfoMapItems] = useState<
    PublicInfoItem[]
  >([]);
  // Loading state
  const loadPublicInfoMap = (responseData: any) => {
    if (responseData["status"] == "200") {
      {
        setPublicInfoMapItems(responseData["result"]);
      }
    }
  };

  const addPage = async () => {
    const add = page + 1;
    setPage(add);
    const data = await fetchData();
    loadPublicInfoMap(data);
  };

  const subPage = async () => {
    const sub = page - 1;
    setPage(sub);
    const data = await fetchData();
    loadPublicInfoMap(data);
  };

  // Fetching state
  if (isLoading) {
    return <CircularProgress aria-label="Cargando..." />;
  }
  // Error state
  if (isError) {
    return <div>Oops! Something went wrong</div>;
  }
  if (publicInfoMapItems.length === 0) {
    return <div>No existe información por ahora.</div>;
  }

  return (
    <>
      <div className="bg-off-white">
        <ShowPublicInfoTitle />
        <p className="text-center">Cantidad de Noticias:</p>

        <Input
          type="text"
          value={pageSize}
          placeholder="Tamaño página"
          variant="bordered"
          onChange={handlePageSizeChange}
          className="w-16 mx-auto block"
        />
        <div className="text-center ">
          {page !== 1 && (
            <Button onClick={() => setPage(page - 1)}>Atras</Button>
          )}
          <Button
            className="bg-blue-light text-white font-bold"
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-4">
          {publicInfoMapItems.map((publicInfo: PublicInfoItem) => (
            <Card key={publicInfo.idPublicInfo} className="max-w-[800px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{publicInfo.title}</p>
                  <p className="text-small text-default-500">
                    Ultima actualización: {publicInfo.createdAt.toString()}
                  </p>
                </div>
              </CardHeader>

              <CardBody>
                <p>{publicInfo.information}</p>
              </CardBody>

              <CardFooter>
                <p>
                  Publicado por: {publicInfo.usersIdUsers.personIdPerson.name}{" "}
                  {publicInfo.usersIdUsers.personIdPerson.fatherLastName}{" "}
                  {publicInfo.usersIdUsers.personIdPerson.motherLastName}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicInfoCollection;
