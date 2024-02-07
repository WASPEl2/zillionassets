import {
  VStack,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";

const PropertyItem = ({ property }) => {
  return (
    <Flex justify='center' align='center'>
        <Stack justify='center' width="300px" bg="white" boxShadow="xl" borderRadius="xl" >
          <Image src={`data:image/jpeg;base64,${property.image}`} h='170' objectFit='cover' alt='property' borderTopStartRadius="xl"/>

          <VStack px='4' align='left'>
              <Text fontSize="13px" color="grey">
              {property.type}
              </Text>
              
              <Heading mt="-1"  fontSize="16px" letterSpacing="tight">
              {property.title}
              </Heading>

              
              <Text mt="-1" fontWeight="extrabold" fontSize="14px" color="emerald.500">
              {" "}
              {property.rental_price !== null
                ? <>
                  {property.rental_price.toLocaleString()} 
                  <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                    &nbsp;THB/month
                  </span>
                </>
                : property.selling_price !== null
                ? <>
                  {property.selling_price.toLocaleString()} 
                  <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                    &nbsp;THB
                  </span>
                </>
                : "n/a"}{" "}
              </Text>

              <Divider mt="2.5" />

              <HStack spacing="5">
              <HStack>
                  <BiBed style={{ color: "emerald.900" }} />
                  <Text fontSize="12px">{property.bedrooms}</Text>
              </HStack>

              <HStack>
                  <BiBath style={{ color: "emerald.900" }} />
                  <Text fontSize="12px">{property.bathrooms}</Text>
              </HStack>

              <HStack>
                  <BiArea style={{ color: "emerald.900" }} />
                  <Text fontSize="12px">{property.surface}</Text>
              </HStack>
              </HStack>
              <div mb="2.5" />


          </VStack>
        </Stack>
    </Flex>
  );
};

export default PropertyItem;
