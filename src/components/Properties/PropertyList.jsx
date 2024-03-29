import { Center, Button, Grid, Heading, Stack, Flex, Spinner, Text, Box } from '@chakra-ui/react';
import { useContext, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

import { HouseContext } from "../../context/HouseContext";
import PropertyItem from './PropertyItem';
import Pagination from './Pagination';

const PropertyList = ({scrollToHead}) => {
    const { properties, isLoading, currentPage, setCurrentPage, totalPages } = useContext(HouseContext);

    // Adjusting nextPage and prevPage functions to include scrolling
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            scrollToHead();
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            scrollToHead();
        }
    };
    if (properties.length === 0 && !isLoading) {
        return (
            <Stack maxH='400px'>
                <Heading size="lg" p={{ base: '6', md: '10' }} align="center">
                    Oops... Can try another one?
                </Heading>
            </Stack>
        );
    }

    return (
        <>
            {isLoading ?
                <Flex justify="center" align="center" h='50vh'>
                    <Spinner size="xl" color="emerald.800" />
                    <Text>&nbsp;&nbsp;Loading properties data</Text>
                </Flex>
            : 
                <Grid my='3' rowGap='4' gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'>
                    {properties.map((item, index) => (
                        <Link to={`/property-details/${item.ppt_id}`} key={index} onClick={() => window.scrollTo(0, 0)}>
                            <Box
                                className="property-item-wrapper"
                                transition="transform 0.2s ease"
                                _hover={{ transform: 'scale(1.05)' }}
                            >
                                <PropertyItem key={item.ppt_id} property={item} />
                            </Box>
                        </Link>
                    ))}
                </Grid>
            }
            
            <Center>
                <Button onClick={prevPage} disabled={currentPage === 1} size='sm' variant='outline'>
                    Previous Page
                </Button>
                <div style={{ margin: '0 8px' }}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} scrollToHead={scrollToHead}/>
                </div>
                <Button onClick={nextPage} disabled={currentPage === totalPages} size='sm' variant='outline'>
                    Next Page
                </Button>
            </Center>
        </>
    );
};

export default PropertyList;
