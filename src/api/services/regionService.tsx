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
    getRegions: (params: any) => axios.get(`${API_URL}api/v1/regions?${queryStringFormatter(params)}`, { headers: authHeader() }),
    addRegion: (region: any) => axios.post(`${API_URL}api/v1/regions`, region, { headers: authHeader() }),
    deleteRegion: (region: Region) => axios.delete(`${API_URL}api/v1/regions/${region.id}`, { headers: authHeader() }),
    updateRegion: (region: any) => axios.put(`${API_URL}api/v1/regions/${region.id}`, region, { headers: authHeader() }),
    getRegion: (region: Region) => axios.get(`${API_URL}api/v1/regions/${region.id}`, { headers: authHeader() }),
};

export default RegionService;

