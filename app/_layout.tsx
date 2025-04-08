import { router, Stack } from "expo-router";
import { TailwindProvider } from "tailwind-rn";
import "./globals.css";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
// import { store } from './redux/store';
import { Provider } from "react-redux";
import { store } from "@/src/api/redux/store";
import MainNavigator from "@/src/components/navigation/MainNavigator";

const RootLayout = () => {
  return (
    <Provider store={store}>
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Sign Up',
          presentation: 'modal'
        }} 
      />
    </Stack>
    </Provider>

   
  );
};

export default RootLayout;
