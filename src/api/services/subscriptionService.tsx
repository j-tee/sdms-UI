/* eslint-disable import/no-extraneous-dependencies */
import { QueryParams } from "@/src/models/queryParams";
import { Subscription, SubscriptionViewModel } from "@/src/models/subscription";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const SubscriptionService = {
  getMakePayment: async (params: any) => {
    const token = params.token.access_token;
    const headers = {
      ...(await authHeader()),
      token: token,
    };

    return axios.post(
      `${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token/request_to_pay`,
      params,
      {
        headers: headers,
      }
    );
  },
  initializeTransaction: async (params: any) =>
    axios.post(
      `${API_URL}api/v1/parents/subscriptions/initialize_transaction`,
      params,
      { headers: await authHeader() }
    ), // eslint-disable-line max-len
  getMomoToken: async () =>
    axios.get(
      `${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token`,
      { headers: await authHeader() }
    ),
  requestToPay: async (params: any) =>
    axios.post(
      `${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key/momo_token/request_to_pay`,
      params,
      {
        headers: {
          ...(await authHeader()),
          token: sessionStorage.getItem("momo_token"),
        },
      }
    ), // eslint-disable-line max-len
  getMomoApiKey: async () =>
    axios.get(
      `${API_URL}api/v1/subscriptions/payments/student/keys/momo_api_key`,
      { headers: await authHeader() }
    ),
  getSubscriptions: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/subscriptions?${queryStringFormatter(params)}`,
      { headers: await authHeader() }
    ),
  addSubscription: async (subscription: Subscription) =>
    axios.post(`${API_URL}api/v1/subscriptions`, subscription, {
      headers: await authHeader(),
    }),
  deleteSubscription: async (subscription: SubscriptionViewModel) =>
    axios.delete(`${API_URL}api/v1/subscriptions/${subscription.id}`, {
      headers: await authHeader(),
    }),
  updateSubscription: async (subscription: Subscription, id: number) =>
    axios.put(`${API_URL}api/v1/subscriptions/${id}`, subscription, {
      headers: await authHeader(),
    }),
  getSubscription: async (id: number) =>
    axios.get(`${API_URL}api/v1/subscriptions/${id}`, {
      headers: await authHeader(),
    }),
  getStudentRecentSubscription: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/schools/subscriptions/student_recent_subscription?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};
export default SubscriptionService;
