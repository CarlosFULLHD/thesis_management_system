"use client";
import SearchForm from "./components/SearchForm";
import SearchTitle from "./components/SearchTitle";
import SearchFormProvider from "./providers/SearchFormProvider";

const BuscarBiblioteca = () => {
  return (
    


    <SearchFormProvider>
      <SearchTitle/>
      <SearchForm/>
    </SearchFormProvider>
    
  );
};

export default BuscarBiblioteca;


