import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { FaPlus, FaMinus } from 'react-icons/fa';
import React from 'react';
import { useSearchForm } from "../providers/SearchFormProvider";

const SearchForm = () => {
    const {searchArray, addSearch , removeSearch} = useSearchForm();
    return(
        <div className="flex items-center gap-4">
            <div>
            <button onClick={() => addSearch('Example Search')}>Add Search</button>
            {searchArray.map((search, index) => (
                <div key={index}>
                    {search}
                    <button onClick={() => removeSearch()}>Remove</button>
                </div>
            ))}
        </div>
        
        {/* <Input
          key="outside-left"
          type="email"
          label="Busqueda"
          labelPlacement="outside-left"
          description="Ingresa palabras claves"
        />
        <Button color="primary" variant="ghost" isIconOnly aria-label="Increase">
          <FaPlus />
        </Button>    
        <Button color="primary" variant="ghost" isIconOnly aria-label="Decrease">
          <FaMinus />
        </Button> */}
      </div>
    );
}
export default SearchForm;