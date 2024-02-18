import { Button, Flex, Heading, Input } from '@chakra-ui/react'
import { useContext, useState} from "react";
import { HouseContext } from '../../context/HouseContext';

import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import PurposeFilter from './PurposeFilter';

const Search = () => {
  const [ inputQuery, setInputQuery ] = useState(null)

  const { searchHandler, searchQuery, setSearchQuery } = useContext(HouseContext);

  const handleSearchInputChange = (event) => {
    setInputQuery(event.target.value);
    setSearchQuery(event.target.value)
  };

  return (
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5'>

      <Heading py='2' size={{base: 'sm', md: 'md'}}>Search the price you looking for</Heading>
      <Flex pb='2' gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        {/* Search input */}
        <Input
          placeholder="Enter keywords to find your ideal property..."
          value={inputQuery? inputQuery:searchQuery}
          onChange={handleSearchInputChange}
        />
        <Button bgColor='emerald.800' onClick={searchHandler} p={{base: 3, md: 2}} size="100%">Search</Button>
      </Flex>

      <Flex gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        <LocationFilter />
        <PropertyTypeFilter />
        <PriceFilter />
        <PurposeFilter/>
      </Flex>
    </Flex>
  )
}

export default Search