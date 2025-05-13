import { GradingScale } from "@/src/models/gradingScale";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";
const GradingScaleService = {
  getGradingScales: async (params: any) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/grading_scales?${queryStringFormatter(params)}`,
      { headers }
    );
  },
  getGradingScale: async (id: number) => {
    const headers = await authHeader();
    return axios.get(`${API_URL}api/v1/grading_scales/${id}`, { headers });
  },
  addGradingScale: async (gradingScale: GradingScale) =>
    axios.post(`${API_URL}api/v1/grading_scales`, gradingScale, {
      headers: await authHeader(),
    }),
  updateGradingScale: async (gradingScale: GradingScale) =>
    axios.put(
      `${API_URL}api/v1/grading_scales/${gradingScale.id}`,
      gradingScale,
      { headers: await authHeader() }
    ),
  deleteGradingScale: async (id: number) =>
    axios.delete(`${API_URL}api/v1/grading_scales/${id}`, {
      headers: await authHeader(),
    }),
};
export default GradingScaleService;
