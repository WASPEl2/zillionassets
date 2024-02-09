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

const RecommendProperties = ({ data, isLoading }) => {
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

    return (
        <Box
            px='2vw'
            style={{
                overflowX: 'auto',
                display: 'flex',
                flexDirection: 'row',
            }}
            ref={scrollRef}
        >
            {data.map((item, index) => (
                <Link to={`/property-details/${item.id}`} key={index} style={{ marginRight: '10px' }}>
                    <PropertyItem key={item.id} property={item} />
                </Link>
            ))}
        </Box>
    );
};

export default RecommendProperties;