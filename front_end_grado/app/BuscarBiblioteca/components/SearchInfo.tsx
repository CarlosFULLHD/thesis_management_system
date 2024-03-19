import { Divider } from "@nextui-org/react";

const SearchInfo = () => {
    return (
        <>
            
            <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Antes de buscar considera lo siguiente</h1>
            <Divider />
            <ul className="list-disc pl-5 space-y-2">
                <li>Puedes buscar
                    <ul className="list-circle pl-6">
                        <li>Palabras claves como: internet, web, etc.</li>
                        <li>Nombres de autores</li>
                        <li>Títulos de trabajos</li>
                    </ul>
                </li>
                <li>Que no puedes buscar
                    <ul className="list-circle pl-6">
                        <li>Palabras con emoticones</li>
                        <li>Búsqueda por imágenes</li>
                        <li>Palabras con caracteres especiales</li>
                    </ul>
                </li>
                <li>Alcance de la búsqueda
                    <ul className="list-circle pl-6">
                        <li>Únicamente trabajos publicados en sala y en línea de ingeniería de sistemas</li>
                        <li>Nivel nacional: La Paz, Cochabamba, Tarija, Santa Cruz</li>
                    </ul>
                </li>

            </ul>


        </>
    );
}

export default SearchInfo;