import React, { useRef, useState, useEffect, useContext } from 'react';
import { Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue, Divider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import LoginForm from './Login';
import { config } from '../../data';
import { UserDataContext } from "../../context/UserDataContext";
import ProfilePanel from './ProfilePanel'; // Import ProfilePanel component

import profile from "../../assets/images/user.png";


const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false); // Add state for profile panel visibility
  const { userData } = useContext(UserDataContext);

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
      }  else {
        console.error('Failed to log out:', response.statusText);
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
                {
                  ['Home', 'About Us'].map((item) => (
                    <Button fontSize='16px' key={item}>{item}</Button>
                  ))
                }
              </ButtonGroup>

              <HStack>
                {userData && userData.role === 'Admin'? (
                  <a href="insert-info" >
                    <Button bgColor='emerald.950' size='sm' variant='solid' >Insert info</Button>
                  </a>
                ) : (
                  <></>
                  // <Button bgColor='emerald.950' size='sm' variant='solid' >Contact</Button>
                )}
                {isLoggedIn ? (
                  <div style={{ position: 'relative' }}>
                    <img src={profile} alt="Profile" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={handleProfileClick} />
                    <ProfilePanel isOpen={showProfilePanel} onClose={() => setShowProfilePanel(false)} onLogout={handleLogout} />
                  </div>
                ) : (
                  <Button size='sm' variant='outline' onClick={openLoginModal}>Log in</Button>
                )}
              </HStack>
            </>
          ) : (
            <NavMobile openLoginModal={openLoginModal}/>
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
