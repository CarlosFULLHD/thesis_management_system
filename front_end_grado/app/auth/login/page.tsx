// "use client";
// // Importaciones necesarias de Next.js y React
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn, useSession } from 'next-auth/react';

// // Importaciones de componentes UI
// import { GoogleSignInButton } from '@/components/authButtons'; // Asegúrate de que la ruta sea correcta
// import { Card, CardBody, CardHeader } from '@nextui-org/react'; // Asumiendo que estás utilizando NextUI

// const SignInPage = () => {
//     const [isClient, setIsClient] = useState(false);
//     const router = useRouter();
//     const { data: session, status } = useSession();

//     // Efecto para marcar que estamos en el cliente
//     useEffect(() => {
//         setIsClient(true);
//     }, []);

//     // Efecto para manejar la redirección basada en el rol del usuario
//     useEffect(() => {
//         if (isClient && status === 'authenticated' && session?.user?.role) {
//             console.log("Rol existente: ",session.user.role);
//             switch (session.user.role) {
//                 case 'COORDINADOR':
//                     router.push('/');
//                     break;
//                 case 'ESTUDIANTE':
//                     router.push('/MostrarInfoPublica');
//                     break;
//                 default:
//                     console.log("Rol existente: ",session.user.role);
//                     router.push('/auth/accesoDenegado');
//                     break;
//             }
//         }
//     }, [isClient, status, session, router]);

//     const handleSignIn = () => {
//         signIn('google'); // Asegúrate de tener configurado el proveedor Google en NextAuth
//     };

//     if (!isClient) {
//         return <div>Cargando...</div>; // O cualquier marcador de posición mientras se carga el componente
//     }

//     return (
//         <div className="w-full h-screen flex items-center justify-center">
//             <Card className="w-full max-w-md"> {/* Ajusta las dimensiones según necesites */}
//             <CardHeader>
//                 <h4>Inicia sesión con Google</h4>
//             </CardHeader>
//                 <CardBody className="flex flex-col items-center justify-center space-y-4">
//                     <GoogleSignInButton onSignInSuccess={handleSignIn} />
//                 </CardBody>
//             </Card>
//         </div>
//     );
// };

// export default SignInPage;
