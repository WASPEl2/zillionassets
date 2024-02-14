import { Button, useBreakpointValue, Select} from '@chakra-ui/react';


const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const isDesktop = useBreakpointValue({ base: false, lg: true })
    
    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const renderPageButtons = () => {
        const numButtonsToShow = 5;
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

export default Pagination;