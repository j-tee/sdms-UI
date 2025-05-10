/* eslint-disable import/no-extraneous-dependencies */
import { QueryParams } from '@/src/models/queryParams';
import { Registration, StudentRegParams } from '@/src/models/student';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Registration, StudentRegParams } from '../models/student';
// import queryStringFormatter from '../utility/queryStringFormatter';
// import { QueryParams } from '../models/queryParams';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentRegService = {
  updateRegistration: async (registration: Registration) => axios.put(`${API_URL}api/v1/schools/students/registrations/update_student_registration/${registration.id}`, registration, { headers: await authHeader() }),
  getStudentRegistration: async (params: any) => axios.get(`${API_URL}api/v1/schools/students/registrations/student_registration?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  registerStudents: async (registrations: any) => axios.post(`${API_URL}api/v1/registrations`, registrations, { headers: await authHeader() }), 
  getRegistrationInformation: async (params: QueryParams) => axios.get(`${API_URL}api/v1/registrations/students/new_registrations/registration_info?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  getRegisteredStudents: async (params: QueryParams) => axios.get(`${API_URL}api/v1/registrations?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  getOptionalCourseRegistrations: async (params: any) => axios.get(`${API_URL}api/v1/students/course_options/student_course_options_registrations/unregistered_students_for_optional_subject?${queryStringFormatter(params)}`, { headers: await authHeader() }), 
  getRegisteredStudentsForRecordingScores: async(params: StudentRegParams) => axios.get(`${API_URL}api/v1/registrations/score_sheets/assessments/record_assessment/students/registered_students_assessment?${queryStringFormatter(params)}`, { headers: await authHeader() }),
};

export default StudentRegService;

