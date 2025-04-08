import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

interface NavLinksProps {
    items: Array<{
      label: string;
      route: string;
    }>;
  }
const navlinks = ({ items }: NavLinksProps) => {
  return (
    <View className="flex-row flex-wrap justify-center gap-4 my-6">
      {items.map(({ label, route }) => (
        <Link
          key={label}
          href={route}
          className="px-4 py-2 border border-blue-800 rounded-full"
        >
          <Text className="text-blue-800 text-sm">{label}</Text>
        </Link>
      ))}
    </View>
  )
}

export default navlinks

const styles = StyleSheet.create({})