import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    storySessionId: null, 
    login: () => {
        
    }, 
    logout: () => {

    }
});
