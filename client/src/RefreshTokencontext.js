import React, { createContext, useContext, useState } from 'react';

const RefreshTokencontext = createContext();

const RefreshTokenProvider = ({ children }) => {
    const [refreshToken, setRefreshToken] = useState(null);

    return (
        <RefreshTokencontext.Provider value={{ refreshToken, setRefreshToken }}>
            {children}
        </RefreshTokencontext.Provider>
    )
}

export default RefreshTokenProvider;

export const useRefreshToken = () => {
    return useContext(RefreshTokencontext);
}