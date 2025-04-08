import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const LoginScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Register Screen</Text>
          <Link href="/login">Back to Login</Link>
        </View>
      );
}

export default LoginScreen

const styles = StyleSheet.create({})