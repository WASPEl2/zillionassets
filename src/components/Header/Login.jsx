import React, { useState, useContext } from 'react';
import { Box, Text, Link, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { config } from '../../data';
import { UserDataContext } from "../../context/UserDataContext";


const LoginForm = ({setIsLoginModalOpen, setIsLoggedIn}) => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Box maxW="md" p='6' borderWidth='1px' borderRadius='lg' boxShadow='lg' >
      <Box display="flex" justifyContent="center" mb={4} >
        <Text
          mr={4}
          cursor="pointer"
          fontWeight={activeTab === 'login' ? 'bold' : 'normal'}
          onClick={() => handleTabChange('login')}
          borderBottom= {activeTab === 'login' ?'2px': ''}
          transition="border-bottom 0.1s ease"
        >
          Login
        </Text>
        <Text
          cursor="pointer"
          fontWeight={activeTab === 'register' ? 'bold' : 'normal'}
          onClick={() => handleTabChange('register')}
          borderBottom= {activeTab === 'login' ?'': '2px'}
          transition="border-bottom 0.1s ease"
        >
          Register
        </Text>
      </Box>

      {activeTab === 'login' ? (
        <LoginFormContent  handleTabChange={handleTabChange} setIsLoginModalOpen={setIsLoginModalOpen} setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <RegisterFormContent handleTabChange={handleTabChange}/>
      )}
    </Box>
  );
};

const LoginFormContent = ({ handleTabChange, setIsLoginModalOpen, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserData } = useContext(UserDataContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${config.api}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the JWT in local storage or session storage
        localStorage.setItem('jwtToken', data.access_token);

        setUserData(data.user);
        setIsLoginModalOpen(false);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else {
        const errorResponse = await response.json();
        alert(`Error Login: ${errorResponse.error}`);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <Text mt={2} color="red.500" textAlign="left">
          {errorMessage}
        </Text>
      )}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@email.com"
        />
      </FormControl>
      <FormControl id="password" mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </FormControl>
      <Button
        mt={4}
        bgColor="emerald.800"
        type="submit"
        w="full"
        isLoading={loading}
        isDisabled={email.trim() === '' || password.trim() === '' || loading}
      >
        Login
      </Button>
      
      <Text mt={4} textAlign="left">
        <Link onClick={() => handleTabChange('register')}>New user? Register here</Link>
      </Text>
    </form>
  );
};

const RegisterFormContent = ({handleTabChange}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailAlreadyUsed, setEmailAlreadyUsed] = useState(false); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailAlreadyUsed(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setPasswordMismatch(e.target.value !== password);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      !isPasswordValid(password)
    ) {
      console.log('Please enter a valid email and password.');
      return;
    }
    if (passwordMismatch) {
      return;
    }
    
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await fetch(`${config.api}/register`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),

      });

      
      
      if (response.ok) {
        alert("Register successfully!");
        handleTabChange('login')
      } 
      else if (response.status === 409) {
        setEmailAlreadyUsed(true);
      }else {
        const errorResponse = await response.json();
        alert(`Error Login: ${errorResponse.error}`);
      }

    } catch (error) {
      console.error('Error registering user:', error.message);
    } finally {
      setLoading(false); // Set loading to false after form submission (whether success or failure)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="email" mt={4} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@email.com"
          borderColor={emailAlreadyUsed ? 'red.500' : ''}
        />
        {emailAlreadyUsed && (
          <Text color="red.500" mt={2}>
            Email is already in use. Please use a different email.
          </Text>
        )}
      </FormControl>
      <FormControl id="password" mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        
      </FormControl>
      {!isPasswordValid(password) && password.trim() != '' && (
        <Text color="red.500" mt={2}>
          Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.
        </Text>
      )}
      <FormControl id="confirmPassword" mt={4} isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm your password"
        />
      </FormControl>
      {passwordMismatch && (
        <Text color="red.500" mt={2}>
          Passwords do not match. Please re-enter your passwords.
        </Text>
      )}
      
      <Button
        mt={4}
        bgColor="emerald.800"
        type="submit"
        w="full"
        isLoading={loading}
        isDisabled={
          email.trim() === '' ||
          password.trim() === '' ||
          !isPasswordValid(password) ||
          passwordMismatch ||
          loading 
        }
      >
        Register
      </Button>
    </form>
  );
};


export default LoginForm;
