import { useState } from 'react';

import AuthContext from '../contexts/auth';

const AuthProvider = ({ children }) => {
  const currentUser = localStorage.user;
  const parsedUserData = currentUser !== undefined ? JSON.parse(currentUser).username : undefined;
  const [user, setUser] = useState(parsedUserData);

  const logIn = ({ token, username }) => {
    localStorage.setItem('user', JSON.stringify({ token, username }));
    setUser(username);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(undefined);
  };

  const getAuthHeader = () => {
    const { token } = JSON.parse(localStorage.user);
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      logIn, logOut, user, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
