import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginWithPhone = (phoneNumber, countryCode) => {
        // Add your phone-based authentication logic here.
        // You can use the phoneNumber and countryCode for the authentication process.
        setUser({ phoneNumber, countryCode });
        // perform further authentication actions... 
    };

    const logout = () => {
        setUser(null);
        // perform further logout actions...
    };

    return (
        <AuthContext.Provider value={{ user, loginWithPhone, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
