import {
  loginUserInfo,
  RegisterUserModel,
  ResetPasswdUserData,
  RoleModel,
  UserRole,
} from "@/src/models/authModel";
import { UserModel } from "@/src/models/userModel";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../../services/authService";
import RoleService from "../../services/roleService";

const initialState = {
  status: "",
  response: {},
  momotoken: {},
  isSuccessful: false,
  isLoggedIn: false,
  isLoading: false,
  user: {} as UserModel,
  message: "",
  roles: [] as string[],
  user_roles: [] as string[],
  role: {},
  assigned_roles: [] as RoleModel[],
};

export const resetMessage = createAsyncThunk(
  "auth/resetMessage",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.resetMessage();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterUserModel, thunkAPI) => {
    try {
      // API call to register user
      const response = await AuthService.register(userData);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (user:UserModel, thunkAPI) => {
    try {
      const response = await AuthService.logout(user);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: loginUserInfo, thunkAPI) => {
    try {
      const response = await AuthService.login(
        userData.email,
        userData.password
      );
      // console.log("auth/loginUser====>:", response);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email: string, thunkAPI) => {
    try {
      const response = await AuthService.requestPasswordReset(email);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (pwd: ResetPasswdUserData, thunkAPI) => {
    try {
      const response = await AuthService.resetPassword(pwd);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getUserByEmail = createAsyncThunk(
  "auth/getUserByEmail",
  async (email: string, thunkAPI) => {
    try {
      const response = await AuthService.getUserByEmail(email);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getRoles = createAsyncThunk(
  "auth/getRoles",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getRoles();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCurrentUserRoles = createAsyncThunk(
  "auth/getCurrentUserRoles",
  async (_, thunkAPI) => {
    try {
      const response = await AuthService.getCurrentUserRoles();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getUserRoles = createAsyncThunk(
  "auth/getUserRoles",
  async (user_id: number, thunkAPI) => {
    try {
      const response = await AuthService.getUserRoles(user_id);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addUserToRole = createAsyncThunk(
  "auth/addUserToRole",
  async (userRole: UserRole, thunkAPI) => {
    try {
      const response = await AuthService.addUserToRole(userRole);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeRole = createAsyncThunk(
  "auth/removeRole",
  async (userRole: UserRole, thunkAPI) => {
    try {
      const response = await AuthService.removeRole(
        userRole.user_id,
        userRole.role_id
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const verifyCapture = createAsyncThunk(
  "auth/verifyCapture",
  async (params: any, thunkAPI) => {
    try {
      const response = await AuthService.verifyCaptcha(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getAssignedRoles = createAsyncThunk(
  "auth/getAssignedRoles",
  async (params: any, thunkAPI) => {
    try {
      const response = await AuthService.getAssignedRoles(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const removeUserFromRole = createAsyncThunk(
  "auth/removeUserFromRole",
  async (params: any, thunkAPI) => {
    try {
      const response = await RoleService.removeUserFromRole(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendAccountConfirmationLink = createAsyncThunk(
  "auth/sendAccountConfirmationLink",
  async (email: string, thunkAPI) => {
    try {
      const response = await AuthService.sendAccountConfirmationLink(email);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getMomoToken.fulfilled, (state, action) => ({
      //   ...state,
      //   momotoken: action.payload.data,
      //   isSuccessful: true,
      //   isLoading: false
      // }))
      // .addCase(getMomoToken.rejected, (state, action) => ({
      //   ...state,
      //   message: 'The action requested has failed',

      //   isLoading: false,
      // }))
      // .addCase(getMomoToken.pending, (state, action) => ({
      //   ...state,
      //   message: 'The action requested is pending',
      //   isLoading: true,
      // }))
      .addCase(sendAccountConfirmationLink.fulfilled, (state, action) => ({
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        isLoading: false,
      }))
      .addCase(
        sendAccountConfirmationLink.rejected,
        (state, action: PayloadAction<any>) => ({
          ...state,
          message: action.payload.message,
          status: action.payload.status,
          isLoading: false,
        })
      )
      .addCase(sendAccountConfirmationLink.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(removeUserFromRole.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(removeUserFromRole.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(removeUserFromRole.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(
        getAssignedRoles.fulfilled.type,
        (
          state,
          action: PayloadAction<{ roles: RoleModel[]; status: string }>
        ) => ({
          ...state,
          assigned_roles: action.payload.roles,
          status: action.payload.status,
          isLoading: false,
        })
      )
      .addCase(
        getAssignedRoles.rejected,
        (state, action: PayloadAction<any>) => ({
          ...state,
          assigned_roles: [],
          message: action.payload.message,
          status: action.payload.status,
          isLoading: false,
        })
      )
      .addCase(getAssignedRoles.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(
        verifyCapture.fulfilled,
        (state, action: PayloadAction<{ data: any; status: number }>) => ({
          ...state,
          response: action.payload.data,
          status: action.payload.status.toString(), // Convert status to string
          isLoading: false,
        })
      )
      .addCase(verifyCapture.rejected, (state, action: PayloadAction<any>) => ({
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        isLoading: false,
      }))
      .addCase(verifyCapture.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(removeRole.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(removeRole.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(removeRole.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",

        isLoading: true,
      }))
      .addCase(addUserToRole.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(addUserToRole.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(addUserToRole.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(getRoles.fulfilled, (state, action) => ({
        ...state,
        roles: action.payload.data.roles,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(getRoles.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getRoles.pending, (state, action) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(getUserRoles.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has failed",

        isLoading: false,
      }))
      .addCase(getUserRoles.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getUserRoles.pending, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getCurrentUserRoles.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getCurrentUserRoles.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getCurrentUserRoles.pending, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getUserByEmail.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getUserByEmail.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(getUserByEmail.pending, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetPassword.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetPassword.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetPassword.pending, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(requestPasswordReset.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(requestPasswordReset.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(requestPasswordReset.pending, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetMessage.fulfilled, (state) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetMessage.rejected, (state) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(resetMessage.pending, (state) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(logoutUser.fulfilled, (state, action) => ({
        ...state,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(logoutUser.rejected, (state) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(logoutUser.pending, (state) => ({
        ...state,
        message: "The action requested is pending",
        isLoading: true,
      }))
      .addCase(registerUser.fulfilled, (state) => ({
        ...state,
        message: "The action requested has completed",
        isLoading: false,
      }))
      .addCase(registerUser.rejected, (state, action) => ({
        ...state,
        message: "The action requested has failed",
        isLoading: false,
      }))
      .addCase(registerUser.pending, (state, action) => ({
        ...state,
        isLoggedIn: false,
        message: "Loading...",
        isLoading: true,
      }))
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => ({
        ...state,
        isLoggedIn: false,
        message: action.payload ? action.payload.message : "Login failed",
        isLoading: false,
      }))
      .addCase(loginUser.pending, (state) => ({
        ...state,
        isLoggedIn: false,
        message: "Loading...",
        isLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        isLoggedIn: true,
        user: action.payload.data.user,
        message: "User logged in successfully",
        isLoading: false,
      }))
      .addCase(getCurrentUser.fulfilled, (state, action) => ({
        ...state,
        isLoggedIn: true,
        user: action.payload,
        message: "User Profile Retrieved Successfully",
      }))
      .addCase(getCurrentUser.rejected, (state) => ({
        ...state,
        message: "Failed to retriev user profile",
        isLoading: true,
      }))
      .addCase(getCurrentUser.pending, (state) => ({
        ...state,
        isLoggedIn: false,
        isLoading: true,
        message: "User Profile Retrieval pending",
        isSuccessful: false,
      }));
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
