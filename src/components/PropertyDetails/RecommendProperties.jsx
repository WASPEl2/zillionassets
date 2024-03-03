import { useState, useRef, useEffect } from 'react';
import {
  VStack,
  Box,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import PropertyItem from '../Properties/PropertyItem';

const RecommendProperties = ({ data }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleWheel = (event) => {
            if (scrollRef.current && scrollRef.current.contains(event.target)) {
                event.preventDefault();
                scrollRef.current.scrollLeft += event.deltaY;
            }
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('wheel', handleWheel);

            // return () => {
            //     scrollRef.current.removeEventListener('wheel', handleWheel);
            // };
        }
    }, []);

    const handleLinkClick = () => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    };

    return (
        <Box
            px='2vw'
            pb='6'
            overflowX={{base:'auto',xl:'hidden'}}
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
            ref={scrollRef}
        >
            {data.map((item, index) => (
                <Link to={`/property-details/${item.ppt_id}`} key={index} style={{ marginRight: '10px' }} onClick={() => window.scrollTo(0, 0)}>
                    <PropertyItem key={item.ppt_id} property={item} />
                </Link>
            ))}
        </Box>
    );
};

export default RecommendProperties;
