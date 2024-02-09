import { useEffect, useState } from "react";
import { Stack, VStack, Flex, Heading, Text, Box, HStack, Button, Spinner } from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ImageScrollbar from "./ImageScrollbar";
import RecommendProperties from "./RecommendProperties";
import { config } from "../../data";
import Form from "./Form";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [imageData, setImageData] = useState([]);
  const [propertyData, setPropertyData] = useState(null);
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        setIsLoading(true)
        try {
          // Fetch the first data
          const response1 = await fetch(`${config.api}/zillionassets/en/assets-detail/${propertyId}`);
          const data1 = await response1.json();
          setImageData(data1.media_details);
          setPropertyData(data1.property_details);
          setIsLoading(false);

          // Fetch the second data based on the first data
          const queryParams = new URLSearchParams({
            property_id: propertyId,
            bedrooms: data1.property_details.ppt_bedroom,
            primaryArea: data1.property_details.primary_area,
            type: data1.property_details.ppt_type,
            purpose: data1.property_details.ppt_saleorrent,
            selling_price: data1.property_details.ppt_selling_price,
            rental_price: data1.property_details.ppt_rental_price,
          });

          const url = `${config.api}/zillionassets/en/assets-recommended?${queryParams}`;
          const response2 = await fetch(url);
          const data2 = await response2.json();
          setRecommendedProperties(data2.recommended_properties);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [propertyId]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" h='80vh'>
        <Spinner size="xl" color="emerald.800" />
      </Flex>
    );
  }


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
      <ImageScrollbar data={imageData} />
      {propertyData && (
        <Stack direction={{ base: 'column', md: 'row' }} justify='space-between' align={{ md: 'center' }} my='2vh'>
          <Box>
            <Heading fontSize='22px'>{propertyData.ppt_assets_name}</Heading>
            <Text fontSize='15px'>{propertyData.ppt_location_detail}</Text>
          </Box>

          <HStack>
            <Text px='3' borderRadius='full' bg='green.300'>{propertyData.ppt_type}</Text>
            <Text px='3' borderRadius='full' bg='purple.300'>{propertyData.primary_area}</Text>
            <Text px='3' borderRadius='full' bg='orange.300'>{propertyData.ppt_saleorrent}</Text>
          </HStack>
        </Stack>
      )}

      {propertyData && (
        <>
        <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="emerald.500">
          {propertyData.ppt_rental_price !== null ? (
            <>
              {propertyData.ppt_rental_price.toLocaleString()}
              <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                &nbsp;THB/month
              </span>
            </>
          ) : (
            <></>
          )}
        </Text>
        <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="emerald.500">
          {propertyData.ppt_selling_price !== null ? (
            <>
              {propertyData.ppt_selling_price.toLocaleString()}
              <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                &nbsp;THB
              </span>
            </>
          ) : (
            <></>
          )}
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

            <Text fontSize='15px'>{propertyData.ppt_room_description}</Text>
            <Text fontSize='15px'>{propertyData.ppt_description}</Text>
            <Text fontSize='15px'>{propertyData.ppt_nearby}</Text>
            <Text fontSize='15px'>{propertyData.ppt_nearbytrain}</Text>
            <Text fontSize='15px'>{propertyData.ppt_optional_description}</Text>

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
              <Text fontWeight="bold">{propertyData.ppt_saleorrent}</Text>
            </Flex>
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
                <Text display={{ base: 'none', lg: 'block' }}>furnishing Status</Text>
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
              {propertyData.partner_type === 'Agent' ? 'Acr' : 'Ocr'} {propertyData.partner_name}
            </Text>
            <Text mb='2vh' fontSize="15px" align='center'>
              Last Update {formatTime(propertyData.update_time)}
            </Text>
            
          </VStack>
          {recommendedProperties.length != 0 ? <>
          <Text fontSize="2xl" fontWeight="black">
              Similar Properties In {propertyData.primary_area}
          </Text>
            
          <RecommendProperties data={recommendedProperties} isLoading={isLoading}/>
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
