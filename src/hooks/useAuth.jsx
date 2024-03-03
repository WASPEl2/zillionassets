import { useContext } from 'react';
import { UserDataContext } from '../context/UserDataContext';

export const useAuth = () => {
  const { userData } = useContext(UserDataContext);

  const isAdmin = userData && userData.role === 'Admin';

  return { isAdmin };
};
