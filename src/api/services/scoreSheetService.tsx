/* eslint-disable import/no-extraneous-dependencies */
import { QueryParams } from '@/src/models/queryParams';
import { ScoreSheet } from '@/src/models/scoreSheet';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ScoreSheetService = {
  getStudentSubjectAverages: async (params: any) => axios.get(`${API_URL}api/v1/schools/student/score_sheets/student_subject_average?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  getStudentScoreSheets: async (params: any) => axios.get(`${API_URL}api/v1/schools/student/score_sheets/student_core_sheet?${queryStringFormatter(params)}`, { headers: await authHeader() }), 
  getScoreSheets: async (params: QueryParams) => axios.get(`${API_URL}api/v1/score_sheets?${queryStringFormatter(params)}`, { headers:await authHeader() }),
  addScoreSheet: async (scoreSheet: any) => axios.post(`${API_URL}api/v1/score_sheets`, scoreSheet, { headers: await authHeader() }),
  deleteScoreSheet: async (scoreSheet: ScoreSheet) => axios.delete(`${API_URL}api/v1/score_sheets/${scoreSheet.id}`, { headers: await authHeader() }),
  updateScoreSheet: async (scoreSheet: ScoreSheet) => axios.put(`${API_URL}api/v1/score_sheets/${scoreSheet.id}`, scoreSheet, { headers: await authHeader() }),
  getScoreSheet: async (id: number) => axios.get(`${API_URL}api/v1/score_sheets/${id}`, { headers: await authHeader() }),
  getTerminalReport: async (params: QueryParams) => axios.get(`${API_URL}api/v1/score_sheets/summary/students/evaluation/report/terminal_report?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  getStudentTerminalReport: async (params: QueryParams) => axios.get(`${API_URL}api/v1/schools/student/terminal_report/student_terminal_report?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
};
export default ScoreSheetService;

