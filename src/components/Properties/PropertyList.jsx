import { Center, Button, Grid, Heading, useBreakpointValue, Stack, Select, Flex, Spinner, Text, Box } from '@chakra-ui/react';
import { useContext } from "react";
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

import { HouseContext } from "../../context/HouseContext";
import PropertyItem from './PropertyItem';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    
    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const renderPageButtons = () => {
        const numButtonsToShow = 5; // You can adjust this number as needed
        const pageButtons = [];

        if (totalPages <= numButtonsToShow) {
            // If total pages are less than or equal to the number of buttons to show, display all pages
            pageButtons.push(...range(1, totalPages));
        } else {
            // Display a range of pages around the current page
            const startPage = Math.max(1, currentPage - Math.floor(numButtonsToShow / 2));
            const endPage = Math.min(totalPages, startPage + numButtonsToShow - 1);

            if (startPage > 1) {
                pageButtons.push(1, '...'); // Show ellipsis if not starting from the first page
            }

            pageButtons.push(...range(startPage, endPage));

            if (endPage < totalPages) {
                pageButtons.push('...', totalPages); // Show ellipsis if not ending on the last page
            }
        }

        return (
            <>
                {pageButtons.map((page, index) => (
                    <Button
                        key={index}
                        size='sm'
                        variant={page === currentPage ? 'solid' : 'outline'}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </Button>
                ))}
            </>
        );
    };

    const handlePageClick = (page) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };

    const handlePageChange = (e) => {
        setCurrentPage(parseInt(e.target.value));
    };

    return (
        <>
            {isDesktop ? (
                renderPageButtons()
            ) : (
                <Select value={currentPage} onChange={handlePageChange}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>
                            Page {page}
                        </option>
                    ))}
                </Select>
            )}
        </>
    );
};

const PropertyList = () => {
    const { properties, isLoading, currentPage, setCurrentPage, totalPages } = useContext(HouseContext);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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
        <>  {isLoading ?
                <Flex justify="center" align="center" h='50vh'>
                    <Spinner size="xl" color="emerald.800" />
                    <Text>
                        &nbsp;&nbsp;Loading properties data
                    </Text>
                </Flex>
            : 
                <Grid my='3' rowGap='4' gridTemplateColumns='repeat(auto-fit, minmax(300px, 1fr))'>
                    {properties.map((item, index) => (
                        <Link to={`/property-details/${item.id}`} key={index}>
                            <PropertyItem key={item.id} property={item} />
                        </Link>
                    ))}
                </Grid>
            }
            
            <Center>
                <Button onClick={prevPage} disabled={currentPage === 1} size='sm' variant='outline'>
                    Previous Page
                </Button>
                <div style={{ margin: '0 8px' }}>
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </div>
                <Button onClick={nextPage} disabled={currentPage === totalPages} size='sm' variant='outline'>
                    Next Page
                </Button>
            </Center>
        </>
    );
};

export default PropertyList;
