import { createContext, useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router-dom';

import { UserDataContext } from "./UserDataContext";
import { config } from "../data";

export const HouseContext = createContext('');

const HouseProvider = ({ children }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlSearchQuery = searchParams.get('search') || '';
    const urlPurpose = searchParams.get('purpose') || '';
    const urlType = searchParams.get('type') || '';
    const urlMinPrice = searchParams.get('minPrice') || '';
    const urlMaxPrice = searchParams.get('maxPrice') || '';
    const urlPrimaryArea = searchParams.get('primaryArea') || '';

    const limit = 24;
    const { userData } = useContext(UserDataContext);
    const [properties, setProperties] = useState([]);
    const [highlight, setHighlight] = useState([]);
    const [primaryAreas, setPrimaryAreas] = useState([]);
    const [types, setTypes] = useState([]);
    const [primaryArea, setPrimaryArea] = useState(urlPrimaryArea);
    const [minPrice, setMinPrice] = useState(urlMinPrice);
    const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
    const [type, setType] = useState(urlType);
    const [purpose, setPurpose] = useState(urlPurpose);
    const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);
    const [currentProperties, setCurrentProperties] = useState([]);

    useEffect(() => {
        fetchData(urlSearchQuery);
        setCurrentPage(1);
    }, [userData, urlSearchQuery, urlPurpose, urlType, urlMinPrice, urlMaxPrice, urlPrimaryArea]);

    useEffect(() => {
        updateCurrentProperties();
    }, [properties,currentPage]);

    const updateCurrentProperties = () => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        const currentProperties = properties.slice(startIndex, endIndex);
        setCurrentProperties(currentProperties);
    };

    const fetchData = async (Query) => {

            setIsLoading(true);

            const token = localStorage.getItem('jwtToken');
            try {
                const queryParams = new URLSearchParams({
                });
                let newSearchQuery = Query;

                const bedroomMatch = newSearchQuery.match(/(\d+)\s*(bedroom|bed)\b/i);
                if (bedroomMatch) {
                    const numberOfBeds = bedroomMatch[1]; // Extract the number of beds
                    queryParams.append('bedroom', numberOfBeds);
                    
                    // Remove the matched bedroom pattern from the searchQuery
                    newSearchQuery = newSearchQuery.replace(bedroomMatch[0], '').trim();
                }

                if (primaryArea) queryParams.append('primaryArea', primaryArea);
                if (type) queryParams.append('type', type);
                if (minPrice) queryParams.append('minPrice', minPrice);
                if (maxPrice) queryParams.append('maxPrice', maxPrice);
                if (purpose) queryParams.append('purpose', purpose);
                if (newSearchQuery) queryParams.append('searchQuery', newSearchQuery);
                const url = `${config.api}/assets-detail?${queryParams}`;

                const headers = {};
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();
                
                setProperties(data.properties);
                if(highlight.length === 0){
                    setHighlight(data.highlightProperties);
                }
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
        fetchData(searchQuery);
        setCurrentPage(1);
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
            if (property.ppt_id === propertyId) {
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