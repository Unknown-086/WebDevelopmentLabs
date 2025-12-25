import { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('user'); // 'user' or 'admin'

  const toggleRole = () => {
    setRole(prev => prev === 'user' ? 'admin' : 'user');
  };

  const isAdmin = role === 'admin';

  return (
    <RoleContext.Provider value={{ role, toggleRole, isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
};
