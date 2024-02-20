import React, { useState, useContext } from 'react';
import { Flex, Heading, Box, Button, HStack, chakra, ButtonGroup, useBreakpointValue, Modal, ModalOverlay, ModalContent, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import LoginForm from './Login';
import { config } from '../../data';
import { UserDataContext } from "../../context/UserDataContext";
import ProfilePanel from './ProfilePanel';

import logo from "../../assets/images/logo.jpg";


const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const { userData, setUserData } = useContext(UserDataContext);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleProfileClick = () => {
    setShowProfilePanel(!showProfilePanel);
  };

  const handleLogout = async () => {
    try {
        // Remove the JWT from local storage
        localStorage.removeItem('jwtToken');

        // Update the state to reflect that the user is logged out
        setIsLoggedIn(false);
        setShowProfilePanel(false);
        setUserData(null);

        // You might not need to make a server request for logging out
        // But if you have server-side logic to handle (like token blacklisting), keep the request
        // const response = await fetch(`${config.api}/zillionassets/en/logout`, {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        //     },
        // });

        // if (response.ok) {
        //     alert('You have been logged out successfully.');
        // } else {
        //     const errorResponse = await response.json();
        //     alert(`Error Log out: ${errorResponse.error}`);
        // }
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
  };

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='center' justify='space-between'>
        <Link to='/'>
          <Flex justifyContent='center' alignItems='center'>
          <Image src={logo} alt="Profile" boxSize="30px" objectFit="cover" cursor="pointer" mr="1" />
          <Heading fontSize='3xl' color='emerald.950'>Zillionassets</Heading>
          </Flex>
        </Link>
        {
          isDesktop ? (
            <>
              <ButtonGroup as='nav' variant='link' spacing='5'>
                <Link to='/'>
                  <Button fontSize='16px' key='Home'>Home</Button>
                </Link>
                <Link to='/About-Us'>
                  <Button fontSize='16px' key='Home'>About Us</Button>
                </Link>
              </ButtonGroup>

              <HStack>
                {userData && userData.role === 'Admin'? (
                  <Link to="insert-info" >
                    <Button bgColor='emerald.950' size='sm' variant='solid' >Insert info</Button>
                  </Link>
                ) : (
                  <></>
                )}
                {isLoggedIn ? (
                  <Box style={{ position: 'relative' }}>
                    <ProfilePanel userData={userData} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                  </Box>
                ) : (
                  <Button size='sm' variant='outline' onClick={openLoginModal}>Log in</Button>
                )}
              </HStack>
            </>
          ) : (
            <NavMobile openLoginModal={openLoginModal} userData={userData} isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
          )
        }
      </Flex>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          <LoginForm setIsLoginModalOpen={setIsLoginModalOpen} setIsLoggedIn={setIsLoggedIn}/> 
        </ModalContent>
      </Modal>
    </chakra.header>
  )
}

export default Header;
