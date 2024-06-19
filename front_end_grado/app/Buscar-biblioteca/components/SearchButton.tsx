import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { FaSearch } from 'react-icons/fa';

// Define an interface for the component's props
interface SearchButtonProps {
    searchTerm: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ searchTerm }) => {

    const handleSearch = () => {
        console.log(searchTerm);
        const baseUrl = `https://bibliotecas.ucb.edu.bo/cgi-bin/koha/opac-search.pl?advsearch=1&idx=kw%2Cphr&q=UCB%2FSIS&op=AND&idx=kw&q=${searchTerm}&do=Search&limit=mc-itype%2Cphr%3ATEL&limit=mc-itype%2Cphr%3ATES&sort_by=relevance`;
        window.open(baseUrl, '_blank');
    };

    return (
        <Tooltip color="primary" content="Seras redirigido a https://www.bibvirtual.ucb.edu.bo/">
            <Button
                color="primary"
                radius="full"
                variant="shadow"
                endContent={<FaSearch />}
                onPress={handleSearch}
            >

            </Button>
        </Tooltip>
    );
}

export default SearchButton;