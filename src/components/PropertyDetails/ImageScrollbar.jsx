import { useState, useRef, useEffect } from 'react';
import { Box, Icon, Flex, Image } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from './SingleProperty.module.css';

const ImageScrollbar = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
      const handleWheel = (event) => {
          if (containerRef.current && containerRef.current.contains(event.target)) {
              event.preventDefault();

              // Calculate the direction of the scroll
              const scrollDirection = Math.sign(event.deltaY);

              // Adjust the current image index based on the scroll direction
              const newIndex = Math.min(
                Math.max(currentImageIndex + scrollDirection, 0),
                data.length - 1
              );

              // Scroll to the new index
              scrollToIndex(newIndex);
          }
      };

      if (containerRef.current) {
          containerRef.current.addEventListener('wheel', handleWheel);

          // return () => {
          //     containerRef.current.removeEventListener('wheel', handleWheel);
          // };
      }
  }, [currentImageIndex]);

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
        className={styles.arrow}
        justifyContent="center"
        alignItems="center"
        marginRight="1"
        onClick={scrollPrev}
        cursor="pointer"
      >
        <Icon as={FiChevronLeft} fontSize="4xl" />
      </Flex>
      <Box
        ref={containerRef}
        className={styles.imageContainer}
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
        width={{base: 'full', lg: '65vw'}}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            itemID={item.id}
            overflow="hidden"
            className={styles.images}
            p="1"
            marginRight="2"
            display="inline-block"
          >
            <Image
              alt="property"
              src={`data:image/jpeg;base64,${item.media_data}`}
              width='100%'
              height='70vh'
              objectFit="cover"
            />
          </Box>
        ))}
      </Box>
      <Flex
        className={styles.arrow}
        justifyContent="center"
        alignItems="center"
        marginLeft="1"
        onClick={scrollNext}
        cursor="pointer"
        h='100%'
      >
        <Icon as={FiChevronRight} fontSize="4xl" />
      </Flex>
    </Flex>
  );
};

export default ImageScrollbar;
