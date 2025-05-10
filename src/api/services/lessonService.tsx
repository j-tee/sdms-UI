/* eslint-disable import/no-extraneous-dependencies */
import { Lesson, LessonParams, LessonViewModel } from '@/src/models/Lesson';
import authHeader from '@/src/utilities/authHeader';
import queryStringFormatter from '@/src/utilities/queryStringFormatter';
import axios from 'axios';
// import authHeader from '../utility/authHeader';
// import { Lesson, LessonParams, LessonViewModel } from '../models/Lesson';
// import queryStringFormatter  from '../utility/queryStringFormatter';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const LessonService = {
  getLessons: (params: LessonParams) => 
    authHeader().then(headers => 
      axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, { headers })
    ),
   
  getStudentLessons: async (params: any) => axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, { headers: await authHeader() }), 
  addLesson: async (lesson: Lesson) => axios.post(`${API_URL}api/v1/lessons`, lesson, { headers: await authHeader() }),
  deleteLesson: async (lesson: LessonViewModel) => axios.delete(`${API_URL}api/v1/lessons/${lesson.id}`, { headers: await authHeader() }),
  updateLesson: async (lesson: Lesson, id: number) => axios.put(`${API_URL}api/v1/lessons/${id}`, lesson, { headers: await authHeader() }),
  getLesson: async (id: number) => axios.get(`${API_URL}api/v1/lessons/${id}`, { headers: await authHeader() }),
};
export default LessonService;

