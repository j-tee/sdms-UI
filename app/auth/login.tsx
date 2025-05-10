import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/src/api/redux/store";
import { loginUser } from "@/src/api/redux/slices/authSlice";
import { showToast } from "@/src/utilities/toast";
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const {message, user, isLoggedIn} = useSelector((state: any) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // or useNavigation() if using React Navigation

  const handleSubmit = async () => {
    setValidated(true);
    setLoading(true);

    try {
      const response: any = await dispatch(loginUser({ email, password }));
      // console.log("Login response====>:", response);
      if (response.meta?.requestStatus === "fulfilled") {
        showToast("success", "User logged in successfully");
        
        const user = await AsyncStorage.getItem("user")
        // console.log("User logged in successfully ===>:", user);
        setTimeout(() => {
          router.replace("/schools" as any); // or any screen name
        }, 2000);
      } else {
        showToast("error", "Login failed");
      }
    } catch (error: any) {
      showToast("error", error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("Message from Redux:", message);
  }, [message]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 8,
  },
  // Add any additional styles you need
});
