import { ExitProfile } from "@/src/models/exitProfile";
import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const ExitProfileService = {
  addExitProfile: async (exitProfile: any) => {
    const headers = await authHeader();
    return axios.post(
      `${API_URL}api/v1/schools/exit_profiles/create`,
      exitProfile,
      { headers }
    );
  },
  getExitProfiles: async (params: QueryParams) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/schools/exit_profiles/index?${queryStringFormatter(
        params
      )}`,
      { headers }
    );
  },
  getExitProfile: async (exitProfileId: number) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/schools/exit_profiles/${exitProfileId}`,
      { headers }
    );
  },
  updateExitProfile: async (exitProfile: ExitProfile, id: number) =>
    axios.put(`${API_URL}api/v1/schools/exit_profiles/${id}`, exitProfile, {
      headers: await authHeader(),
    }),
  deleteExitProfile: async (exitProfileId: number) =>
    axios.delete(`${API_URL}api/v1/schools/exit_profiles/${exitProfileId}`, {
      headers: await authHeader(),
    }),
};

export default ExitProfileService;
