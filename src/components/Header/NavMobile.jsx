import { useRef, useContext  } from 'react';
import { Link } from 'react-router-dom';

import { ButtonGroup, VStack, Input, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Button, IconButton, useDisclosure, Center } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const NavMobile = ({openLoginModal, userData, isLoggedIn, onLogout}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  
  return (
    <>
        <IconButton variant='ghost' 
            icon={<FiMenu fontSize='1.35rem' />}
            aria-label='Open Menu'
            onClick={onOpen} ref={btnRef}
        />
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <Center>
                <DrawerHeader>Menu</DrawerHeader>
                </Center>
                <DrawerBody px='14' mt='4'>
                    <VStack as='nav' spacing='8' alignItems='left'>
                        <Link to='/'>
                            <Button variant='link' key='Home'>Home</Button>
                        </Link>
                        <Link to='/About-Us'>
                            <Button variant='link' key='About Us'>About Us</Button>
                        </Link>

                        {userData && userData.role === 'Admin'? (
                            <Link to="insert-info" >
                                <Button bgColor='emerald.950' size='sm' variant='solid' >Insert info</Button>
                            </Link>
                            ) : (
                            <></>
                        )}
                        {isLoggedIn ? (
                            <Button size='sm' variant='outline' onClick={onLogout}>Logout</Button>
                        ) : (
                            <Button size='sm' variant='outline' onClick={openLoginModal}>Log in</Button>
                        )}
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default NavMobile