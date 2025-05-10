/* eslint-disable import/no-extraneous-dependencies */
import { Subject, SubjectParams } from '@/src/models/subject';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Subject, SubjectParams, SubjectViewModel } from '../models/subject';
// import queryStringFormatter from '../utility/queryStringFormatter';
// import { get } from 'http';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const SubjectService = {
  getSubjects: async (params: SubjectParams) => axios.get(`${API_URL}api/v1/subjects?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  addSubject: async (subject: Subject) => axios.post(`${API_URL}api/v1/subjects`, subject, { headers: await authHeader() }),
  deleteSubject: async (subjectId: number) => axios.delete(`${API_URL}api/v1/subjects/${subjectId}`, { headers: await authHeader() }),
  updateSubject: async (subject: Subject, id: number|undefined) => axios.put(`${API_URL}api/v1/subjects/${id}`, subject, { headers: await authHeader() }),
  getSubject: async (id: number) => axios.get(`${API_URL}api/v1/subjects/${id}`, { headers: await authHeader() }),
  getSubjectListFromTimeTable: async (params: any) => axios.get(`${API_URL}api/v1/subjects/program_subjects/lessons/subject_list_from_time_table?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  getClassSubjectList: async (params: any) => axios.get(`${API_URL}api/v1/schools/class_groups/subjects/class_subject_list?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  getStaffSubjectList: async (params: any) => axios.get(`${API_URL}api/v1/subjects/program_subjects/lessons/staff_subject_list?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
};
export default SubjectService;

