/* eslint-disable import/no-extraneous-dependencies */
import { ProgramSubject, ProgramSubjectParams } from '@/src/models/subject';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ProgramSubjectService = {
  getCourseOptions: async (params: ProgramSubjectParams) => axios.get(`${API_URL}api/v1/program_subjects?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  addCourseOption: async (subject: ProgramSubject) => axios.post(`${API_URL}api/v1/program_subjects`, subject, { headers: await authHeader() }),
  deleteCourseOption: async (subjectId: number) => axios.delete(`${API_URL}api/v1/program_subjects/${subjectId}`, { headers: await authHeader() }),
  updateCourseOption: async (subject: ProgramSubject) => axios.put(`${API_URL}api/v1/program_subjects/${subject.id}`, subject, { headers: await authHeader() }),
  getCourseOption: async (params: any) => axios.get(`${API_URL}api/v1/program_subjects/lessons/student_course_option?${queryStringFormatter(params)}`, { headers: await authHeader() }),

};
export default ProgramSubjectService;
