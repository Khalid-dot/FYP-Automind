import React, { createContext, useState } from 'react';

export const UserContext = createContext(); // Declare and export UserContext only once

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    profileImage: null,
    fullName: '',
    gender: '',
    phoneNumber: '',
    nationality: '',
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
