import { title } from "@/components/primitives";
import Link from 'next/link';

export default function AccesoDenegado() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">Acceso Denegado</h1>
            <p className="text-xl mt-4">Lo sentimos, no tienes permiso para acceder a esta página.</p>
            <Link href="/">
                <a className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                    Volver al inicio
                </a>
            </Link>
        </div>
    </div>
  );
}
