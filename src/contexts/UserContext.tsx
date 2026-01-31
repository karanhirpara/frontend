import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  isAdmin: boolean;
  toggleAdmin: () => void;
  userEmail: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => setIsAdmin((prev) => !prev);

  return (
    <UserContext.Provider value={{ isAdmin, toggleAdmin, userEmail: 'user@example.com' }}>
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
