import {
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  Image,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import React, { useRef } from 'react';

import { bannerData } from "../data";
import Apartment1Lg from "../assets/images/apartments/a1lg.png";
import Apartment6Lg from "../assets/images/apartments/a6lg.png";

const Banner = ({onGetStartedClick}) => {
  return (
    <>
      <Stack direction="row" my='6' overflow='hidden'>
        <VStack
          flexGrow='1'
          px={{ sm: "6", md: "10" }}
          py={{ sm: '8',  md: "16" }}
          bg="emerald.600"
          justify="center"
          align="left"
          borderRadius="xl"
          maxW={{ base: "100%", lg: "65%" }}
        >
          <Heading fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
            Find You Dream House With us.
          </Heading>
          <Text fontSize="sm">
            Discover your perfect home with our expansive selection of properties. From cozy apartments to luxurious estates, our expert team is dedicated to helping you find the home of your dreams. Start your journey to homeownership with us today!
          </Text>
          <Box pt="3" pb="8" >
            <Button bg="emerald.900" onClick={onGetStartedClick}>Get Started</Button>
          </Box>

          <HStack spacing="3" >
            {bannerData.map((item, index) => (
              <VStack
                key={index}
                bg="emerald.800"
                p="4"
                borderRadius="md"
                align="left"
                pr="3"
                color='white'
              >
                <HStack>
                  <Text fontSize={{sm: '14px', md: 'md'}} fontWeight="extrabold" mr="-2">
                    {Object.keys(item)}
                  </Text>{" "}
                  <BiPlus />
                </HStack>
                <Text fontSize={{sm: '12px', md: 'sm'}}>{Object.values(item)}</Text>
              </VStack>
            ))}
          </HStack>
        </VStack>

        <VStack justify='center'>
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={Apartment1Lg}
              alt="house"
              h='100%'
              objectFit='cover'
            />
          </Box>
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment1Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment6Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
        </VStack>
      </Stack>
    </>
  );
};

export default Banner;
