import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchFormContextType {
    searchArray : string[];
    addSearch: (newSearch: string) => void;
    removeSearch: () => void;
}

const SearchFormContext = createContext<SearchFormContextType | undefined>(undefined);

interface SearchFormProviderProps {
    children: ReactNode;
}

const SearchFormProvider: React.FC<SearchFormProviderProps> = ({ children }) => {
    const [searchArray, setSearch] = useState<string[]>([]);

    const addSearch = (newSearch: string) => {
        setSearch([...searchArray, newSearch]);
    };

    const removeSearch = () => {
        setSearch(prevSearchArray => prevSearchArray.slice(0, -1));
    }

    return (
        <SearchFormContext.Provider value ={{searchArray, addSearch, removeSearch}}>
            {children}
        </SearchFormContext.Provider>
    );
}

export const useSearchForm = (): SearchFormContextType => {
    const context = useContext(SearchFormContext);
    if (!context){
        throw new Error('Error');
    }
    return context;
}

export default SearchFormProvider;


