// src/utilities/userSession.ts
import * as SecureStore from 'expo-secure-store';
import { decode } from 'base-64';
import { UserModel } from '../models/userModel';

global.atob = decode; // Polyfill for React Native

const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';
const MOMO_KEY = 'momoToken';

const UserSession = {
  // Get user roles from token
  getRoles: async (): Promise<string[]> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        const decoded = decodeJWT(token);
        return decoded?.roles || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting roles:', error);
      return [];
    }
  },

  // Get decoded user info
  getUserInfo: async (): Promise<{
    userCategory: string;
    username?: string;
    email?: string;
  }> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) return { userCategory: 'Public' };

      const decoded = decodeJWT(token);
      return {
        userCategory: decoded?.user_category || 'Public',
        username: decoded?.username,
        email: decoded?.email,
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      return { userCategory: 'Public' };
    }
  },

  // Validate main auth token
  validateToken: async (): Promise<boolean> => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) return false;

      const decoded = decodeJWT(token);
      const expirationTime = (decoded?.exp || 0) * 1000;
      
      if (expirationTime < Date.now()) {
        await UserSession.clearSession();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  },

  // Clear all session data
  clearSession: async (): Promise<void> => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY),
        SecureStore.deleteItemAsync(MOMO_KEY),
      ]);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },

  // Momo token validation
  validateMomoToken: async (): Promise<boolean> => {
    try {
      const momoToken = await SecureStore.getItemAsync(MOMO_KEY);
      if (!momoToken) return false;

      const decoded = decodeJWT(momoToken);
      const expirationTime = (decoded?.exp || 0) * 1000;
      return expirationTime > Date.now();
    } catch (error) {
      console.error('Momo token validation failed:', error);
      return false;
    }
  },
};

// Helper function to decode JWT
const decodeJWT = (token: string): any => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = decode(payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('JWT decoding failed:', error);
    return null;
  }
};

export default UserSession;