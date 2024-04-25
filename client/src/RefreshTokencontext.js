import React, { createContext, useContext, useState } from 'react';

export const RefreshTokenContext = createContext();

export const RefreshTokenProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState(null);

  return (
    <RefreshTokenContext.Provider value={{ refreshToken, setRefreshToken }}>
      {children}
    </RefreshTokenContext.Provider>
  );
};

// export const useRefreshToken = () => {
//   return useContext(RefreshTokenContext);
// };