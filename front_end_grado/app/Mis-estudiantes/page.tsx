//page.tsx
"use client";

import { ReactQueryClientProvider } from "../providers/ReactQueryClientProvider";
import { useSession } from "../providers/SessionProvider";
import MyStudentsCollection from "./components/myStudentsCollection";
import MyStudentsProvider from "./providers/MyStudentsProvider";


const MyStudents = () => {
  // Account provider
  const { userDetails } = useSession();
  return (
    <ReactQueryClientProvider>
      <MyStudentsProvider>
        <MyStudentsCollection userDetails={userDetails!} />
      </MyStudentsProvider>
    </ReactQueryClientProvider>
  );
};

export default MyStudents;
