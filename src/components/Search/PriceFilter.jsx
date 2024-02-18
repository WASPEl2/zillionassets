import { useState, useContext, useEffect, useRef } from 'react';
import { FormControl, FormLabel, Select, Input, Button } from "@chakra-ui/react";
import { HouseContext } from "../../context/HouseContext";

const PriceFilter = () => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useContext(HouseContext);
  const [ selectedPrice, setSelectedPrice] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const customPriceRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (customPriceRef.current && !customPriceRef.current.contains(event.target)) {
        // setSelectedPrice('Select Price')
        setShowCustomInput(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [customPriceRef]);

  const prices = [
    { text: "20,000 - 30,000", minPrice: 20000, maxPrice: 30000 },
    { text: "30,000 - 110,000", minPrice: 30000, maxPrice: 110000 },
    { text: "110,000 - 140,000", minPrice: 110000, maxPrice: 140000 },
    { text: "140,000 - 170,000", minPrice: 140000, maxPrice: 170000 },
    { text: "170,000 - 200,000", minPrice: 170000, maxPrice: 200000 },
    { text: "200,000 - 230,000", minPrice: 200000, maxPrice: 230000 },
  ];


const priceHandler = (event) => {
  const selectedValue = event.target.value;
  const selectedOption = prices.find(price => price.text === selectedValue);

  if (selectedValue === 'custom') {
    setSelectedPrice(selectedValue);
    setShowCustomInput(true);
  } else {
    setSelectedPrice(selectedValue);
    setMinPrice(selectedOption?.minPrice || '')
    setMaxPrice (selectedOption?.maxPrice || '')
    setShowCustomInput(false);
  }
};

  const applyCustomPrice = () => {
    if (minPrice !== '' && maxPrice !== '') {
      setShowCustomInput(false);
      setSelectedPrice('custom');
    } else {
      alert('Please enter both max and min prices');
    }
  };

  return (
    <FormControl ref={customPriceRef}>
      <Select placeholder="Select Price" value={selectedPrice} onChange={priceHandler}>
        {prices.map((price, index) =>
          <option key={index} value={price.text}>{price.text}</option>
        )}
        <option value="custom">Custom</option>
      </Select>
      {showCustomInput && (
        <FormControl mt='1'
          position={'absolute'}
          bgColor={'white'}
          borderRadius={'4'}
          p='2'
          boxShadow='md'
          zIndex={1}
        >
          <Input
            type='number'
            placeholder="min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Input
            type='number'
            mt='2'
            placeholder="max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button mt='4' onClick={applyCustomPrice}>Apply</Button>
        </FormControl>
      )}
    </FormControl>
  );
};

export default PriceFilter;
