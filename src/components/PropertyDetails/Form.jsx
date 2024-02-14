import { Textarea, Image, VStack, HStack, Box, Text, Input, Button, Divider,CloseButton, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaLine, FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import logo from "../../assets/images/logo.jpg";

const Form = ({ setShowForm }) => {
  const handleFacebookMessage = () => {
    window.open('https://m.me/ZillionAssets/', '_blank');
  };

  const handleLineCall = () => {
    window.open('https://line.me/ti/p/%40zillionassets', '_blank');
  };

  const handleWhatsAppMessage = () => {
    // Add logic to open WhatsApp with a pre-filled message
    window.open('https://wa.me/66997456415', '_blank');
  };

  const handleEmail = () => {
    // Add logic to open default email client with pre-filled email address
    window.open('mailto:fon_sr@yahoo.com,soravee.zillionassets@gmail.com', '_blank');
  };

  const handleTelephoneCall = () => {
    // Add logic to initiate a telephone call
    window.open('tel:+66997456415');
  };

  return (
    <VStack  px='5' py='6' pr='20'>
      <HStack spacing={4} >
        <Image borderRadius='full' boxSize='75px' src={logo} alt='Agent' />
        <Box>
          <Text fontWeight='bold' fontSize='lg'>Zillion Assets  </Text>
          <Text fontSize='sm'>+66997456415</Text>
        </Box>
      </HStack>
      <Divider my={4} />
      <VStack align='start' spacing={2} w='full'>
        <Text fontWeight='bold'>Contact:</Text>
        <Text>Soravee (Fon)</Text>
        <Text fontSize='sm' color='gray.500'>Inbox: <a href="https://m.me/ZillionAssets/" >m.me/ZillionAssets/</a></Text>
        <Text>MB/whatsapp: +66997456415</Text>
        <Text>E-mail: fon_sr@yahoo.com, </Text>
        <Text>        soravee.zillionassets@gmail.com </Text>
        <Text>Line ID: @zillionassets</Text>
      </VStack>
      <Divider my={4} />
      <HStack spacing={4}>
        <IconButton 
          w='full' 
          aria-label='Send Message'
          icon={<FaFacebook />} 
          onClick={handleFacebookMessage} 
        />
        <IconButton 
          w={{ base: 'full', md: '50%' }} 
          aria-label='Call'
          variant='outline' 
          icon={<FaLine />} 
          onClick={handleLineCall} 
        />
        <IconButton 
          w='full' 
          aria-label='WhatsApp'
          icon={<FaWhatsapp />} 
          onClick={handleWhatsAppMessage} 
        />
        <IconButton 
          w={{ base: 'full', md: '50%' }} 
          aria-label='Email'
          variant='outline' 
          icon={<FaEnvelope />} 
          onClick={handleEmail} 
        />
        <IconButton 
          w='full' 
          aria-label='Telephone'
          icon={<FaPhone />} 
          onClick={handleTelephoneCall} 
        />
      </HStack>
      <CloseButton 
        position='fixed'
        right='30px'
        onClick={() => setShowForm(false)} 
      />
    </VStack>
  );
};

export default Form;
