/* eslint-disable import/no-extraneous-dependencies */
import { Parent, ParentParams } from "@/src/models/parent";
import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const ParentService = {
  getMyWards: async (params: QueryParams) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/parents/subscriptions/students/my_wards?${queryStringFormatter(
        params
      )}`,
      { headers }
    );
  },
  getParentByEmail: async (email: string) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/parents/email/get_parent_by_email?email_address=${email}`,
      { headers }
    );
  },
  getParents: async (params: ParentParams) =>
    axios.get(`${API_URL}api/v1/parents?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),
  addParent: async (parent: Parent) =>
    axios.post(`${API_URL}api/v1/parents`, parent, {
      headers: await authHeader(),
    }),
  deleteParent: async (parent: Parent, id: number) =>
    axios.delete(`${API_URL}api/v1/parents/${id}`, {
      headers: await authHeader(),
    }),
  updateParent: async (parent: Parent, id: number) =>
    axios.put(`${API_URL}api/v1/parents/${id}`, parent, {
      headers: await authHeader(),
    }),
  getParent: async (parentId: number) => {
    const headers = await authHeader();
    return axios.get(`${API_URL}api/v1/parents/${parentId}`, { headers });
  },
};

export default ParentService;
