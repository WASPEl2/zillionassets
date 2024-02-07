import React, { createContext, useState, useContext } from 'react';

// Create a context for managing user data
export const UserDataContext = createContext('');

// Create a provider component to wrap your application and provide the user data
const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to consume the user data context
export default UserDataProvider;
