import { Select } from '@chakra-ui/react';
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const LocationFilter = () => {
  const { primaryArea, setPrimaryArea, primaryAreas } = useContext(HouseContext);

  const locationHandler = (event) => {
    setPrimaryArea(event.target.value);
  };

  // Filter out null countries
  const filteredPrimaryAreas = primaryAreas.filter(country => country !== null);

  return (
    <Select placeholder='select primary area' onChange={locationHandler} value={primaryArea}>
      {filteredPrimaryAreas.map((country, index) => (
        <option key={index}>{country}</option>
      ))}
    </Select>
  );
};

export default LocationFilter;
