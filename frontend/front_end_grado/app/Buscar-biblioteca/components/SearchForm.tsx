import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import SearchButton from "./SearchButton";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex items-center gap-4">
      <Input
        isClearable
        type="search"
        label="Buscar"
        variant="bordered"
        value={searchTerm}
        placeholder="Ingrese su busqueda"
        onClear={() => setSearchTerm("")}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchButton searchTerm={searchTerm} />
    </div>
  );
};
export default SearchForm;
