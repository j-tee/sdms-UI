import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const BillsFeesService = {
  addFee: async (fee: any) =>
    axios.post(`${API_URL}api/v1/schools/fees/create`, fee, {
      headers: await authHeader(),
    }),
  getFees: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/schools/fees/index?${queryStringFormatter(params)}`,
      { headers: await authHeader() }
    ),
  deleteFee: async (feeId: number) =>
    axios.delete(`${API_URL}api/v1/fees/${feeId}`, { headers: await authHeader() }),
  updateFee: async (fee: any, id: number) =>
    axios.put(`${API_URL}api/v1/fees/${id}`, fee, { headers: await authHeader() }),
  getFee: async (feeId: number) =>
    axios.get(`${API_URL}api/v1/fees/${feeId}`, { headers: await authHeader() }),
  getStudentFees: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/schools/student/fees/student_fees?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};

export default BillsFeesService;
