import { useEffect, useState, useContext  } from 'react';
import {
  VStack,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { config } from '../../data';
import { Link  } from 'react-router-dom';
import { UserDataContext } from "../../context/UserDataContext";
import { BiBed, BiBath, BiArea, BiEdit } from "react-icons/bi";

const HighlightItem = ({ property }) => {
  const [imageData, setImageData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserDataContext);



  useEffect(() => {
    const fetchImageData = async () => {
      try {
        let imageUrl = '';

        // Check if property.mainimage exists and use it
        if (property.mainimage) {
          imageUrl = property.mainimage;
        } else if (!isLoading){
          setIsLoading(true);
          
          // Fetch the image data from the API endpoint
          const response = await fetch(`${config.api}/zillionassets/en/asset-main-image/${property.ppt_id}`);
          
          // Check if the response is okay
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Convert the response to blob
          const data = await response.blob();

          // Create a URL for the blob data
          imageUrl = URL.createObjectURL(data);
          setIsLoading(false);
        }

        // Set the image data state with the URL
        setImageData(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    };

    fetchImageData();

    // Cleanup function to revoke the created URL
    return () => {
      if (imageData) {
        URL.revokeObjectURL(imageData);
      }
    };
  }, []);
  
  return (
    <Flex justify="center" align="center" pl='0'>
      <Stack width="300px" bg="white" boxShadow="xl" borderRadius="xl" position="relative">
        {/* Image */}
        <Image
          src={imageData}
          h="170"
          objectFit="cover"
          alt="property"
          borderTopStartRadius="xl"
        />

        {/* Edit icon */}
        {userData && userData.role === 'Admin' && ( <Flex position="absolute" top="0" right="0" >
          <Link to={`/insert-info/${property.ppt_id}`}>
            <IconButton
              aria-label="Edit property"
              icon={<BiEdit />}
              size="sm"
              borderBottomLeftRadius="2xl"
            />
          </Link>
        </Flex>
        )}
        

        <VStack px="4" align="left">
          <Text fontSize="13px" color="grey">
            {property.ppt_type}
          </Text>

          <Heading mt="-1" fontSize="16px" letterSpacing="tight" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {property.ppt_title}
          </Heading>

          <Text mt="-1" fontWeight="extrabold" fontSize="14px" color="emerald.700">
            {" "}
            {property.price !== null ? (
              <>
                {property.price?.toLocaleString()}
                <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                  &nbsp;THB{property.ppt_saleorrent === "RENT" ? "/month" : ""}
                </span>
              </>
            ) : (
              "n/a"
            )}{" "}
          </Text>

          <Divider mt="2.5" />

          <HStack spacing="5">
            <HStack>
              <BiBed style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_bedroom}</Text>
            </HStack>

            <HStack>
              <BiBath style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_showerroom}</Text>
            </HStack>

            <HStack>
              <BiArea style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_size} SQM</Text>
            </HStack>
          </HStack>
          <div mb="2.5" />
        </VStack>
      </Stack>
    </Flex>
  );
};

export default HighlightItem;