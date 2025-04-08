import { RegisterUserModel, ResetPasswdUserData, UserRole } from "@/src/models/authModel";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import UserSession from "@/src/utilities/userSession";
import axios from "axios";
// import { RegisterUserModel, ResetPasswdUserData, UserRole } from "../models/authModel";
// import authHeader from "../utility/authHeader";
// import UserSession from "../utility/userSession";
// import queryStringFormatter from "../utility/queryStringFormatter";

const API_URL = process.env.REACT_APP_API_BASE_URL;
const AuthService = () => {
  const sendAccountConfirmationLink = (email: string) => axios.post(`${API_URL}users/current_user/resend_confirmation_instruction`, { email }, { headers: authHeader() }); 
  const getAssignedRoles = (params: any) => axios.get(`${API_URL}api/v1/roles?${queryStringFormatter(params)}`, { headers: authHeader() }); 
  const addUserToRole = (userRole: UserRole) => axios.post(`${API_URL}current_user/addUserToRole`, userRole, { headers: authHeader() });
  const removeRole = (userId: number, roleId: number) => axios.get(`${API_URL}current_user/removeRole/${userId}/${roleId}`, { headers: authHeader() });
  const getCurrentUserRoles = () => (UserSession.getroles());
  const getRoles = () => axios.get(`${API_URL}current_user/roles`, { headers: authHeader() });
  const getUserRoles = (user_id: number) => axios.get(`${API_URL}current_user/user/roles/${user_id}`, { headers: authHeader() });
  const getCurrentUser = () => axios.get(`${API_URL}current_user`, { headers: authHeader() });
  const verifyCaptcha = (params:any) => axios.post(`${API_URL}users/current_user/verify_captcha?${queryStringFormatter(params)}`, { headers: authHeader() });  

  const resetPassword = (pwd: ResetPasswdUserData) => axios.put(`${API_URL}password`,
    {
      user: {
        password: pwd.password,
        password_confirmation: pwd.password_confirmation,
        reset_password_token: pwd.reset_password_token,
      },
    });

  const requestPasswordReset = (email: string) => axios.post(`${API_URL}password`,
    {
      user:
      {
        email,
      },
    });
  
  const login = (email: string, password: string) => axios
    .post(`${API_URL}login`,
      {
        user: {
          email,
          password,
        },
      })
    .then((response: any) => {
      if (response.headers.authorization) {
        const [bearer, token] = response.headers.authorization.split(' ');
        sessionStorage.setItem('bearer', JSON.stringify(bearer));
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
      }

      return response.data;
    });

  const resetMessage = () => undefined;

  const logout = () => axios.delete(`${API_URL}logout`, {
    headers: authHeader(),
    data: JSON.parse(sessionStorage.getItem('user') || '{}')
  })
    .then((response: any) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      return response;
    });

  const getUserByEmail = (email: string) => axios.get(`${API_URL}users/${email}`, {headers: authHeader()});

  const register = (user:RegisterUserModel) => axios.post(`${API_URL}signup`,
    {
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
    sendAccountConfirmationLink
  };
};

export default AuthService();
