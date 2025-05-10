import { router, Stack } from "expo-router";
import { TailwindProvider } from "tailwind-rn";
import "./globals.css";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { store } from './redux/store';
import { Provider } from "react-redux";
import { store } from "@/src/api/redux/store";
import MainNavigator from "@/src/components/navigation/MainNavigator";
import { AuthProvider } from "@/src/utilities/AuthContext";
import Toast from "react-native-toast-message";
import { useEffect } from "react";

const RootLayout = () => {
 
  return (
    <Provider store={store}>       
      <AuthProvider>         
         <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/login"
            options={{
              title: "Login",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="auth/register"
            options={{
              title: "Sign Up",
              presentation: "modal",
            }}
          />
        </Stack>       
      </AuthProvider>
      <Toast />
    </Provider>
  );
};

export default RootLayout;
