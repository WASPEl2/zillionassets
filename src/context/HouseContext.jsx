import { createContext, useState, useEffect, useRef } from 'react';
import { config } from "../data";

export const HouseContext = createContext('');

const HouseProvider = ({ children }) => {
    const limit = 30;
    const [properties, setProperties] = useState([]);
    const [primaryArea, setPrimaryArea] = useState('');
    const [primaryAreas, setPrimaryAreas] = useState([]);
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);

    const minPrice = 0;
    const maxPrice = 10000000000; // 10,000,000,000

    const containerRef = useRef(null);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async () => {
        if (!isLoading) {

            setIsLoading(true);
            
            try {
                const queryParams = new URLSearchParams({
                    primaryArea,
                    type,
                    minPrice,
                    maxPrice,
                    searchQuery,
                    limit,
                    page: currentPage,
                });
                const url = `${config.api}/zillionassets/en/assets-detail?${queryParams}`;

                const response = await fetch(url);
                const data = await response.json();

                setTypes(data.all_types);
                setPrimaryAreas(data.primary_areas);
                setProperties(data.properties);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        } 
        
    };

    const searchHandler = () => {
        setCurrentPage(1);
        fetchData();
    }

    return (
        <HouseContext.Provider value={{
            properties,
            primaryAreas,
            price,
            setPrimaryArea,
            setPrice,
            setType,
            searchQuery,
            setSearchQuery,
            types,
            searchHandler,
            isLoading,
            setCurrentPage,
            currentPage,
            totalPages,
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseProvider;
