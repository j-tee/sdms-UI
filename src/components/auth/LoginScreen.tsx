import { View, Text } from 'react-native';
import { Button } from '../ui/Button';

export default function LoginScreen() {
  return (
    <View className="flex-1 p-6 bg-gray-50">
      <Text className="text-2xl font-bold text-gray-900 mb-6">
        Welcome to Alpha Logique: Your Learning Companion
      </Text>
      
      <Button 
        label="Sign In" 
        onPress={() => console.log('Login')} 
        variant="primary"
      />
    </View>
  );
}