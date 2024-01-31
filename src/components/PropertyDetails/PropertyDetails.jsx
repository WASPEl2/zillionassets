import { useEffect, useState } from "react";
import { Stack, VStack, Flex, Heading, Text, Box, HStack } from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { useParams } from "react-router-dom";
import ImageScrollbar from "./ImageScrollbar";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [imageData, setImageData] = useState([]);
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/zillionassets/en/assets-detail/${propertyId}`);
        const data = await response.json();
        setImageData(data.media_details);
        setPropertyData(data.property_details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImages();
  }, [propertyId]);

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
              {propertyData.ppt_rental_price}
              <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                THB/month
              </span>
            </>
          ) : (
            <></>
          )}
        </Text>
        <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="emerald.500">
          {propertyData.ppt_selling_price !== null ? (
            <>
              {propertyData.ppt_selling_price}
              <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                THB
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
                w="100%"
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
                w="100%"
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
                <Text>furnishing Status</Text>
                <Text fontWeight="bold">{propertyData.ppt_decoration}</Text>
              </Flex>
            )}
          </Flex>
          <Box>
            {propertyData.ppt_facilities && propertyData.ppt_facilities.length > 0 && (
              <Text fontSize="2xl" fontWeight="black" marginTop="5">
                Facilities and Amenities
              </Text>
            )}
            <Flex flexWrap="wrap">
              {propertyData.ppt_facilities && propertyData.ppt_facilities.split(',').map((facility, index) => (
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
                  {facility}
                </Text>
              ))}
            </Flex>
          </Box>
          {propertyData.tranfer_fee && (
              <Text fontSize="2xl" fontWeight="black" marginTop="5">
                {propertyData.tranfer_fee}
              </Text>
          )}
          <VStack mt='4vh' align='right' maxW='100%'>
            <Text fontSize="15px" align='right'>
              {propertyData.partner_type === 'Agent' ? 'Acr' : 'Ocr'} {propertyData.partner_name}
            </Text>
          </VStack>
        </>
      )}
    </>
  );
};

export default PropertyDetails;
