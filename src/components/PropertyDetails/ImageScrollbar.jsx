import { useState, useRef, useEffect } from 'react';
import { Box, Icon, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from './SingleProperty.module.css';
import { config } from "../../data";

import watermark from "../../assets/images/zillion-watermark.png";

const ImageScrollbar = ({ data, isLoading }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowTimeoutMessage(true);
      }, 10000);
    } else {
      setShowTimeoutMessage(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  const scrollToIndex = (index) => {
    const imageWidth = containerRef.current.children[0].offsetWidth;
    const scrollAmount = index * imageWidth;
    containerRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setCurrentImageIndex(index);
  };

  const scrollPrev = () => {
    const newIndex = Math.max(0, currentImageIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollNext = () => {
    const newIndex = Math.min(data.length - 1, currentImageIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        marginRight="1"
        onClick={scrollPrev}
        cursor="pointer"
        opacity={currentImageIndex !== 0 ? 1 : 0}
        visibility={currentImageIndex !== 0 ? 'visible' : 'hidden'}
        transition="opacity 0.3s, visibility 0.3s"
      >
        <Icon as={FiChevronLeft} fontSize="4xl" />
      </Flex>
      <Box
        ref={containerRef}
        className={styles.imageContainer}
        overflowX={{ base: 'auto', xl: 'hidden' }}
        whiteSpace="nowrap"
        width={{ base: 'full', xl: '65vw' }}
      >
        {data.map((item, index) => (
            <Box
              key={index}
              position="relative" // Container for image and watermark
              overflow="hidden"
              p="1"
              marginRight="2"
              display="inline-block"
              width='100%'
              height='auto'
              maxHeight='70vh'
            >
              <Image
                alt="property"
                src={`${config.api}/image-data/${item.media_id}`}
                width='100%'
                height='auto'
                maxHeight='70vh'
                objectFit="contain"
                loading="lazy"
              />
              <Box
                position="absolute" // Absolute position for the watermark
                top="0" // Aligns to the top of the container
                left="0" // Aligns to the left of the container
                width="100%" // Ensures the watermark covers the width of the container
                height="100%" // Ensures the watermark covers the height of the container
                display="flex"
                justifyContent="center" // Center the watermark horizontally
                alignItems="center" // Center the watermark vertically
                backgroundImage={`url(${watermark})`}
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="contain" // Adjust as needed to ensure the watermark fits well within the image
                opacity="0.5" // Adjust the watermark opacity
              />
            </Box>
          ))
        }
      </Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        marginLeft="1"
        onClick={scrollNext}
        cursor="pointer"
        h='100%'
        opacity={currentImageIndex !== data.length - 1 ? 1 : 0}
        visibility={currentImageIndex !== data.length - 1 ? 'visible' : 'hidden'}
        transition="opacity 0.3s, visibility 0.3s"
      >
        <Icon as={FiChevronRight} fontSize="4xl" />
      </Flex>
    </Flex>
  );
};

export default ImageScrollbar;
