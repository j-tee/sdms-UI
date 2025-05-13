/* eslint-disable import/no-extraneous-dependencies */
import { SubscriptionFee } from "@/src/models/subscriptionFee";
import authHeader from "@/src/utilities/authHeader";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const SubscriptionFeeService = {
  getSubscriptionFees: async () =>
    axios.get(`${API_URL}api/v1/subscription_fees`, {
      headers: await authHeader(),
    }),
  addSubscriptionFee: async (subscriptionFee: SubscriptionFee) =>
    axios.post(`${API_URL}api/v1/subscription_fees`, subscriptionFee, {
      headers: await authHeader(),
    }),
  deleteSubscriptionFee: async (subscriptionFee: SubscriptionFee) =>
    axios.delete(`${API_URL}api/v1/subscription_fees/${subscriptionFee.id}`, {
      headers: await authHeader(),
    }),
  updateSubscriptionFee: async (subscriptionFee: SubscriptionFee, id: number) =>
    axios.put(`${API_URL}api/v1/subscription_fees/${id}`, subscriptionFee, {
      headers: await authHeader(),
    }),
  getSubscriptionFee: async (id: number) =>
    axios.get(`${API_URL}api/v1/subscription_fees/${id}`, {
      headers: await authHeader(),
    }),
};
export default SubscriptionFeeService;
