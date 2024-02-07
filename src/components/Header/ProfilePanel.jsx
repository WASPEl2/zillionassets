import React, { useContext, useEffect, useRef } from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import profile from "../../assets/images/user.png";
import { UserDataContext } from "../../context/UserDataContext";

const ProfilePanel = ({ isOpen, onClose, onLogout }) => {
  const { userData } = useContext(UserDataContext);
  const panelRef = useRef(null);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Box
      ref={panelRef}
      position="absolute"
      right="px"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p="2"
      display={isOpen ? 'block' : 'none'}
    >
      <Text fontSize='15px'>{userData.role}</Text>
      <Text fontSize='15px'>{userData.email}</Text>

      <Box mt="8">
        <Button size='sm' variant='outline' onClick={onLogout}>Logout</Button>
      </Box>
    </Box>
  );
};

export default ProfilePanel;
