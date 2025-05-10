// src/utilities/userSession.ts
// import * as SecureStore from 'expo-secure-store';
import { decode } from 'base-64';
// import { UserModel } from '../models/userModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../models/userModel';

global.atob = decode; // Polyfill for React Native

const TOKEN_KEY = 'token';
const USER_KEY = 'userData';
const MOMO_KEY = 'momoToken';

const UserSession = {
  // Get user roles from token
  getRoles: async (): Promise<string[]> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      // console.log('Token====>:', token);
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
      const token = await AsyncStorage.getItem(TOKEN_KEY);
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
      const token = await AsyncStorage.getItem(TOKEN_KEY);
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
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY),
        AsyncStorage.removeItem(MOMO_KEY),
      ]);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },
  isUserStaffOrOwner: (userId:number, users:UserModel[]) => {
    console.log('User ID:', userId);
    console.log('Users:', users);
    return users.some(user => user.id === userId);
  },
  // Momo token validation
  validateMomoToken: async (): Promise<boolean> => {
    try {
      const momoToken = await AsyncStorage.getItem(MOMO_KEY);
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