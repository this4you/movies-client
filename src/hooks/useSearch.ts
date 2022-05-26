import { useState } from "react";
import { useDebounce } from ".";


const useSearch = () => {
    const [search, setSearch] = useState('');
    const activeSearchValue = useDebounce(search, 300);

    return {
        setSearch,
        activeSearchValue
    }
}

export default useSearch;