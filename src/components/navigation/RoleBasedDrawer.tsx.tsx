import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { useAuth } from '../../utility/AuthContext';
import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/src/utilities/AuthContext';
import { RootState } from '@/src/api/redux/store';
import React from 'react';

type RootStackParamList = {
  Schools: undefined;
  Support: undefined;
  About: undefined;
  Contact: undefined;
  SystemAdmin: undefined;
  Subscriptions: undefined;
  MyWards: undefined;
  RegisterSchool: undefined;
  Subjects: undefined;
  Lessons: undefined;
  Assessments: undefined;
  Reports: undefined;
  Login: undefined;
};

const RoleBasedDrawer = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { handleLogout } = useAuth();
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

  const renderCommonItems = () => (
    <>
      <DrawerItem
        label="Schools"
        icon={({ color, size }: { color: string; size: number }) => (
          <MaterialIcons name="school" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Schools')}
      />
      <DrawerItem
        label="Support"
        icon={({ color, size }: { color: string; size: number }) => (
          <MaterialIcons name="help" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Support')}
      />
      <DrawerItem
        label="About"
        icon={({ color, size }: { color: string; size: number }) => (
          <MaterialIcons name="info" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('About')}
      />
      <DrawerItem
        label="Contact"
        icon={({ color, size }: { color: string; size: number }) => (
          <MaterialIcons name="mail" color={color} size={size} />
        )}
        onPress={() => navigation.navigate('Contact')}
      />
    </>
  );

  const renderRoleSpecificItems = () => {
    switch (userCategory) {
      case "Company":
        return (
          <>
            <DrawerItem
              label="System Admin"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="admin-panel-settings" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('SystemAdmin')}
            />
            <DrawerItem
              label="Subscriptions"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="subscriptions" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Subscriptions')}
            />
          </>
        );
      case "Parent":
        return (
          <DrawerItem
            label="My Wards"
            icon={({ color, size }: { color: string; size: number }) => (
              <MaterialIcons name="family-restroom" color={color} size={size} />
            )}
            onPress={() => navigation.navigate('MyWards')}
          />
        );
      case "Owner":
        return hasSchoolRole && (
          <DrawerItem
            label="Register School"
            icon={({ color, size }: { color: string; size: number }) => (
              <MaterialIcons name="app-registration" color={color} size={size} />
            )}
            onPress={() => navigation.navigate('RegisterSchool')}
          />
        );
      case "Staff":
      case "Admin":
        return hasSchoolRole && (
          <>
            <DrawerItem
              label="Subjects"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="menu-book" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Subjects')}
            />
            <DrawerItem
              label="Lessons"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="library-books" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Lessons')}
            />
            <DrawerItem
              label="Assessments"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="assignment" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Assessments')}
            />
            <DrawerItem
              label="Reports"
              icon={({ color, size }: { color: string; size: number }) => (
                <MaterialIcons name="assessment" color={color} size={size} />
              )}
              onPress={() => navigation.navigate('Reports')}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>Alpha Logique</Text>
        {isLoggedIn && user && (
          <Text style={styles.userEmail}>{user.email}</Text>
        )}
      </View>

      {renderCommonItems()}
      {isLoggedIn && renderRoleSpecificItems()}

      {isLoggedIn ? (
        <DrawerItem
          label="Logout"
          icon={({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          )}
          onPress={handleLogout}
        />
      ) : (
        <DrawerItem
          label="Login"
          icon={({ color, size }: { color: string; size: number }) => (
            <MaterialIcons name="login" color={color} size={size} />
          )}
          onPress={() => navigation.navigate('Login')}
        />
      )}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default RoleBasedDrawer;