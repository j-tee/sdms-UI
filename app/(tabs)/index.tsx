import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import MainNavigator from '@/src/components/navigation/MainNavigator';

const HomeScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="py-6 border-b border-gray-200">
        <Text className="text-3xl font-bold text-blue-800 text-center">
          ALPHA LOGIQUE
        </Text>
      </View>

      {/* Navigation Links */}
      <View className="flex-row flex-wrap justify-center gap-4 my-6">
       <MainNavigator />
      </View>

      {/* Content Section */}
      <View className="my-8">
        <Text className="text-lg text-gray-600 leading-relaxed">
          Are you a partner? Have you just moved into a new area or town? 
          Are you looking for a school for your MBA? Explore through our directory 
          of schools. Check out data on academic performance and facilities. 
          You'll find student location ratios and costs all made available 
          on the platform.
        </Text>

        {/* Action Buttons */}
        <View className="flex-row justify-around mt-10 mb-4">
          <TouchableOpacity className="bg-blue-800 px-8 py-3 rounded-full">
            <Text className="text-white font-bold">READ MORE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="border-2 border-blue-800 px-8 py-3 rounded-full">
            <Text className="text-blue-800 font-bold">CONTACT US</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({})