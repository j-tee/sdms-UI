// AuthContext.js
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AppDispatch } from '../api/redux/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../api/redux/slices/authSlice';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValues {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
const dispatch = useDispatch<AppDispatch>();
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      // Additional logout logic if needed
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const contextValues: AuthContextValues = {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    handleLogout: function (): Promise<void> {
      throw new Error('Function not implemented.');
    }
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValues => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
