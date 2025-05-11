// context/UserDataContext.js

import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const UserDataContext = createContext();

// 2. Export the provider
export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({ email: '', name: '' });

    const updateUserData = (newData) => {
        setUserData(prev => ({ ...prev, ...newData }));
    };

    return (
        <UserDataContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};

// 3. Export the consumer (optional, for other components to use)
export const useUserData = () => useContext(UserDataContext);
