import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

const PurposeFilter = () => {
  const { purpose, setPurpose } = useContext(HouseContext);

  const purposes = [
    { value: "RENT" },
    { value: "SALE" },
  ];

  const purposeHandler = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <Select placeholder='select purpose' defaultValue={purpose} onChange={purposeHandler}>
      {purposes.map((text, index) =>
          <option key={index}>{text.value}</option>
        )
      }
    </Select>
  );
};

export default PurposeFilter;
