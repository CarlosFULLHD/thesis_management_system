import { Divider } from "@nextui-org/react";

const SearchTitle = () => {
    return(
        <div>
            <h1 className="ttext-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Busqueda de proyectos de grado</h1>
            <Divider/>
            <p>Busca nuevas ideas y conoce proyectos pasados</p>
        </div>
    )   
}

export default SearchTitle;