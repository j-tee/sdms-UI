/* eslint-disable import/no-extraneous-dependencies */
import { Region } from '@/src/models/region';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Region } from '../models/region';
// import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const RegionService = {
    getRegions: async (params: any) => {
        const headers = await authHeader();
        return axios.get(`${API_URL}api/v1/regions?${queryStringFormatter(params)}`, { headers });
    },
    addRegion: async (region: any) => {
        const headers = await authHeader();
        return axios.post(`${API_URL}api/v1/regions`, region, { headers });
    },
    deleteRegion: async (region: Region) => {
        const headers = await authHeader();
        return axios.delete(`${API_URL}api/v1/regions/${region.id}`, { headers });
    },
    updateRegion: async (region: any) => {
        const headers = await authHeader();
        return axios.put(`${API_URL}api/v1/regions/${region.id}`, region, { headers });
    },
    getRegion: async (region: Region) => {
        const headers = await authHeader();
        return axios.get(`${API_URL}api/v1/regions/${region.id}`, { headers });
    },
};

export default RegionService;

