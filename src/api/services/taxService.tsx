/* eslint-disable import/no-extraneous-dependencies */
import { Tax } from '@/src/models/tax';
import authHeader from '@/src/utilities/authHeader';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Tax } from '../models/tax';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const TaxService = {
  getTaxes: async () => {
    const headers = await authHeader();
    return axios.get(`${API_URL}api/v1/taxes`, { headers });
  },
  addTax: async (tax: Tax) => {
    const headers = await authHeader();
    return axios.post(`${API_URL}api/v1/taxes`, tax, { headers });
  },
  deleteTax: async (tax: Tax) => {
    const headers = await authHeader();
    return axios.delete(`${API_URL}api/v1/taxes/${tax.id}`, { headers });
  },
  updateTax: async (tax: Tax, id: number) => {
    const headers = await authHeader();
    return axios.put(`${API_URL}api/v1/taxes/${id}`, tax, { headers });
  },
  getTax: async (id: number) => {
    const headers = await authHeader();
    return axios.get(`${API_URL}api/v1/taxes/${id}`, { headers });
  },
};
export default TaxService;

