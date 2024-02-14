import { useRef  } from 'react';

import { VStack, Drawer, Box, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Button, useDisclosure, Center, Text } from '@chakra-ui/react';

import profile from "../../assets/images/user.png";

const ProfilePanel = ({ isLoggedIn, onLogout, userData}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  
  return (
    <>
      <img src={profile} alt="Profile" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={onOpen} />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
          <DrawerOverlay />
          <DrawerContent>
              <DrawerCloseButton />
              <Center>
              <DrawerHeader>Profile</DrawerHeader>
              </Center>
              <DrawerBody px='14' mt='2' alignItems='center' justifyContent='center'>
                  <Center>
                    <img src={profile} alt="Profile" style={{ width: '60px', height: '60px', cursor: 'pointer' }}/>
                    <Box ml='4'>
                      <Text fontSize='15px'>{userData.role}</Text>
                      <Text fontSize='15px'>{userData.email}</Text>
                    </Box>
                  </Center>
                  <VStack as='nav' spacing='8' alignItems='left' >

                      {isLoggedIn ? (
                          <Button size='sm' variant='outline' mt='8' onClick={onLogout}>Logout</Button>
                      ) : (
                          <></>
                      )}
                  </VStack>
              </DrawerBody>
          </DrawerContent>
      </Drawer>
    </>
  )
}

export default ProfilePanel