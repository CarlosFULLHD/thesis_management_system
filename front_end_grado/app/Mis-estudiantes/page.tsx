"use client";

import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import { useSession } from "../providers/SessionProvider";
import FrameComponent from "./components/frameComponent";
import MyStudentsProvider from "./providers/MyStudentsProvider";


const MyStudents = () => {
  // Account provider
  const { userDetails } = useSession();
  return (
    <ReactQueryClientProvider>
      <MyStudentsProvider>
        <FrameComponent userDetails = {userDetails!}/>
      </MyStudentsProvider>
    </ReactQueryClientProvider>
  );
};

export default MyStudents;
