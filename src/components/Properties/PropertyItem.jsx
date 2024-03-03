import { useEffect, useState, useContext } from 'react';
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
  Spinner,
} from "@chakra-ui/react";
import { config } from '../../data';
import { UserDataContext } from "../../context/UserDataContext";
import { Link  } from 'react-router-dom';


import { BiBed, BiBath, BiArea, BiEdit } from "react-icons/bi";

const PropertyItem = ({ property }) => {
  const { userData } = useContext(UserDataContext);

  const purpose = property.ppt_saleorrent != "" ? property.ppt_saleorrent : property.ppt_selling_price ? "SALE" : "RENT";

  let price = purpose === "SALE" ? property.ppt_selling_price : property.ppt_rental_price;
  let suffix = purpose === "RENT" ? "/month" : "";
  let isRent = purpose === "RENT";

  // Fallback to generic price if specific sale or rent price is not available
  if (!price) {
    price = property.price;
    suffix = isRent ? "/month" : "";
  }

  const formattedPrice = Number(price).toLocaleString();
  
  return (
    <Flex justify="center" align="center" pl='0'>
      <Stack width="300px" bg="white" boxShadow="xl" borderRadius="xl" position="relative">
        <Image
          src={`${config.api}/asset-main-image/${property.ppt_id}`}
          h="170"
          objectFit="cover"
          alt="property"
          borderTopStartRadius="xl"
          loading="lazy"
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
            {formattedPrice}
            <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
              &nbsp;THB{suffix}
            </span>
          </Text>

          <Divider mt="2.5" />

          <HStack spacing="5">
            <HStack>
              <BiBed style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_bedroom || "n/a"}</Text>
            </HStack>

            <HStack>
              <BiBath style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_showerroom || "n/a"}</Text>
            </HStack>

            <HStack>
              <BiArea style={{ color: "emerald.900" }} />
              <Text fontSize="12px">{property.ppt_size || "n/a"} SQM</Text>
            </HStack>
          </HStack>
          <div mb="2.5" />
        </VStack>
      </Stack>
    </Flex>
  );
};

export default PropertyItem;
