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
    fetch(`${BASE_URL}publicInformation/?page=${page}&size=${pageSize}`).then(
      (res) => res.json()
    );

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
      <ShowPublicInfoTitle />
      <Input
        type="text"
        value={pageSize}
        placeholder="Tamaño página"
        variant="bordered"
        onChange={handlePageSizeChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicInfoMapItems.map((publicInfo: PublicInfoItem) => (
          <Card key={publicInfo.idPublicInfo} className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">Título: {publicInfo.title}</p>
                <p className="text-small text-default-500">
                  Fecha actualizado: {publicInfo.createdAt.toString()}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>{publicInfo.information}</p>
            </CardBody>
            <Divider />
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
      <div>
        {page !== 1 && <Button onClick={() => setPage(page - 1)}>Atras</Button>}
        <Button onClick={() => setPage(page + 1)}>Siguiente</Button>
      </div>
    </>
  );
};

export default PublicInfoCollection;
