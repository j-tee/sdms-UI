import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { logoutUser } from "@/src/api/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/src/api/redux/store";
import { UserModel } from "@/src/models/userModel";
import { useAuth } from "@/src/utilities/AuthContext";
import UserSession from "@/src/utilities/userSession";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/assets/images/logo.png";
import { showToast } from "@/src/utilities/toast";

const MainNavigator = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [roles, setRoles] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const { openLoginModal, closeLoginModal } = useAuth();

  // Role definitions (preserved from your original code)
  const schoolRoles = [
    "admin",
    "employee",
    "staff",
    "secretary",
    "parent",
    "student",
    "owner",
    "principal",
    "vice_principal",
    "bursar",
    "librarian",
    "counselor",
    "nurse",
    "security",
    "driver",
    "cleaner",
    "cook",
    "gardener",
    "watchman",
    "storekeeper",
    "other",
  ];

  useEffect(() => {
    const initializeRoles = async () => {
      try {
        const userRoles = await UserSession.getRoles();
        setRoles(userRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]);
      }
    };
    initializeRoles();
  }, [isLoggedIn]);

  const handleNavigation = (path: string) => {
    setShowMenu(false);
    router.push(path as any);
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(result)) {
        showToast("success", "Logout successful");
        router.replace("/auth/login" as any);
      }
    } catch (error) {
      showToast("error", "Logout failed");
    }
  };

  // Menu items with icons
  const menuItems: {
    path: string;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[] = [
    { path: "/schools", label: "SCHOOLS", icon: "school" },
    { path: "/support", label: "SUPPORT", icon: "help" },
    { path: "/about", label: "ABOUT", icon: "info" },
    { path: "/contact", label: "CONTACT US", icon: "mail" },
  ];

  // Auth items (conditionally rendered)
  const authItems: {
    path?: string;
    action?: () => void;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[] = isLoggedIn
    ? [{ action: handleLogout, label: "LOGOUT", icon: "exit-to-app" }]
    : [
        { path: "/auth/register", label: "SIGNUP", icon: "person-add" },
        { path: "/auth/login", label: "LOGIN", icon: "login" },
      ];

      return (
        <View style={styles.container}>
          {/* Header with logo, title, and menu button */}
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.titleContainer}>
              <Text style={styles.subdomain}>https://sdms.alphalogiquetechnologies.com</Text>
              <Text style={styles.title}>ALPHA LOGIQUE</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setShowMenu(!showMenu)} 
              style={styles.menuButton}
            >
              <MaterialIcons 
                name={showMenu ? "close" : "menu"} 
                size={28} 
                color="#1a237e" 
              />
            </TouchableOpacity>
          </View>
    
          {/* Dropdown Menu - Now absolutely positioned */}
          {showMenu && (
            <View style={styles.dropdownMenuContainer}>
              <View style={styles.dropdownMenu}>
                {/* Main Menu Items */}
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.path}
                    onPress={() => handleNavigation(item.path)}
                    style={styles.menuItem}
                  >
                    <MaterialIcons name={item.icon} size={20} color="#1a237e" />
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
    
                {/* Auth Items */}
                {authItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => item.path ? handleNavigation(item.path) : item.action && item.action()}
                    style={styles.menuItem}
                  >
                    <MaterialIcons name={item.icon} size={20} color="#1a237e" />
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    zIndex: 1, // Ensure header stays above other content
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2, // Higher than dropdown
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ... (keep your other existing styles)
  
  // New dropdown container styles
  dropdownMenuContainer: {
    position: 'absolute',
    top: 80, // Adjust based on your header height
    right: 16,
    left: 16,
    zIndex: 1,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logo: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    resizeMode: 'contain', // Ensures the image scales properly
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1a237e',
  },
  menuButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  subdomain: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
  },
  // ... (rest of your styles)
});


export default MainNavigator;
