import {
  RegisterUserModel,
  ResetPasswdUserData,
  UserRole,
} from "@/src/models/authModel";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import UserSession from "@/src/utilities/userSession";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserModel } from "@/src/models/userModel";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const AuthService = () => {
  // const {user} = useSelector((state:any) => state.auth);
  const sendAccountConfirmationLink = async (email: string) =>
    axios.post(
      `${API_URL}users/current_user/resend_confirmation_instruction`,
      { email },
      { headers: await authHeader() }
    );
  const getAssignedRoles =async (params: any) =>
    axios.get(`${API_URL}api/v1/roles?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    });
  const addUserToRole = async (userRole: UserRole) =>
    axios.post(`${API_URL}current_user/addUserToRole`, userRole, {
      headers: await authHeader(),
    });
  const removeRole = async (userId: number, roleId: number) =>
    axios.get(`${API_URL}current_user/removeRole/${userId}/${roleId}`, {
      headers: await authHeader(),
    });
  const getCurrentUserRoles = () => UserSession.getRoles();
  const getRoles = async () =>
    axios.get(`${API_URL}current_user/roles`, { headers: await authHeader() });
  const getUserRoles =async (user_id: number) =>
    axios.get(`${API_URL}current_user/user/roles/${user_id}`, {
      headers: await authHeader(),
    });
  const getCurrentUser = async () =>
    axios.get(`${API_URL}current_user`, { headers: await authHeader() });
  const verifyCaptcha = async (params: any) =>
    axios.post(
      `${API_URL}users/current_user/verify_captcha?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    );

  const resetPassword = (pwd: ResetPasswdUserData) =>
    axios.put(`${API_URL}password`, {
      user: {
        password: pwd.password,
        password_confirmation: pwd.password_confirmation,
        reset_password_token: pwd.reset_password_token,
      },
    });

  const requestPasswordReset = (email: string) =>
    axios.post(`${API_URL}password`, {
      user: {
        email,
      },
    });

  const login = (email: string, password: string) =>
    axios
      .post(`${API_URL}login`, {
        user: {
          email,
          password,
        },
      })
      .then(async (response: any) => {
        console.log(
          // "Login response====> ARE WE GETTING A RESPONSE FROM HERE:",
          response
        );
        if (response.headers.authorization) {
          const [bearer, token] = response.headers.authorization.split(" ");
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("bearer", bearer);
        }

        return response;
      });

  const resetMessage = () => undefined;

  const logout = async (user: UserModel) =>
    axios
      .delete(`${API_URL}logout`, {
        headers: await authHeader(),
        data: user,
      })
      .then(async (response: any) => {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        return response;
      });

  const getUserByEmail = async (email: string) =>
    axios.get(`${API_URL}users/${email}`, { headers: await authHeader() });

  const register = (user: RegisterUserModel) =>
    axios.post(`${API_URL}signup`, {
      user: user,
    });

  return {
    // getMomoToken,
    login,
    logout,
    register,
    resetMessage,
    getCurrentUser,
    requestPasswordReset,
    resetPassword,
    getUserByEmail,
    getRoles,
    getCurrentUserRoles,
    addUserToRole,
    removeRole,
    getUserRoles,
    verifyCaptcha,
    getAssignedRoles,
    sendAccountConfirmationLink,
  };
};

export default AuthService();
