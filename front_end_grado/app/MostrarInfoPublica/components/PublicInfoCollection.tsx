import { PublicInfoItem } from "@/app/GestionInfoPublica/providers/PublicInfoProvider";
import { BASE_URL } from "@/config/globals";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, CircularProgress } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import ShowPublicInfoTitle from "./ShowPublicInfoTitle";
import { useState } from "react";


const PublicInfoCollection = () => {

    // Fetch data function
    const fetchData = async () => fetch(`${BASE_URL}publicInformation/`).then((res) => res.json());

    const [publicInfoMapItems, setPublicInfoMapItems] = useState<PublicInfoItem[]>([]);
    // Loading state
    const loadPublicInfoMap = (responseData: any) => {
        if (responseData["status"] == "200") {
            {
                setPublicInfoMapItems(responseData["result"]);
            }
            
        }
    }

    // Query fetching end point, being called as soon the component renders it
    const { isLoading, isError } = useQuery({
        queryKey: ["infoTable"],
        queryFn: async () => {
            const data = await fetchData();
            loadPublicInfoMap(data)
            return data
        }
    });
    // Fetching state
    if (isLoading) {
        return <CircularProgress aria-label="Loading..." />;
    }

    // Error state
    if (isError) {
        return <div>Oops!</div>;
    }
    // Success state
    if (publicInfoMapItems.length > 0) {
        return (
            <>
            <ShowPublicInfoTitle/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicInfoMapItems.map((publicInfo: PublicInfoItem) => (
                    <div>
                    <Card className="max-w-[400px]" key = {publicInfo.idPublicInfo}>
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
                                <p className="text-small text-default-500">Fecha actualizado: {publicInfo.createdAt.toString()}</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p>{publicInfo.information}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                        <div className="flex flex-col">
                            <p>Publicado por: {publicInfo.roleHasPersonIdRolePer.personIdPerson.name} {publicInfo.roleHasPersonIdRolePer.personIdPerson.fatherLastName} {publicInfo.roleHasPersonIdRolePer.personIdPerson.motherLastName}</p>
                            <p>Cargo: {publicInfo.roleHasPersonIdRolePer.rolesIdRole.userRole} </p>
                        </div>
                        </CardFooter>
                    </Card>
                    <Divider/>
                    </div>
                ))}
                </div>
            </>
        );
    } else {
        console.log(publicInfoMapItems.length)
        return <div>No existe información por ahora.</div>;
    }

}

export default PublicInfoCollection;