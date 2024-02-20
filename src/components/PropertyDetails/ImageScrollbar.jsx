import { useState, useRef, useEffect } from 'react';
import { Box, Icon, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from './SingleProperty.module.css';

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
        {isLoading ? (
          <Flex justify="center" align="center" height="70vh">
            {showTimeoutMessage ? (
              <Text>Loading too many images...</Text>
            ) : (
              <>
                <Spinner size="xl" color="emerald.800" />
                <Text>&nbsp;&nbsp;Finding properties image ...</Text>
              </>
            )}
          </Flex>
        ) : (
          data.map((item, index) => (
            <Box
              key={index}
              itemID={item.id}
              overflow="hidden"
              className={styles.images}
              p="1"
              marginRight="2"
              display="inline-block"
            >
              {item.media_type === 'Video' ? (
                <video
                  controls
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain'
                  }}
                  src={`data:video/mp4;base64,${item.media_data}`}
                />
              ) : (
                <Image
                  alt="property"
                  src={`data:image/jpeg;base64,${item.media_data}`}
                  width='100%'
                  height='auto'
                  maxHeight='70vh'
                  objectFit="contain"
                />
              )}
              
            </Box>
          ))
        )}
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
