import { Box, Image } from "@chakra-ui/react";

const FullScreenImage = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="blackAlpha.800"
      zIndex="modal"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose} 
    >
      <Image src={image} maxW="90%" maxH="90%" objectFit="contain" />
    </Box>
  );
};

export default FullScreenImage;