import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error reading token from AsyncStorage:', error);
  }

  return headers;
}
