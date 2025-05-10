/* eslint-disable import/no-extraneous-dependencies */
import { StudentOptionalCourse, StudentOptionalCourseParams, StudentOptionalCourseViewModel } from '@/src/models/optionalCourseRegistration';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { StudentOptionalCourse, StudentOptionalCourseParams, StudentOptionalCourseViewModel } from '../models/optionalCourseRegistration';
// import queryStringFormatter from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StudentOptionalCourseService = {
  getStudentOptionalCourses: async (params: StudentOptionalCourseParams) => axios.get(`${API_URL}api/v1/student_optional_courses?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  addStudentOptionalCourse: async (student_optional_course: StudentOptionalCourse) => axios.post(`${API_URL}api/v1/student_optional_courses`, student_optional_course, { headers: await authHeader() }),
  deleteStudentOptionalCourse: async (student_optional_course: StudentOptionalCourseViewModel) => axios.delete(`${API_URL}api/v1/student_optional_courses/${student_optional_course.id}`, { headers: await authHeader() }),
  updateStudentOptionalCourse: async (student_optional_course: StudentOptionalCourse, id: number) => axios.put(`${API_URL}api/v1/student_optional_courses/${id}`, student_optional_course, { headers: await authHeader() }),
  getStudentOptionalCourse: async (id: number) => axios.get(`${API_URL}api/v1/student_optional_courses/${id}`, { headers: await authHeader() }),
};
export default StudentOptionalCourseService;

