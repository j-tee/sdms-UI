import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import MainNavigator from '@/src/components/navigation/MainNavigator';

export default function TabsLayout() {
  return (
    // <MainNavigator />
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'My Home',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schools"
        options={{
          title: 'Schools',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="money" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="academics"
        options={{
          title: 'Academics',
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}