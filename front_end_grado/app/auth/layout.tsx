import RootLayout from "../layout";

const AuthLayout = ({ 
    children
  }: { 
    children: React.ReactNode
  }) => {
    return ( 
      <RootLayout showLayout={false}>
      <div className="h-full flex items-center justify-center ">
        {children}
      </div>
      </RootLayout>
     );
  }
   
  export default AuthLayout;