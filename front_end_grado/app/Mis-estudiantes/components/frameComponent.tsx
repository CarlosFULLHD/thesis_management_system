import { UserDetail } from "@/app/providers/SessionProvider";
import { useMyStudents } from "../providers/MyStudentsProvider";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@nextui-org/react";
import MyStudentsTitle from "./myStudentsTitle";
import SelectTutorLecturer from "./selectTutorLecturer";
import MyStudentsCollection from "./myStudentsCollection";

interface MyStudentsCollectionProps {
  userDetails: UserDetail;
}

const FrameComponent = ({ userDetails }: MyStudentsCollectionProps) => {
  // Importing data and method from provider
  const { myStudentsList, loadMyStudents } = useMyStudents();
  // State for the selected tab
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // callback for the selected tab
  const selectedTabCallback = async (newValue: number) => {
    await loadMyStudents(userDetails.userId, newValue === 1);
    setSelectedTab(newValue);
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["gradeprofiles"],
    queryFn: async () => {
      await loadMyStudents(userDetails.userId, false);
      return myStudentsList;
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

  return (
    <>
      <MyStudentsTitle />
      <SelectTutorLecturer
        radioValue={selectedTab}
        radioValueCallback={selectedTabCallback}
      />
      {myStudentsList.length > 0 ? (
        <MyStudentsCollection radioValue={selectedTab} />
      ) : (
        <h1 className="text-center mt-4">
          No es {selectedTab === 0 ? "tutor" : "relator"} de ningún estudiante
        </h1>
      )}
    </>
  );
};

export default FrameComponent;
