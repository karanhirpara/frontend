import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  userEmail: string;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const toggleAdmin = () => setIsAdmin((prev) => !prev);
  
  const login = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserEmail('');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <UserContext.Provider value={{ isAdmin, toggleAdmin, userEmail, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
