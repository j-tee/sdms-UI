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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
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
    </Tabs>
  );
}