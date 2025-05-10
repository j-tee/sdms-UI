import { GradingScale } from '@/src/models/gradingScale';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import { GradingScale } from '../models/gradingScale';
// import queryStringFormatter from '../utility/queryStringFormatter';
// import authHeader from '../utility/authHeader';


const API_URL = process.env.REACT_APP_API_BASE_URL;
const GradingScaleService = {
    getGradingScales: async (params: any) => {
        const headers = await authHeader();
        return axios.get(`${API_URL}api/v1/grading_scales?${queryStringFormatter(params)}`, { headers });
    },
    getGradingScale: async (id: number) => {
        const headers = await authHeader();
        return axios.get(`${API_URL}api/v1/grading_scales/${id}`, { headers });
    },
    addGradingScale: async (gradingScale: GradingScale) => axios.post(`${API_URL}api/v1/grading_scales`,gradingScale,{headers:await authHeader()}), 
    updateGradingScale: async (gradingScale: GradingScale) => axios.put(`${API_URL}api/v1/grading_scales/${gradingScale.id}`,gradingScale,{headers:await authHeader()}),    
    deleteGradingScale: async (id: number) => axios.delete(`${API_URL}api/v1/grading_scales/${id}`, { headers: await authHeader() }),
}
export default GradingScaleService;