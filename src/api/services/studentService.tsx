/* eslint-disable import/no-extraneous-dependencies */
import { countries } from '@/src/models/countries';
import { Student, StudentParams } from '@/src/models/student';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Student, StudentParams } from '../models/student';
// import queryStringFormatter from '../utility/queryStringFormatter';
// import { countries } from '../models/countries';


const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentService = {
  getCountries: () => countries,
  getStudentById: async (student_id: string) => axios.get(`${API_URL}api/v1/students/student_id/get_student_by_id?student_id=${student_id}`, { headers: await authHeader() }),
  getStudents: async (params: StudentParams) => axios.get(`${API_URL}api/v1/students?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  addStudent: async (student: FormData) => axios.post(`${API_URL}api/v1/students`, student, { headers: await authHeader() }),
  deleteStudent: async (student: Student, id: number) => axios.delete(`${API_URL}api/v1/students/${id}`, { headers: await authHeader() }),
  updateStudent: async (student: FormData, id: number) => axios.put(`${API_URL}api/v1/students/${id}`, student, { headers: await authHeader() }),
  getStudent: async (studentId: number) => axios.get(`${API_URL}api/v1/students/${studentId}`, { headers: await authHeader() }),
};

export default StudentService;

