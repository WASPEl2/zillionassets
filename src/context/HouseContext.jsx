import { createContext, useState, useEffect, useContext} from 'react';

import { UserDataContext } from "./UserDataContext";
import { config } from "../data";

export const HouseContext = createContext('');

const HouseProvider = ({ children }) => {
    const limit = 30;
    const { userData } = useContext(UserDataContext);
    const [properties, setProperties] = useState([]);
    const [highlight, setHighlight] = useState([]);
    const [primaryArea, setPrimaryArea] = useState('');
    const [primaryAreas, setPrimaryAreas] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);
    const [purpose, setPurpose] = useState("RENT");
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [currentProperties, setCurrentProperties] = useState([]);

    useEffect(() => {
        fetchData(currentPage);
    }, [userData]);

    useEffect(() => {
        updateCurrentProperties();
    }, [properties,currentPage]);

    const updateCurrentProperties = () => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const currentProperties = properties.slice(startIndex, endIndex);
        setCurrentProperties(currentProperties);
    };

    const fetchData = async () => {

            setIsLoading(true);

            const token = localStorage.getItem('jwtToken');
            try {
                const queryParams = new URLSearchParams({
                });

                if (primaryArea) queryParams.append('primaryArea', primaryArea);
                if (type) queryParams.append('type', type);
                if (minPrice) queryParams.append('minPrice', minPrice);
                if (maxPrice) queryParams.append('maxPrice', maxPrice);
                if (purpose) queryParams.append('purpose', purpose);
                if (searchQuery) queryParams.append('searchQuery', searchQuery);
                const url = `${config.api}/zillionassets/en/assets-detail?${queryParams}`;

                const headers = {};
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(url, {
                    headers: headers
                });
                const data = await response.json();
                
                setProperties(data.properties);

                const highlightProperties = data.properties.filter(property => property.isHighlight == true);
                setHighlight(highlightProperties);

                setTypes(data.all_types);
                setPrimaryAreas(data.primary_areas);
                setTotalPages(Math.ceil(data.properties.length / limit));


            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        
    };

    const searchHandler = () => {
        setCurrentPage(1);
        fetchData();
    }

    const getPropertyById = (propertyId) => {
        
        // Filter the properties array to find the property with the given ID
        const property = properties.find(property => property.ppt_id === propertyId);
        return property;
    };

    const getRecommendedProperties = (propertyId, primaryArea, assetsType, bedrooms, price) => {
        // Filter the properties array based on the specified criteria
        const recommendedProperties = properties.filter(property => {
            // Exclude the property with the specified ID
            if (property.id === propertyId) {
                return false;
            }

            // Check if the property meets the recommended criteria
            const meetsCriteria = (
                property.primary_area === primaryArea &&
                property.ppt_type === assetsType &&
                property.ppt_bedroom >= bedrooms &&
                property.ppt_bedroom <= bedrooms + 2 &&
                property.price >= price * 0.85 &&
                property.price <= price * 1.15
            );

            return meetsCriteria;
        });

        return recommendedProperties;
    };

    return (
        <HouseContext.Provider value={{
            properties: currentProperties,
            highlight,
            primaryAreas,
            primaryArea,
            setPrimaryArea,
            minPrice,
            maxPrice,
            setMinPrice,
            setMaxPrice,
            type,
            setType,
            purpose,
            setPurpose,
            searchQuery,
            setSearchQuery,
            types,
            searchHandler,
            isLoading,
            setCurrentPage,
            currentPage,
            totalPages,
            getPropertyById,
            getRecommendedProperties,
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseProvider;