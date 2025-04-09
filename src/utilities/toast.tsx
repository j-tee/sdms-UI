import { show } from 'react-native-toast-message';

export const showToast = (
  type: 'success' | 'error' | 'info',
  message: string,
  options = {}
) => {
  show({
    type,
    text1: message,
    visibilityTime: 4000,
    ...options
  });
};