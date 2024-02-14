import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Heading, Icon, Flex } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import HighlightItem from './HighlightItem';
import { HouseContext } from "../../context/HouseContext";

const Highlight = () => {
    const { highlight, isLoading } = useContext(HouseContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleWheel = (event) => {
            if (containerRef.current && containerRef.current.contains(event.target)) {
                event.preventDefault();
                const scrollDirection = Math.sign(event.deltaY);
                const newIndex = Math.min(
                    Math.max(currentImageIndex + scrollDirection, 0),
                    highlight.length - 1
                );
                scrollToIndex(newIndex);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, [currentImageIndex, highlight]);

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
        const newIndex = Math.min(highlight.length - 1, currentImageIndex + 1);
        scrollToIndex(newIndex);
    };

    if (highlight.length === 0 || isLoading) {
        return null;
    }

    return (
        <>
            <Heading py='2' size={{ base: 'sm', md: 'md' }}>Exclusive Opportunity</Heading>
            <Flex>
                {currentImageIndex !== 0 && <Flex
                    justifyContent="center"
                    alignItems="center"
                    onClick={scrollPrev}
                    cursor="psointer"
                >
                    <Icon as={FiChevronLeft} fontSize="4xl" />
                </Flex>
                }
                <Box
                    ref={containerRef}
                    px='2vw'
                    pb='6'
                    overflowX={{ base: 'auto', xl: 'hidden' }}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {highlight.map((item, index) => (
                        <Link to={`/property-details/${item.ppt_id}`} key={index} style={{ marginRight: '10px' }} onClick={() => window.scrollTo(0, 0)}>
                            <HighlightItem key={item.ppt_id} property={item} />
                        </Link>
                    ))}
                </Box>
                {currentImageIndex !== highlight.length - 2 && <Flex
                    justifyContent="center"
                    alignItems="center"
                    onClick={scrollNext}
                    cursor="pointer"
                >
                    <Icon as={FiChevronRight} fontSize="4xl" />
                </Flex> 
                }
            </Flex>
            
            
        </>
    );
};

export default Highlight;
