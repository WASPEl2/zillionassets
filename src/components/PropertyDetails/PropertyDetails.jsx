import { useEffect, useState, useContext, useRef } from "react";
import { Stack, VStack, Flex, Heading, Text, Box, HStack, Button, Spinner, IconButton, } from "@chakra-ui/react";
import { BiBed, BiBath, BiArea, BiEdit } from "react-icons/bi";
import { useParams, Link  } from "react-router-dom";


import { config } from "../../data";
import ImageScrollbar from "./ImageScrollbar";
import RecommendProperties from "./RecommendProperties";
import { HouseContext } from "../../context/HouseContext";
import { UserDataContext } from "../../context/UserDataContext";
import Form from "./Form";
import ListWithIndentation from "./ListWithIndentation";

const PropertyDetails = () => {
  const { propertyId} = useParams();
  const { userData } = useContext(UserDataContext);
  const { getPropertyById, getRecommendedProperties } = useContext(HouseContext);
  const propertyData = getPropertyById(propertyId);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`${config.api}/asset-image/${propertyId}`);
        const data = await response.json();
        if (response.status === 200) {
          setImageData(data.images);
        } else if (response.status === 404) {
          console.log('Resource not found');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, [propertyId]);

  useEffect(() => {
    const fetchRecommendedProperties = async () => {
      if(propertyData){
        try {
          // Call the function to get recommended properties based on the current property ID
          const recommendedProps = getRecommendedProperties(propertyId, propertyData.primary_area, propertyData.ppt_type, propertyData.ppt_bedroom, propertyData.price);
          
          setRecommendedProperties(recommendedProps);
        } catch (error) {
          console.error('Error fetching recommended properties:', error);
        }
      };
    }

    fetchRecommendedProperties();
        
  }, [propertyData]);

  const renderPropertyType = () => {
    const { ppt_rental_price, ppt_selling_price } = propertyData;
    let propertyType = "";

    if (ppt_rental_price) {
      propertyType += "RENT";
    }

    if (ppt_rental_price && ppt_selling_price) {
      propertyType += " / ";
    }

    if (ppt_selling_price) {
      propertyType += "SALE";
    }

    return propertyType;
  };

  // Function to format the time
  const formatTime = (timeString) => {
    const dateTime = new Date(timeString);
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  return (
    <>
      <ImageScrollbar data={imageData}/>
      {propertyData && (
        <Stack direction={{ base: 'column', md: 'row' }} justify='space-between' align={{ md: 'center' }} my='2vh'>
          <Box>
            <Flex>
              <Heading fontSize='22px' mr='4'>{propertyData.ppt_assets_name}</Heading>
              {userData && userData.role === 'Admin' && ( 
                <Link to={`/insert-info/${propertyData.ppt_id}`}>
                  <IconButton
                    aria-label="Edit property"
                    icon={<BiEdit />}
                    size="sm"
                    borderBottomLeftRadius="2xl"
                  />
                </Link>
            
              )}
            </Flex>
            <Text fontSize='15px'>{propertyData.ppt_location_detail}</Text>
            
          </Box>

          <HStack>
            <Text px='3' borderRadius='full' bg='green.300' overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{propertyData.ppt_type}</Text>
            <Text px='3' borderRadius='full' bg='purple.300' overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">{propertyData.primary_area}</Text>
            <Text px='3' borderRadius='full' bg='orange.300' overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
              {renderPropertyType()}
            </Text>
          </HStack>
        </Stack>
      )}

      {propertyData && (
        <>
        <Text mt="-1" fontWeight="extrabold" fontSize="14px" color="emerald.700">
          {propertyData.ppt_rental_price && (
              <>
                  {Number(propertyData.ppt_rental_price).toLocaleString()}
                  <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                      &nbsp;THB/month
                  </span>
              </>
          )}{" "}
        </Text>
        <Text mt="-1" fontWeight="extrabold" fontSize="14px" color="emerald.700">
          {propertyData.ppt_selling_price && (
              <>
                  {Number(propertyData.ppt_selling_price).toLocaleString()}
                  <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                      &nbsp;THB
                  </span>
              </>
          )}{" "}
        </Text>
        </>
      )}

      {propertyData && (
        <>
        <Stack direction={{ base: 'column', lg: 'row' }} gap='6' align='flex-start'>
          <VStack align='left' maxW='640px'>
            <Stack py='10px' spacing={{ sm: '3', md: '5' }} direction={{ base: 'column', md: 'row' }}>
              <HStack>
                <BiBed style={{ color: "emerald.900" }} />
                <Text fontSize="14px">{propertyData.ppt_bedroom} Bedrooms</Text>
              </HStack>

              <HStack>
                <BiBath style={{ color: "emerald.900" }} />
                <Text fontSize="14px">{propertyData.ppt_showerroom} Bathrooms</Text>
              </HStack>

              <HStack>
                <BiArea style={{ color: "emerald.900" }} />
                <Text fontSize="14px">{propertyData.ppt_size} sq.m.</Text>
              </HStack>
            </Stack>

            {(propertyData.ppt_room_description || propertyData.ppt_description || propertyData.ppt_optional_description) && (
                <Heading fontSize='16px'>Description</Heading>
            )}
            {propertyData.ppt_room_description && (
                <ListWithIndentation items={propertyData.ppt_room_description} />
            )}
            {propertyData.ppt_description && (
                <ListWithIndentation items={propertyData.ppt_description} />
            )}
            {propertyData.ppt_optional_description && (
                <ListWithIndentation items={propertyData.ppt_optional_description} />
            )}

            <Text></Text>
            {(propertyData.ppt_nearby || propertyData.ppt_nearbytrain) && (
                <Heading fontSize='16px'>Nearby</Heading>
            )}
            {propertyData.ppt_nearby && (
              <ListWithIndentation items={propertyData.ppt_nearby} />
            )}
            {propertyData.ppt_nearbytrain && (
              <ListWithIndentation items={propertyData.ppt_nearbytrain} />
            )}
      
          </VStack>

        </Stack>
      

        <Flex
            flexWrap="wrap"
            textTransform="uppercase"
            justifyContent="space-between"
            py='2vh'
          >
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Type</Text>
              <Text fontWeight="bold">{propertyData.ppt_type}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
              w="400px"
              borderBottom="1px"
              borderColor="gray.100"
              p="3"
            >
              <Text>Purpose</Text>
              <Text fontWeight="bold">{renderPropertyType()}</Text>
            </Flex>
            {propertyData.ppt_floor_unit && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Floor</Text>
                <Text fontWeight="bold">{propertyData.ppt_floor_unit}</Text>
              </Flex>
            )}
            {propertyData.ppt_roomtype && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Type</Text>
                <Text fontWeight="bold">{propertyData.ppt_roomtype}</Text>
              </Flex>
            )}
            {propertyData.ppt_view && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>View</Text>
                <Text fontWeight="bold">{propertyData.ppt_view}</Text>
              </Flex>
            )}
            {propertyData.ppt_petfriendly && (
              <Flex
                justifyContent="space-between"
                w="400px"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text>Pet Friendly</Text>
                <Text fontWeight="bold">{propertyData.ppt_petfriendly}</Text>
              </Flex>
            )}
            {propertyData.ppt_decoration && (
              <Flex
                justifyContent="space-between"
                w="100%"
                borderBottom="1px"
                borderColor="gray.100"
                p="3"
              >
                <Text display={{ base: 'none', xl: 'block' }}>furnishing Status</Text>
                <Text fontWeight="bold">{propertyData.ppt_decoration}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {propertyData.ppt_facilities && propertyData.ppt_facilities.length > 0 && (
              <Text fontSize="xl" fontWeight="black" marginTop="5">
                Facilities and Amenities
              </Text>
            )}
            <Flex flexWrap="wrap">
              {propertyData.ppt_facilities && propertyData.ppt_facilities.split(',').map((facility, index) => {
                const trimmedItem = facility.trim(); // Trim each facility item

                // Check if trimmedItem is not an empty string
                if (trimmedItem) {
                  return (
                    <Text
                      key={index}
                      fontWeight="bold"
                      color="blue.400"
                      fontSize="l"
                      p="2"
                      m="1"
                      borderRadius="10"
                      bg="gray.200"
                    >
                      {trimmedItem}
                    </Text>
                  );
                }
                return null; // Skip rendering for empty strings
              })}
            </Flex>
            

          </Box>
          <VStack my='4vh' align='right' maxW='100%'  borderBottom="2px" borderColor="gray.200">
            <Text fontSize="15px" align='right'>
              {propertyData.partner_name ? (
                `${propertyData.partner_type === 'Agent' ? 'Acr' : 'Ocr'} ${
                  propertyData.partner_name.startsWith('K.') ? propertyData.partner_name : `K. ${propertyData.partner_name}`
                }`
              ) : ''}
            </Text>
            {userData && userData.role == "Admin" &&   <>
              {propertyData.partner_number && (
                <Text fontSize="15px" align='right'>
                  tel: {propertyData.partner_number}
                </Text>
              )}
              {propertyData.partner_line && (
                <Text fontSize="15px" align='right'>
                  line: {propertyData.partner_line}
                </Text>
              )}
              {propertyData.partner_mail && (
                <Text fontSize="15px" align='right'>
                  more contact: {propertyData.partner_mail}
                </Text>
              )}
              {propertyData.tranfer_fee && (
                <Text fontSize="15px" align='right'>
                  tranfer fee: {propertyData.tranfer_fee}
                </Text>
              )}
              {propertyData.notes && (
                <ListWithIndentation items={propertyData.notes} />
              )}
              {propertyData.ppt_room_number && (
                <Text fontSize="15px" align='right'>
                  room number: {propertyData.ppt_room_number}
                </Text>
              )}
              {propertyData.ppt_tower_unit && (
                <Text fontSize="15px" align='right'>
                  tower: {propertyData.ppt_tower_unit}
                </Text>
              )}
            </>}
            <Text mb='2vh' fontSize="15px" align='center'>
              Last Update {formatTime(propertyData.update_time)}
            </Text>
            
          </VStack>
          {recommendedProperties.length != 0 ? <>
          <Text fontSize="2xl" fontWeight="black" mb='6'>
              Similar Properties In {propertyData.primary_area}
          </Text>
            
          <RecommendProperties data={recommendedProperties}/>
          </> : <></>}

          <VStack
            position="fixed"
            bottom="4"
            right="4"
            spacing={4}
          >
          </VStack>
        </>
      )}
      <Box
        position="fixed"
        bottom="4"
        right="4"
        bg="white"
        border='1px' borderColor='green.100' boxShadow='md' borderRadius={showForm ? "md" : "full"}
      >
        {showForm ?<></>:
        <Button
        bg="emerald.700"
        color="white"
        borderRadius="full"
        onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Contact Us"}
        </Button>}
        
        {showForm && <Form setShowForm={setShowForm}/>}
      </Box>

        

    </>
  );
};

export default PropertyDetails;
