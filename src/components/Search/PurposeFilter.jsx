import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

const PurposeFilter = () => {
  const { setPurpose } = useContext(HouseContext);

  const purpose = [
    { value: "RENT" },
    { value: "SALE" },
  ];

  const purposeHandler = (event) => {
    setPurpose(event.target.value);
  };

  return (
    <Select defaultValue="RENT" onChange={purposeHandler}>
      {purpose.map((text, index) =>
          <option key={index}>{text.value}</option>
        )
      }
    </Select>
  );
};

export default PurposeFilter;
