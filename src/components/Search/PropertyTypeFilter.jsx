import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const PropertyTypeFilter = () => {

  const {type ,setType, types} = useContext(HouseContext);

  const typeHandler = (event)=> {
    setType(event.target.value);
  }

  return (
    <Select placeholder='select type' onChange={typeHandler} value={type}>
      {
        types.map((type, index)=> 
          <option key={index}>{type}</option>
        )
      }
    </Select>
  );
};

export default PropertyTypeFilter;