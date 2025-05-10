/* eslint-disable import/no-extraneous-dependencies */
import { SubscriptionFee } from '@/src/models/subscriptionFee';
import authHeader from '@/src/utilities/authHeader';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { QueryParams } from '../models/queryParams';
// import { SubscriptionFee } from '../models/subscriptionFee';
// import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SubscriptionFeeService = {
  getSubscriptionFees: async () => axios.get(`${API_URL}api/v1/subscription_fees`, { headers: await authHeader() }),
  addSubscriptionFee: async (subscriptionFee: SubscriptionFee) => axios.post(`${API_URL}api/v1/subscription_fees`, subscriptionFee, { headers: await authHeader() }),
  deleteSubscriptionFee: async (subscriptionFee: SubscriptionFee) => axios.delete(`${API_URL}api/v1/subscription_fees/${subscriptionFee.id}`, { headers: await authHeader() }),
  updateSubscriptionFee: async (subscriptionFee: SubscriptionFee, id: number) => axios.put(`${API_URL}api/v1/subscription_fees/${id}`, subscriptionFee, { headers: await authHeader() }),
  getSubscriptionFee: async (id: number) => axios.get(`${API_URL}api/v1/subscription_fees/${id}`, { headers: await authHeader() }),
};
export default SubscriptionFeeService;

