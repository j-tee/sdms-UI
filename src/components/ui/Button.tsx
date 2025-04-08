import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ label, onPress, variant = 'primary' }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`py-3 px-6 rounded-lg ${
      variant === 'primary' 
        ? 'bg-blue-600' 
        : 'bg-white border border-blue-600'
    }`}>
    <Text 
      className={`text-center font-bold ${
        variant === 'primary' ? 'text-white' : 'text-blue-600'
      }`}>
      {label}
    </Text>
  </TouchableOpacity>
);