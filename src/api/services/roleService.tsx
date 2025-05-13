/* eslint-disable import/no-extraneous-dependencies */
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const RoleService = {
  getRoles: async (params: any) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/roles/index?${queryStringFormatter(params)}`,
      { headers, params }
    );
  },
  addUserToRole: async (params: any) => {
    const headers = await authHeader();
    return axios.post(
      `${API_URL}api/v1/roles/schools/new_role/add_user_to_role?`,
      params,
      { headers }
    );
  },
  removeUserFromRole: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/roles/schools/new_role/remove_user_from_role?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader(), params }
    ),
};
export default RoleService;
