import React, { useRef, useState, useEffect, useContext } from 'react';
import { Flex, Heading, Box, Button, HStack, chakra, ButtonGroup, useBreakpointValue, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import LoginForm from './Login';
import { config } from '../../data';
import { UserDataContext } from "../../context/UserDataContext";
import ProfilePanel from './ProfilePanel';

import profile from "../../assets/images/user.png";


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
      const response = await fetch(`${config.api}/zillionassets/en/logout`, {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        mode: 'cors',
      });

      if (response.status === 201) {
        setIsLoggedIn(false);
        setShowProfilePanel(false);
        setUserData(null)
      } else if (response.status === 400) {
        setIsLoggedIn(false);
        setShowProfilePanel(false);
        setUserData(null)
         alert(`Your are not logged in.`);
      } else {
        const errorResponse = await response.json();
        alert(`Error Log out: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
    // Perform logout logic
    
    
  };

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='center' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='3xl' color='emerald.950'>Zillionassets</Heading>
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
