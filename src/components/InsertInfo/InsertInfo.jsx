import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  Grid,
  Image,
  Flex,
  Checkbox
} from "@chakra-ui/react";
import React, { useState, useEffect,useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import { BsEmojiSmile } from "react-icons/bs";
import { config } from "../../data";

const InsertInfo = ({ setIsLoginModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState("");
  const [condoList, setCondoList] = useState([]);
  const [selectedCondo, setSelectedCondo] = useState('');
  const { setUserData } = useContext(UserDataContext);


  const [formData, setFormData] = useState({
    unit_code: "",
    primary_area: "",
    area_soi: "",
    ppt_title: "",
    ppt_type: "",
    ppt_location_detail: "",
    ppt_assets_name: "",
    ppt_room_number: "",
    ppt_floor_unit: "",
    ppt_tower_unit: "",
    ppt_direction: "",
    ppt_selling_price: "",
    ppt_rental_price: "",
    ppt_size: "",
    ppt_decoration: "",
    ppt_nearby: [],
    ppt_nearbytrain: [],
    ppt_facilities: [],
    ppt_description: "",
    ppt_room_description: "",
    ppt_optional_description: "",
    ppt_bedroom: "",
    ppt_roomtype: "",
    ppt_showerroom: "",
    ppt_view: "",
    ppt_petfriendly: "",
    ppt_media: [],
    mainImageIndex: null,
    partner_name: "",
    partner_type: "",
    partner_line: "",
    partner_mail: "",
    partner_number: "",
    tranfer_fee: "",
    notes: "",
    isHighlight:false,
  });

  useEffect(() => {
        fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${config.api}/zillionassets/en/insert-asset/condo-list`
      );

      if (response.ok) {
        const data = await response.json();
        setCondoList(data)
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const parsePropertyData = (e) => {
    const { value } = e.target;
    setAllData(value);
    // Split the input by "**" to separate each property listing
    const listings = value.split("**");

    // Remove empty strings from the array
    const filteredListings = listings.filter(
      (listing) => listing.trim() !== ""
    );

    filteredListings.forEach((listing) => {
      const lines = listing.split("\n");

      const property = {
        ...formData,
      };

      property.ppt_title = (lines[0].split("-")[0] || "").trim()
      let locationFilled = false;
      let sizeFilled = false;
      let roomFilled = false;
      let nameFilled = false;
      let towerFilled = false;
      let floorFilled = false;

      lines.forEach((line) => {
        const lowercasedLine = line.toLowerCase(); // Convert to lowercase

        if (lowercasedLine.includes("location") && !locationFilled) {
          property.ppt_location_detail = (line.split(":")[1] || "").trim();
          locationFilled = true;
        } else if (
          lowercasedLine.includes("unit no") ||
          lowercasedLine.includes("room no")
        ) {
          property.ppt_room_number = (line.split(":")[1] || "").trim();
        } else if (
          lowercasedLine.includes("soravee") ||
          lowercasedLine.includes("997456415") ||
          lowercasedLine.includes("997456145") ||
          lowercasedLine.includes("992264998") ||
          lowercasedLine.includes("zillionassets")
        ) {
          // Skip processing for this line
        } else if (
          (line.includes("Condo") || line.includes("House")) &&
          !nameFilled
        ) {
          property.ppt_assets_name = (line.split(":")[1] || "").trim();
          property.ppt_type = line.split(":")[0].replace(" ", "");
          if (property.ppt_assets_name !== "") nameFilled = true;
        } else if (
          lowercasedLine.includes("room no") ||
          lowercasedLine.includes("Room no.")
        ) {
          property.ppt_room_number = (line.split(":")[1] || "").trim();
        } else if (lowercasedLine.includes("floor") && !floorFilled) {
          property.ppt_floor_unit = (line.split(":")[1] || "").trim();
          floorFilled = true;
        } else if (
          (lowercasedLine.includes("building") ||
            lowercasedLine.includes("tower")) &&
          !towerFilled
        ) {
          property.ppt_tower_unit = (line.split(":")[1] || "").trim();
          towerFilled = true;
        } else if (lowercasedLine.includes("facing")) {
          property.ppt_direction = (line.split(":")[1] || "").trim();
        } else if (lowercasedLine.includes("size") && !sizeFilled) {
          property.ppt_size = parseFloat(
            line.split(":")[1].trim().replace("SQM", "")
          );
          sizeFilled = true;
        } else if (lowercasedLine.includes("room") && !roomFilled) {
          property.ppt_room_description = (line.split(":")[1] || "").trim();
          const bedroomMatch =
            property.ppt_room_description.match(/(\d+)\s*Bedroom/i);
          const bathroomMatch =
            property.ppt_room_description.match(/(\d+)\s*Bathroom/i);
          property.ppt_bedroom = bedroomMatch ? bedroomMatch[1] : "";
          property.ppt_showerroom = bathroomMatch ? bathroomMatch[1] : "";
          if (property.ppt_room_description !== "") roomFilled = true;
        } else if (
          lowercasedLine.includes("rental") ||
          lowercasedLine.includes("rantal")
        ) {
          property.ppt_rental_price = line
            .split(":")[1]
            .trim()
            .replace("THB/Month", "")
            .replace("THB / Month", "");
        } else if (
          lowercasedLine.includes("amenities") ||
          lowercasedLine.includes("facilities")
        ) {
          property.ppt_facilities = (line.split(":")[1] || "")
            .trim()
            .split(",");
        } else if (line.includes("MRT") || line.includes("BTS")) {
          property.ppt_nearbytrain = line.trim().replace("✅ ", "");
        } else if (lowercasedLine.includes("near")) {
          property.ppt_nearby = (line.split(":")[1] || "").trim().split(",");
        } else if (
          lowercasedLine.includes("finished") ||
          lowercasedLine.includes("decorated") ||
          lowercasedLine.includes("ready to move in")
        ) {
          property.ppt_decoration = line.trim().replace("✅", "");
        } else if (lowercasedLine.includes("selling")) {
          property.ppt_selling_price = line
            .split(":")[1]
            .trim()
            .replace("THB", "");
        } else if (lowercasedLine.includes("view")) {
          property.ppt_view = line.trim().replace("✅ ", "");
        } else if (
          lowercasedLine.includes("ocr") ||
          lowercasedLine.includes("acr")
        ) {
          const [key, value] = line.split(":");
          property.partner_name = value.trim() || "";
          property.partner_type = key.trim().includes("ACr")
            ? "Agent"
            : "Owner";
        } else if (
          lowercasedLine.includes("mb/line") ||
          lowercasedLine.includes("mb / line")
        ) {
          let contact = (line.split(":")[1] || "").trim();
          property.partner_number = contact;
          property.partner_line = contact;
        } else if (
          lowercasedLine.includes("line") ||
          lowercasedLine.includes("lind")
        ) {
          property.partner_line = (line.split(":")[1] || "").trim();
        } else if (lowercasedLine.includes("email")) {
          property.partner_mail = (line.split(":")[1] || "").trim();
        } else if (lowercasedLine.includes("fb :")) {
          property.partner_mail = line.trim();
        } else if (lowercasedLine.includes("transfer fee")) {
          property.tranfer_fee = line.trim();
        } else if (
          lowercasedLine.includes("mb") ||
          lowercasedLine.includes("tel") ||
          lowercasedLine.includes("mobile") ||
          lowercasedLine.includes("phone")
        ) {
          property.partner_number = (line.split(":")[1] || "").trim();
        } else if (lowercasedLine.includes("tel 0")) {
          property.tranfer_fee = line.trim().replace("tel ", "");
        }
      });

      // Update the form data with the values from the parsed property data
      setFormData((prevData) => ({
        ...prevData,
        ...property,
      }));
    });
  };

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue? newValue : value,
    }));

    if (name === "area_soi") {
      // Use regular expression to find the primary area
      const primaryAreaMatch = value.match(/^(.*?)(?:\s+\d|$)/);

      // Update the 'primary_area' field if a match is found
      setFormData((prevData) => ({
        ...prevData,
        primary_area: primaryAreaMatch ? primaryAreaMatch[1].trim() : "",
      }));
    }
    // Check if the updated field is 'ppt_room_description'
    else if (name === "ppt_room_description") {
      // Use regular expression to find numbers followed by 'Bedroom' or 'Bathroom'
      const bedroomMatch = value.match(/(\d+)\s*Bedroom/i);
      const bathroomMatch = value.match(/(\d+)\s*Bathroom/i);

      // Update the 'ppt_bedroom' and 'ppt_showerroom' fields if matches are found
      setFormData((prevData) => ({
        ...prevData,
        ppt_bedroom: bedroomMatch ? bedroomMatch[1] : "",
        ppt_showerroom: bathroomMatch ? bathroomMatch[1] : "",
      }));
    }
  };

  const handleMediaChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      ppt_media: [...prevData.ppt_media, ...files],
    }));
  };

  const handleSelectCondoChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCondo(selectedValue);

    // Find the selected condo object based on selectedValue
    const selectedCondoObject = condoList.find(condo => condo.ppt_assets_name === selectedValue);
    if (selectedCondoObject) {
      setFormData((prevData) => ({
        ...prevData,
        primary_area: selectedCondoObject.primary_area || "",
        area_soi: selectedCondoObject.area_soi || "",
        ppt_type: selectedCondoObject.ppt_type || "",
        ppt_location_detail: selectedCondoObject.ppt_location_detail || "",
        ppt_assets_name: selectedCondoObject.ppt_assets_name || "",
        ppt_nearby: selectedCondoObject.ppt_nearby ? selectedCondoObject.ppt_nearby : [],
        ppt_nearbytrain: selectedCondoObject.ppt_nearbytrain ? selectedCondoObject.ppt_nearbytrain : [],
        ppt_facilities: selectedCondoObject.ppt_facilities ? selectedCondoObject.ppt_facilities : [],
        ppt_petfriendly: selectedCondoObject.ppt_petfriendly || "",
      }));
    }
  };

  const handleRemoveMedia = (index) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this media?");
      if (!isConfirmed) {
          return;
      }

      setFormData((prevData) => {
          const updatedMedia = [...prevData.ppt_media];
          updatedMedia.splice(index, 1); 
          return {
              ...prevData,
              ppt_media: updatedMedia,
          };
      });
  };

  const handleSelectMainImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      mainImageIndex: index,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    // Validation checks
    if (!formData.ppt_title) {
      alert("Please enter card title");
      return;
    }

    if (!formData.ppt_type) {
      alert("Please select Asset Type");
      return;
    }

    if (!formData.primary_area) {
      alert("Please enter primary area");
      return;
    }

    if (!formData.ppt_assets_name) {
      const confirmed = window.confirm(
        "assets name is empty. Do you want to save without it?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (!formData.ppt_media.length) {
      alert("Please upload at least one image");
      return;
    }

    if (formData.mainImageIndex === null) {
      alert("Please select a main image");
      return;
    }

    if (formData.ppt_type === "Condo" && !formData.ppt_floor_unit ) {
      const confirmed = window.confirm(
        "Floor unit is empty. Do you want to save without it?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (!formData.ppt_size) {
      const confirmed = window.confirm(
        "size is empty. Do you want to save without it?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (!formData.ppt_location_detail) {
      const confirmed = window.confirm(
        "Location detail is empty. Do you want to proceed without it?"
      );

      if (!confirmed) {
        return;
      }
    }

    if (!formData.ppt_selling_price && !formData.ppt_rental_price) {
      alert("Please enter selling price or rental price");
      return;
    }

    if (
      !(
        formData.partner_number ||
        formData.partner_line ||
        formData.partner_mail
      ) &&
      formData.partner_name
    ) {
      const confirmed = window.confirm(
        "Are you sure to not enter the contact partner"
      );

      if (!confirmed) {
        return;
      }
    }

    if (
      (formData.partner_name ||
        formData.partner_line ||
        formData.partner_number ||
        formData.partner_mail) &&
      !formData.partner_type
    ) {
      alert("Please select the partner type");
      return;
    }

    if (
      !formData.partner_name &&
      !formData.partner_line &&
      !formData.partner_number &&
      !formData.partner_mail
    ) {
      let confirmed = window.confirm(
        "Info about the partner is empty, idk know who I need to contact with. Do you want to proceed without it?"
      );

      if (!confirmed) {
        return;
      }
      confirmed = window.confirm(
        "Are you sure to not enter info about the partner"
      );
      if (!confirmed) {
        return;
      }
    }

    try {
      setLoading(true);
      // Use a different variable name, e.g., formDataToSend
      const formDataToSend = new FormData();

      // Append all fields from the state formData to formDataToSend
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append each file in ppt_image array to formDataToSend
      formData.ppt_media.forEach((file, index) => {
        const fileType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : "other";

        formDataToSend.append(
          `ppt_media[]`,
          file,
          `ppt_media_${fileType}_${index}.${file.name.split(".").pop()}`
        );
      });
      const token = localStorage.getItem('jwtToken');
      const headers = {};
      if (token) {
          headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${config.api}/zillionassets/en/insert-asset`,
        {
          method: "POST",
          body: formDataToSend,
          headers: headers
        }
      );

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          unit_code: "",
          primary_area: "",
          area_soi: "",
          ppt_title: "",
          ppt_type: "",
          ppt_location_detail: "",
          ppt_assets_name: "",
          ppt_room_number: "",
          ppt_floor_unit: "",
          ppt_tower_unit: "",
          ppt_direction: "",
          ppt_selling_price: "",
          ppt_rental_price: "",
          ppt_size: "",
          ppt_decoration: "",
          ppt_nearby: [],
          ppt_nearbytrain: [],
          ppt_facilities: [],
          ppt_description: "",
          ppt_room_description: "",
          ppt_optional_description: "",
          ppt_bedroom: "",
          ppt_roomtype: "",
          ppt_showerroom: "",
          ppt_view: "",
          ppt_petfriendly: "",
          ppt_media: [],
          mainImageIndex: null,
          partner_name: "",
          partner_type: "",
          partner_line: "",
          partner_mail: "",
          partner_number: "",
          tranfer_fee: "",
          ppt_writer: 1,
          notes: "",
          isHighlight:false,
        });
        setAllData("");
        setSelectedCondo("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (response.status === 401 ) {
        setUserData(null)
        setIsLoginModalOpen(true);
      } else {
        const errorResponse = await response.json();
        alert(`Error submitting form: ${errorResponse.error}`);
        console.error("Error submitting form:", errorResponse.error);
      }
    } catch (error) {
      alert("Error submitting form2:", error);
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value) => {
    // Ensure value is a string
    const stringValue = String(value);

    const numericValue = parseFloat(stringValue.replace(/[^0-9.]/g, ""));
    if (!isNaN(numericValue)) {
      const formattedPrice = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericValue);
      return formattedPrice;
    }
    return stringValue;
  };

  return (

    <Box>
      <Text textAlign='center' fontSize="lg" fontWeight="medium" color="gray.700" my={4}>
        Insert Asset
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="ppt_media" fontSize="sm" fontWeight="medium" color="gray.700">
            Upload Images and Videos
          </FormLabel>
          <Input
            type="file"
            id="ppt_media"
            name="ppt_media"
            onChange={handleMediaChange}
            accept="image/*,video/*,.zip"
            multiple
            mt={1}
            p={2}
            border="1px"
            borderColor="gray.200"
            rounded="md"
            w="full"
          />
        </FormControl>
        {formData.ppt_media.length !== 0 ? (
            <Box mb={4}>
                <FormLabel htmlFor="mainImage" mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
                Select Main Image
                </FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {formData.ppt_media.map((file, index) => (
                    <Box
                    key={index}
                    position="relative"
                    cursor="pointer"
                    onClick={() => handleSelectMainImage(index)}
                    >
                      {formData.mainImageIndex === index && (
                      <Flex
                          w='full'
                          h='full'
                          position="absolute"
                          alignItems="center"
                          justifyContent="center"
                          bg="rgba(0, 0, 255, 0.50)"
                          color="white"
                          rounded="md"
                      >
                          Main Image
                      </Flex>
                      )}
                      <Button
                          position='absolute'
                          _hover={{bgColor:'red',color:'white'}}
                          type="button"
                          bgColor='transparent'
                          color="red"
                          right={0}
                          onClick={() => handleRemoveMedia(index)}
                        >
                          X
                      </Button>
                      <Image
                          src={URL.createObjectURL(file)}
                          alt={`Img ${index}`}
                          w="full"
                          h="32"
                          objectFit="cover"
                          rounded="md"
                      />
                      
                    </Box>
                ))}
                </Grid>
            </Box>
            ) : (
            <Box></Box>
        )}

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Give me help you fill data
            </FormLabel>
            <Textarea
            name="allData"
            value={allData}
            onChange={parsePropertyData}
            mt={1}
            p={2}
            border="1px"
            borderColor="gray.200"
            rounded="md"
            w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Card Title
            </FormLabel>
            <Input
                name="ppt_title"
                value={formData.ppt_title}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>
        <FormControl mb={4}>
          <Checkbox
            name="isHighlight"
            isChecked={formData.isHighlight}
            onChange={handleChange}
          >
            Highlight
          </Checkbox>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Assets Code
            </FormLabel>
            <Input
                name="unit_code"
                value={formData.unit_code}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>
        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              Select from Condo that Exist
            </FormLabel>
            <Select
                name="ppt_type"
                mt={1}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
                value={selectedCondo}
                onChange={handleSelectCondoChange}
            >
                <option value="">Select Condo</option>
                {/* Map through condoList and render options */}
                {condoList.map((condo, index) => (
                    <option key={index} value={condo.ppt_assets_name}>
                        {condo.ppt_assets_name}
                    </option>
                ))}
            </Select>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Assets Type
            </FormLabel>
            <Select
                name="ppt_type"
                value={formData.ppt_type}
                onChange={handleChange}
                mt={1}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            >
            <option value="">Select Type</option>
            <option value="Condo">Condo</option>
            <option value="Hotel/Apartment">Hotel/Apartment</option>
            <option value="House/Office">House/Office</option>
            <option value="Town House">Town House</option>
            <option value="Mansion">Mansion</option>
            <option value="2 Storey Single House">2 Storey Single House</option>
            <option value="3 Storey Single House">3 Storey Single House</option>
            <option value="Commercial Building">Commercial Building</option>
            <option value="etc.">etc.</option>
            {/* Add more options as needed */}
            </Select>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            assets name
            </FormLabel>
            <Input
                name="ppt_assets_name"
                value={formData.ppt_assets_name}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            primary area
            </FormLabel>
            <Input
                name="primary_area"
                value={formData.primary_area}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            location detail
            </FormLabel>
            <Input
                name="ppt_location_detail"
                value={formData.ppt_location_detail}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            room number
            </FormLabel>
            <Input
                name="ppt_room_number"
                value={formData.ppt_room_number}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            floor unit
            </FormLabel>
            <Input
                name="ppt_floor_unit"
                value={formData.ppt_floor_unit}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Building unit
            </FormLabel>
            <Input
                name="ppt_tower_unit"
                value={formData.ppt_tower_unit}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>
        <Flex >
          <FormControl mb={4} mr={2} w='50%'>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              facing
              </FormLabel>
              <Input
                  name="ppt_direction"
                  value={formData.ppt_direction}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
              />
          </FormControl>

          <FormControl mb={4} w='30%'>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              size
              </FormLabel>
              <Flex>
                <Input
                  name="ppt_size"
                  value={formData.ppt_size}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
                />
                <Box pl={1} my="auto"> SQM </Box>
              </Flex>
              
          </FormControl>
        </Flex>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            room description
            </FormLabel>
            <Textarea
              name="ppt_room_description"
              value={formData.ppt_room_description}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>
            
        <Flex >
          <FormControl mb={4} mr={2}>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              NO. of bedrooms
              </FormLabel>
              <Input
                  name="ppt_bedroom"
                  value={formData.ppt_bedroom}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
              />
          </FormControl>

          <FormControl mb={4}>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              NO. of bathrooms
              </FormLabel>
              <Input
                  name="ppt_showerroom"
                  value={formData.ppt_showerroom}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
              />
          </FormControl>
        </Flex>
        
        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            decoration
            </FormLabel>
            <Textarea
              name="ppt_decoration"
              value={formData.ppt_decoration}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            description
            </FormLabel>
            <Textarea
              name="ppt_description"
              value={formData.ppt_description}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            type of room
            </FormLabel>
            <Select
                name="ppt_roomtype"
                value={formData.ppt_roomtype}
                onChange={handleChange}
                mt={1}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            >
            <option value="">Select Type</option>
            <option value="Studio">Studio</option>
            <option value="1 Bedroom">1 Bedroom</option>
            <option value="1 Bedroom plus">1 Bedroom plus</option>
            <option value="2 Bedroom">2 Bedroom</option>
            <option value="Loft/Duplex">Loft/Duplex</option>
            <option value="Penthouse">Penthouse</option>
            {/* Add more options as needed */}
            </Select>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            optional description
            </FormLabel>
            <Textarea
              name="ppt_optional_description"
              value={formData.ppt_optional_description}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            view
            </FormLabel>
            <Textarea
              name="ppt_view"
              value={formData.ppt_view}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            pet friendly
            </FormLabel>
            <Select
                name="ppt_petfriendly"
                value={formData.ppt_petfriendly}
                onChange={handleChange}
                mt={1}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            >
              <option value="">Select Type</option>
              <option value="No Pets Allowed">No Pets Allowed</option>
              <option value="With Restrictions">With Restrictions</option>
              <option value="Pets Allowed">Pets Allowed</option>
              <option value="Small Pets Allowed">Small Pets Allowed</option>
            </Select>
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Near By
            </FormLabel>
            <Textarea
              name="ppt_nearby"
              value={formData.ppt_nearby}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Near By train
            </FormLabel>
            <Textarea
              name="ppt_nearbytrain"
              value={formData.ppt_nearbytrain}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            Amenities and facilities (separate with , pls)
            </FormLabel>
            <Textarea
              name="ppt_facilities"
              value={formData.ppt_facilities}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>

        <FormControl mb={4} w={{base: 'full', lg: '65%'}}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            selling price
            </FormLabel>
            <Flex>
              <Input
                name="ppt_selling_price"
                value={formatPrice(formData.ppt_selling_price)}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
              />
              <Box pl={1} my="auto"> THB </Box>

            </Flex>
            
        </FormControl>

        <FormControl mb={4} w={{base: 'full', lg: '50%'}}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            rental price
            </FormLabel>
            <Flex>
              <Input
                  name="ppt_rental_price"
                  value={formatPrice(formData.ppt_rental_price)}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
              />
              <Box pl={1} my="auto"> THB/Month </Box>
            </Flex>
        </FormControl>

        <Flex >
          <FormControl mb={4} mr={2} w='75%' >
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
              partner name
              </FormLabel>
              <Input
                  name="partner_name"
                  value={formData.partner_name}
                  onChange={handleChange}
                  mt={1}
                  p={2}
                  border="1px"
                  borderColor="gray.200"
                  rounded="md"
                  w="full"
              />
          </FormControl>

          <FormControl mb={4} w='25%' alignSelf='end'>
            <Select
                name="partner_type"
                value={formData.partner_type}
                onChange={handleChange}
                mt={6}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            >
              <option value="">Select Type</option>
              <option value="Agent">Agent</option>
              <option value="Owner">Owner</option>
            </Select>
          </FormControl>
        </Flex>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            partner phone number
            </FormLabel>
            <Input
                name="partner_number"
                value={formData.partner_number}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            partner line
            </FormLabel>
            <Input
                name="partner_line"
                value={formData.partner_line}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            partner other contact
            </FormLabel>
            <Input
                name="partner_mail"
                value={formData.partner_mail}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            tranfer fee
            </FormLabel>
            <Input
                name="tranfer_fee"
                value={formData.tranfer_fee}
                onChange={handleChange}
                mt={1}
                p={2}
                border="1px"
                borderColor="gray.200"
                rounded="md"
                w="full"
            />
        </FormControl>

        <FormControl mb={4}>
            <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
            notes
            </FormLabel>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              mt={1}
              p={2}
              border="1px"
              borderColor="gray.200"
              rounded="md"
              w="full"
            />
        </FormControl>
        
        
        <Flex  w='100%' justify='end'>
          <Button
            type="submit"
            colorScheme="blue"
            mt={4}
            isLoading={loading}
            justify='end'
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default InsertInfo;
