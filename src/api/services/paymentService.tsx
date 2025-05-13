import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const PaymentService = {
  addPayment: async (payment: any) => {
    const headers = await authHeader();
    return axios.post(
      `${API_URL}api/v1/schools/fees/payments/create`,
      payment,
      { headers }
    );
  },
  getPayments: async (params: QueryParams) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/schools/fees/payments/index?${queryStringFormatter(
        params
      )}`,
      { headers }
    );
  },
  getPaymentSummary: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/schools/fees/payments/payment_summary?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),

  deletePayment: async (paymentId: number) =>
    axios.delete(`${API_URL}api/v1/payments/${paymentId}`, {
      headers: await authHeader(),
    }),
  updatePayment: async (payment: any, id: number) =>
    axios.put(`${API_URL}api/v1/payments/${id}`, payment, {
      headers: await authHeader(),
    }),
  getPayment: async (paymentId: number) =>
    axios.get(`${API_URL}api/v1/payments/${paymentId}`, {
      headers: await authHeader(),
    }),
};

export default PaymentService;
