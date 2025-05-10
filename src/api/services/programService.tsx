/* eslint-disable import/no-extraneous-dependencies */
import { Program, ProgramParams } from '@/src/models/program';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ProgramService = {
  getStudentPrograms: async (params: ProgramParams) => axios.get(`${API_URL}api/v1/parents/students/programs/student_programs?${queryStringFormatter(params)}`, { headers: await authHeader() }), 
  getPrograms: async (params: ProgramParams) => 
  axios.get(`${API_URL}api/v1/departments/${params.department_id}/programs?branch_id=${params.branch_id}&department_id=${params.department_id}&page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`, { headers: await authHeader() }),
  addProgram: async (program: Program) => axios.post(`${API_URL}api/v1/departments/${program.department_id}/programs`, program, { headers: await authHeader() }),
  deleteProgram: async (program: Program, id:number) => axios.delete(`${API_URL}api/v1/departments/${program.department_id}/programs/${id}`, { headers: await authHeader() }),
  updateProgram: async (program: Program) => axios.put(`${API_URL}api/v1/departments/${program.department_id}/programs/${program.id}`, program, { headers: await authHeader() }),
  getProgram: async (programId: number) => axios.get(`${API_URL}api/v1/departments/:department_id/programs/${programId}`, { headers: await authHeader() }),
  getProgramList: async (params: ProgramParams) => axios.get(`${API_URL}api/v1/programs/program_subjects/lessons/program_list?branch_id=${params.branch_id}&department_id=${params.department_id}&paginate=false`, { headers: await authHeader() }), 
};

export default ProgramService;

