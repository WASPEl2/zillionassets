import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { HouseContext } from "../../context/HouseContext";
import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import PurposeFilter from './PurposeFilter';

// Wrap the component with forwardRef
const Search = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { searchHandler, purpose, type, minPrice, maxPrice, primaryArea } = useContext(HouseContext);

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('search') || '';

  const [inputQuery, setInputQuery] = useState(initialQuery);

  const handleSearchInputChange = (event) => {
    setInputQuery(event.target.value);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (inputQuery) queryParams.set('search', inputQuery);
    if (purpose) queryParams.set('purpose', purpose);
    if (type) queryParams.set('type', type);
    if (minPrice) queryParams.set('minPrice', minPrice);
    if (maxPrice) queryParams.set('maxPrice', maxPrice);
    if (primaryArea) queryParams.set('primaryArea', primaryArea);

    navigate(`/?${queryParams.toString()}`);
    searchHandler();
  };

  return (
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5' ref={ref}>
      <Heading py='2' size={{base: 'sm', md: 'md'}}>Search the price you looking for</Heading>
      <Flex pb='2' gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        <Input
          placeholder='Enter keywords to find your ideal property... like "1 bedroom thong lor"'
          value={inputQuery}
          onChange={handleSearchInputChange}
        />
        <Button bgColor='emerald.800' onClick={handleSearch} p={{base: 3, md: 2}} size="100%">Search</Button>
      </Flex>
      <Flex gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        <LocationFilter />
        <PropertyTypeFilter />
        <PriceFilter />
        <PurposeFilter/>
      </Flex>
    </Flex>
  );
});

export default Search;
