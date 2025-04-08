import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '@/app/(tabs)';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
// import { useAuth } from '../utility/AuthContext';
import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import SchoolsScreen from '../administration/SchoolsScreen';
import SupportScreen from '../administration/SupportScreen';
import AboutScreen from '../administration/AboutScreen';
import LoginScreen from '../auth/LoginScreen';
import RegisterScreen from '../auth/RegisterScreen';
import SystemAdminScreen from '../administration/SystemAdminScreen';
import SubscriptionsScreen from '../finance/SubscriptionsScreen';
import MyWardsScreen from '../enrolment/MyWardsScreen';
import RegisterSchoolScreen from '../administration/RegisterSchoolScreen';
import SubjectsScreen from '../academics/SubjectsScreen';
import LessonsScreen from '../academics/LessonsScreen';
import AssessmentsScreen from '../academics/AssessmentsScreen';
import ReportsScreen from '../academics/ReportsScreen';
import ContactScreen from '../administration/ContactScreen';
import { RootState } from '@/src/api/redux/store';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CommonTabs = () => {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#0066cc',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          {/* <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="home" size={24} color={color} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="Schools"
            component={SchoolsScreen}
            options={{
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="school" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Support"
            component={SupportScreen}
            options={{
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="help" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialIcons name="info" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
    
    function RoleBasedStack() {
      const { user, isLoggedIn } = useSelector((state: RootState) => state.auth ?? {});
      const roles = user?.roles || [];
      const userCategory = user?.userCategory || '';
    
      const schoolRoles = [
        "admin", "employee", "staff", "secretary", "parent", "student", 
        "owner", "principal", "vice_principal", "bursar", "librarian",
        "counselor", "nurse", "security", "driver", "cleaner", "cook",
        "gardener", "watchman", "storekeeper", "other"
      ];
    
      const hasSchoolRole = roles.some((role: string) => schoolRoles.includes(role));
    
      return (
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen 
                name="MainTabs" 
                component={CommonTabs} 
                options={{ headerShown: false }} 
              />
              
              {/* System Admin Routes */}
              {userCategory === "Company" && (
                <>
                  <Stack.Screen name="SystemAdmin" component={SystemAdminScreen} />
                  <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
                </>
              )}
    
              {/* Parent Routes */}
              {userCategory === "Parent" && (
                <Stack.Screen name="MyWards" component={MyWardsScreen} />
              )}
    
              {/* School Owner Routes */}
              {userCategory === "Owner" && hasSchoolRole && (
                <Stack.Screen name="RegisterSchool" component={RegisterSchoolScreen} />
              )}
    
              {/* School Admin/Teacher Routes */}
              {(userCategory === "Staff" || userCategory === "Admin") && hasSchoolRole && (
                <>
                  <Stack.Screen name="Subjects" component={SubjectsScreen} />
                  <Stack.Screen name="Lessons" component={LessonsScreen} />
                  <Stack.Screen name="Assessments" component={AssessmentsScreen} />
                  <Stack.Screen name="Reports" component={ReportsScreen} />
                </>
              )}
    
              {/* Common Routes */}
              <Stack.Screen name="Contact" component={ContactScreen} />
            </>
          )}
        </Stack.Navigator>
      );
    
}
export default function MainNavigator() {
    return <RoleBasedStack />;
  }